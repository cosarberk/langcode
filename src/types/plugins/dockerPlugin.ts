import { DockerFastCommands } from "../../base";
import { PluginDescriptions } from "./plugin";

export type DockerInitConfig = {
  safeMode?: boolean;
  defaultTimeout?: number;
  workingDir?: string;
};

export type DockerRunArgs = {
  command: string;
  timeout?: number;
  env?: Record<string, string>;
};

export interface DockerExpose extends PluginDescriptions {
  safeMode: boolean;
  defaultTimeout: number;
  workingDir: string;
  unsafeCommands: string[];
  allowedDockerCommands: string[];
  dfc: DockerFastCommands;
}

export const DockerPluginTypes = {
  runArgs: {} as DockerRunArgs,
  return: {} as any,
  expose: {} as DockerExpose,
};