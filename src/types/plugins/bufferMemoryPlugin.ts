import { PluginDescriptions } from "./plugin";
import { BufferMemory } from "langchain/memory";

export type BufferMemoryInitConfig = {
  humanPrefix?: string;
  aiPrefix?: string;
  memoryKey: string;
};

export type BufferMemoryRunArgs = Record<string, never>;

export interface BufferMemoryExpose extends PluginDescriptions {
  memory: BufferMemory | null 
}

export const BufferMemoryPluginTypes = {
  runArgs: {} as BufferMemoryRunArgs,
  return: {} as any,
  expose: {} as BufferMemoryExpose,
};