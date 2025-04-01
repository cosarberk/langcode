import { PluginDescriptions } from "./plugin";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";

export type DirectoryLoaderInitConfig = {
  directoryPath: string;
};

export type DirectoryLoaderRunArgs = {};

export interface DirectoryLoaderExpose extends PluginDescriptions {
  loader: DirectoryLoader | null
}

export const DirectoryLoaderPluginTypes = {
  runArgs: {} as DirectoryLoaderRunArgs,
  return: {} as any,
  expose: {} as DirectoryLoaderExpose,
};