import { PluginDescriptions } from "./plugin";
import { SerpAPI, SerpAPIParameters } from "@langchain/community/tools/serpapi";

export type SerpAPIToolInitConfig = {
  apiKey: string;
  params?: Partial<SerpAPIParameters>;
};

export type SerpAPIToolRunArgs = {
  query: string;
};

export interface SerpAPIToolExpose extends PluginDescriptions {
  tool: SerpAPI | null;
}

export const SerpAPIToolPluginTypes = {
  runArgs: {} as SerpAPIToolRunArgs,
  return: {} as any,
  expose: {} as SerpAPIToolExpose,
};