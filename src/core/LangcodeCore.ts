import { PluginRunner } from "./PluginRunner";
import { plugins } from "../types/enums";

export async function langcode(
  configList: { pluginName: plugins; config: Record<string, any> }[],
  options?: { debug?: boolean; logFile?: string,strict?:boolean }
): Promise<PluginRunner> {
  const runner = new PluginRunner(options?.debug ?? !!options?.logFile, options?.logFile ?? null, options?.strict ?? false);
  await runner.initialize(configList);
  return runner;
}


export class Langcode extends PluginRunner {
  constructor(
      configList: { pluginName: plugins; config: Record<string, any> }[],
      options?: { debug?: boolean; logFile?: string,strict?:boolean }
  ) {
      super(options?.debug ?? !!options?.logFile, options?.logFile ?? null, options?.strict ?? false);
      
      this.initialize(configList).then(() => {
          console.log('PluginRunner initialized successfully');
      }).catch(err => {
          console.error('Error initializing PluginRunner', err);
      });
  }
}