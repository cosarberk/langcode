import { PluginDescriptions } from "./plugin";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";

export type CsvLoaderInitConfig = {
  path: string;
};

export type CsvLoaderRunArgs = {};


export interface CsvLoaderExpose extends PluginDescriptions {
  loader:CSVLoader | null
}

export const CsvLoaderPluginTypes = {
  runArgs: {} as CsvLoaderRunArgs,
  return: {} as any,
  expose: {} as CsvLoaderExpose,
};