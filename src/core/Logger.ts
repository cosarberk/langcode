import fs from "fs";
import path from "path";

export class Logger {
  private toConsole: boolean;
  private filePath: string | null;

  constructor(debug = false, filePath: string | null = null) {
    this.toConsole = debug;
    this.filePath = filePath;

    if (filePath) {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, "Langoce Log Başladı:\n", { flag: "w" });
    }
  }

  log(message: string, data?: any) {
    const time = new Date().toISOString();
    let output = `[${time}] ${message}`;
    if (data) {
      output += "\n" + JSON.stringify(data, null, 2);
    }

    if (this.toConsole) {
      console.log(output);
    }

    if (this.filePath) {
      fs.appendFileSync(this.filePath, output + "\n");
    }
  }
}