import { promisify } from "util";
import { Plugin } from "../../types";
import { PluginType, TerminalInitConfig, TerminalRunArgs, TerminalExpose } from "../../types";
import { exec } from "child_process";

const execAsync = promisify(exec);


export default class TerminalPlugin
  implements Plugin<TerminalInitConfig, TerminalRunArgs, TerminalExpose, any> {
  
  name = "terminal";
  description = "Executes terminal commands securely.";
  type = PluginType.LangCodeTool;

  configExample: TerminalInitConfig = {
    safeMode: true,
    defaultTimeout: 5000,
    workingDir: process.cwd()
  };

  private safeMode: TerminalExpose["safeMode"] = false;
  private defaultTimeout: TerminalExpose["defaultTimeout"] = 5000;
  private workingDir: TerminalExpose["workingDir"] = process.cwd();
  private unsafeCommands:TerminalExpose["unsafeCommands"] = ["rm", "reboot", "shutdown", ":(){", "mkfs", "dd"]

  expose(): TerminalExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      configExample: this.configExample,
      safeMode:this.safeMode,
      defaultTimeout:this.defaultTimeout,
      workingDir:this.workingDir,
      unsafeCommands:this.unsafeCommands
    };
  }

  async init(config: TerminalInitConfig) {

      this.safeMode= config.safeMode ?? true
      this.defaultTimeout= config.defaultTimeout ?? this.defaultTimeout
      this.workingDir= config.workingDir ?? process.cwd()
  
  }

  async run(args: TerminalRunArgs): Promise<any> {
    const { command, timeout, env } = args;

    if (this.safeMode && this.unsafeCommands.some(cmd => command.includes(cmd))) {
      return { error: "⚠️ Komut güvenlik nedeniyle engellendi." };
    }

    try {
      const { stdout, stderr } = await execAsync(command, {
        timeout: timeout ?? this.defaultTimeout,
        cwd: this.workingDir,
        env: { ...process.env, ...env }
      });

      return {
        stdout: stdout.trim(),
        stderr: stderr?.trim() || null
      };
    } catch (err: any) {
      return { error: err.message };
    }
  }
}