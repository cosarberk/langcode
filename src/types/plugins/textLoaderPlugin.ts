import { PluginDescriptions } from "./plugin";
import { TextLoader } from "langchain/document_loaders/fs/text";
export type TextLoaderInitConfig = {
  path: string;
};

export type TextLoaderRunArgs = {}; 

export interface TextLoaderExpose extends PluginDescriptions {
  loader: TextLoader | null 
}

export const TextLoaderPluginTypes = {
  runArgs: {} as TextLoaderRunArgs,
  return: {} as any,
  expose: {} as TextLoaderExpose,
};