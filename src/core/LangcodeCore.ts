import { PluginRunner } from "./PluginRunner";
import { plugins } from "../types/enums";

export async function langcode(
  configList: { pluginName: plugins; config: Record<string, any> }[],
  options?: { debug?: boolean; logFile?: string }
) {
  const runner = new PluginRunner(options?.debug ?? !!options?.logFile, options?.logFile ?? null);
  await runner.initialize(configList);
  return runner;
}