import { PluginDescriptions } from "./plugin";

export type TerminalInitConfig = {
  safeMode?: boolean;
  defaultTimeout?: number;
  workingDir?: string;
  unsafeCommands?:string[]
};

export type TerminalRunArgs = {
  command: string;
  timeout?: number;
  env?: Record<string, string>;
};

export interface TerminalExpose extends PluginDescriptions {
  safeMode: boolean;
  defaultTimeout: number;
  workingDir: string;
  unsafeCommands:string[]
}

export const TerminalPluginTypes = {
  runArgs: {} as TerminalRunArgs,
  return: {} as any,
  expose: {} as TerminalExpose,
};