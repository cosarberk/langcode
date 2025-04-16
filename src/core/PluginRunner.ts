import { LogLevel, logLevels, Plugin, plugins, PluginTypeMap } from "../types";
import { Logger } from "./Logger";
import { EventEmitter } from "events";

interface HistoryItem {
  timestamp?: string;
  level: LogLevel;
  phase: "init" | "run" | "expose";
  pluginName?: string;
  message: string;
  data?: any;
  elapsedMs?: number;
}

export class PluginRunner extends EventEmitter {
  private activePlugins = new Map<string, Plugin>();
  private logger: Logger;
  private strict?: boolean;
  private tag = "langcode";
  private histories: HistoryItem[] = [];
  private historyLimit = 1_000;

  constructor(debug = false, logFile: string | null = null, strict?: boolean) {
    super();
    this.logger = new Logger({
      debug: debug,
      filePath: logFile,
      tag: this.tag,
    });
    this.strict = strict;
    logLevels.forEach((level: LogLevel) => {
      const loggerEvent = `${this.tag}:${level}`;
      this.logger.on(loggerEvent, (payload) => {
        this.emit(loggerEvent, payload);
        this.emit(this.tag, payload);
      });
    });
  }

  private pushHistory(item: HistoryItem) {
    const itema = {...item,timestamp: new Date().toISOString()}
    if (this.histories.length >= this.historyLimit) this.histories.shift();
    this.histories.push(itema);
    this.logger.info(`🔌 history added: ${JSON.stringify(itema,null,2)}`);
  }

  public history() {
    return [...this.histories];
  }

  async initialize(
    configList: { pluginName: plugins; config: Record<string, any> }[]
  ) {
    for (const { pluginName, config } of configList) {
      try {
        const modulePath = `../plugins/${pluginName}/${capitalize(
          pluginName
        )}Plugin`;
        const pluginModule = await import(modulePath);
        const pluginInstance: Plugin = new pluginModule.default();

        this.logger.info(`🔌 Başlatılıyor: ${pluginName}`);
        this.pushHistory({
          level: "info",
          phase: "init",
          pluginName,
          message:`🔌 Başlatılıyor: ${pluginName}`,
        });
        await pluginInstance.init(config);
        this.activePlugins.set(pluginName, pluginInstance);
        this.logger.success(`✅ Aktif: ${pluginName}`);
        this.pushHistory({
          level: "success",
          phase: "init",
          pluginName,
          message:`✅ Aktif: ${pluginName}`,
        });
      } catch (err) {
        this.logger.error(`❌ Plugin '${pluginName}' yüklenemedi:`, err);
        this.pushHistory({
          level:"error",
          phase: "init",
          pluginName,
          message:`❌ Plugin '${pluginName}' yüklenemedi:`,
          data:err
        });
        if (this.strict) {
          throw err;
        }
      }
    }
  }

  async run<T extends keyof PluginTypeMap>(
    pluginName: T,
    args: PluginTypeMap[T]["runArgs"]
  ): Promise<PluginTypeMap[T]["return"]> {
    const plugin = this.activePlugins.get(pluginName);
    if (!plugin) {
      this.logger.error(`Plugin '${pluginName}' aktif değil.`);
      this.pushHistory({
        level: "error",
        phase: "run",
        pluginName,
        message:`Plugin '${pluginName}' aktif değil.`
      });
      if (this.strict) {
        throw new Error(`Plugin '${pluginName}' aktif değil.`);
      }
    }

    this.logger.info(`⏳ Çalıştırılıyor: ${pluginName}`, args);
    this.pushHistory({
      level: "info",
      phase: "run",
      pluginName,
      data:args,
      message:`⏳ Çalıştırılıyor: ${pluginName}`
    });
    const start = Date.now();
    const result = await plugin?.run(args);

    this.logger.success(
      `✅ Tamamlandı (${pluginName}) - ${Date.now() - start}ms`
    );
    this.logger.debug("📤 Cevap:", result);

    this.pushHistory({
      level: "success",
      phase: "run",
      pluginName,
      data:result,
      message: `✅ Tamamlandı (${pluginName}) - ${Date.now() - start}ms`
    });

    return result;
  }

  async getExpose<T extends keyof PluginTypeMap>(
    pluginName: T
  ): Promise<PluginTypeMap[T]["expose"] | undefined> {
    const plugin = this.activePlugins.get(pluginName);
    if (!plugin) {
      this.logger.error(`Plugin '${pluginName}' aktif değil.`);
      this.pushHistory({
        level: "error",
        phase: "expose",
        pluginName,
        message: `Plugin '${pluginName}' aktif değil.`
      });
      if (this.strict) {
        throw new Error(`Plugin '${pluginName}' aktif değil.`);
      }
    }
    if (typeof plugin?.expose === "function") {
      this.pushHistory({
        level: "success",
        phase: "expose",
        pluginName,
        message: `Expose başarılı`
      });
      
      return plugin.expose() as PluginTypeMap[T]["expose"];
    }

    this.logger.error(`Plugin '${pluginName}' expose() sağlamıyor.`);
    this.pushHistory({
      level: "error",
      phase: "expose",
      pluginName,
      message: `Plugin '${pluginName}' expose() sağlamıyor.`
    });

    if (this.strict) {
      throw new Error(`Plugin '${pluginName}' expose() sağlamıyor.`);
    }
  }
}
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
