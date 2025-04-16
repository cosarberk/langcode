import fs from "fs";
import path from "path";
import { EventEmitter } from "events";
import chalk from "chalk";
import { LoggerArgs,LogLevel } from "../types";


export class Logger extends EventEmitter {
  private toConsole: boolean;
  private filePath: string | null;
  private tag: string | null;

  constructor(loggerargs?: LoggerArgs) {
    super();
    this.toConsole = loggerargs?.debug ?? false;
    this.filePath = loggerargs?.filePath ?? "./debug/langcode.log";
    this.tag = loggerargs?.tag ?? null;

    // Dosya hazırlığı
    if (this.filePath) {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.filePath, "Langoce Log Başladı:\n", { flag: "w" });
    }
  }

  // Log seviyeleri
  public info(message: string, data?: any) {
    this.logInternal("info", message, data);
  }
  public warn(message: string, data?: any) {
    this.logInternal("warn", message, data);
  }
  public error(message: string, data?: any) {
    this.logInternal("error", message, data);
  }
  public success(message: string, data?: any) {
    this.logInternal("success", message, data);
  }
  public debug(message: string, data?: any) {
    this.logInternal("debug", message, data);
  }

  /**
   * İç metod: hem konsol/dosyaya yazıyor hem event emit ediyor.
   */
  private logInternal(level: LogLevel, message: string, data?: any) {
    const time = new Date().toISOString();
    const plainOutput = `[${time}] [${level.toUpperCase()}] ${message}`;

    if (this.toConsole) {
      const coloredOutput = this.colorize(level, plainOutput);
      if (data) {
        console.log(coloredOutput, "\n", this.colorize(level, this.safeSerialize(data)));
      } else {
        console.log(coloredOutput);
      }
    }

    if (this.filePath) {
      let fileOut = plainOutput;
      if (data) {
        fileOut += "\n" + this.safeSerialize(data);
      }
      fs.appendFileSync(this.filePath, fileOut + "\n");
    }
    const payload = { level, time, message, data };
    const eventName = this.tag ? `${this.tag}:${level}` : level;
    const baseEvent = this.tag ?? level;  
    this.emit(eventName, payload);
    this.emit(baseEvent, payload);

  }

  /**
   * Renkli konsol çıktısı için chalk
   */
  private colorize(level: LogLevel, text: string): string {
    switch (level) {
      case "info":
        return chalk.blue(text);
      case "warn":
        return chalk.yellow(text);
      case "error":
        return chalk.red(text);
      case "success":
        return chalk.green(text);
      case "debug":
        return chalk.cyan(text);
      default:
        return text;
    }
  }

  /**
   * Nesneleri güvenle serileştirme
   */
  private safeSerialize(data: any): string {
    try {
      return JSON.stringify(data, this.replacer, 2);
    } catch {
      return "[Unserializable Data]";
    }
  }

  private replacer(key: string, value: any) {
    if (typeof value === "function") return "[Function]";
    if (typeof value === "object" && value !== null) {
      const constructorName = value.constructor?.name;
      const allowed = ["Object", "Array", "Map", "Set"];
      if (constructorName && !allowed.includes(constructorName)) {
        return `[Instance of ${constructorName}]`;
      }
    }
    return value;
  }
}

/** Factory fonksiyonu (opsiyonel) */
export function createLogger(args?: LoggerArgs) {
  return new Logger(args);
}

export const logger =(loggerargs?:LoggerArgs) => new Logger(loggerargs)