
import { Plugin,plugins, PluginTypeMap } from "../types";
import { Logger ,LoggerArgs} from "./Logger";

export class PluginRunner {
  private activePlugins = new Map<string, Plugin>();
  private logger: Logger;

  constructor(debug = false, logFile: string | null = null) {
    this.logger = new Logger({debug:debug,filePath:logFile});
  }

  async initialize(configList: { pluginName: plugins; config: Record<string, any> }[]) {
    for (const { pluginName, config } of configList) {
      try {
        const modulePath = `../plugins/${pluginName}/${capitalize(pluginName)}Plugin`;
        const pluginModule = await import(modulePath);
        const pluginInstance: Plugin = new pluginModule.default();

        this.logger.log(`🔌 Başlatılıyor: ${pluginName}`);
        await pluginInstance.init(config);
        this.activePlugins.set(pluginName, pluginInstance);
        this.logger.log(`✅ Aktif: ${pluginName}`);
      } catch (err) {
        this.logger.log(`❌ Plugin '${pluginName}' yüklenemedi:`, err);
      }
    }
  }

  async run<T extends keyof PluginTypeMap>(
    pluginName: T,
    args: PluginTypeMap[T]["runArgs"]
  ): Promise<PluginTypeMap[T]["return"]> {
    const plugin = this.activePlugins.get(pluginName);
    if (!plugin) throw new Error(`Plugin '${pluginName}' aktif değil.`);

    this.logger.log(`⏳ Çalıştırılıyor: ${pluginName}`, args);

    const start = Date.now();
    const result = await plugin.run(args);

    this.logger.log(`✅ Tamamlandı (${pluginName}) - ${Date.now() - start}ms`);
    this.logger.log("📤 Cevap:", result);

    return result;
  }

  async getExpose<T extends keyof PluginTypeMap>( pluginName: T): Promise<PluginTypeMap[T]["expose"]> {
    const plugin = this.activePlugins.get(pluginName);
    if (!plugin) throw new Error(`Plugin '${pluginName}' aktif değil.`);
    if (typeof plugin.expose === "function") {
      return plugin.expose() as PluginTypeMap[T]["expose"];
    }
    throw new Error(`Plugin '${pluginName}' expose() sağlamıyor.`);
  }
}
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}