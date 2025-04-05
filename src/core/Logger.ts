import fs from "fs";
import path from "path";


export interface LoggerArgs{
   debug?: boolean;
   filePath?: string | null;
}

export class Logger {
  private toConsole: boolean;
  private filePath: string | null;

  constructor(loggerargs:LoggerArgs  | undefined) {
    this.toConsole = loggerargs?.debug ?? false;
    this.filePath = loggerargs?.filePath ?? "./debug/langcode.log";

    if (loggerargs?.filePath) {
      const dir = path.dirname(loggerargs.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(loggerargs.filePath, "Langoce Log Başladı:\n", { flag: "w" });
    }
  }

  log(message: string, data?: any) {
    const time = new Date().toISOString();
    let output = `[${time}] ${message}`;
    if (data) {
      output += "\n" + this.safeSerialize(data);
    }

    if (this.toConsole) {
      console.log(output);
    }

    if (this.filePath) {
      fs.appendFileSync(this.filePath, output + "\n");
    }
  }


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
  
      // Temel objelere dokunma
      const allowed = ["Object", "Array", "Map", "Set"];
      if (constructorName && !allowed.includes(constructorName)) {
        return `[Instance of ${constructorName}]`;
      }
    }
  
    return value;
  }


}


export const logger =(loggerargs?:LoggerArgs) => new Logger(loggerargs)