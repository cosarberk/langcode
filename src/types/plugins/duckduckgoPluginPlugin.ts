import { DuckDuckGoSearch, SearchOptions } from "@langchain/community/tools/duckduckgo_search";
import { PluginDescriptions } from "./plugin";

export type DuckduckgoPluginInitConfig = {
  maxResults?: number;
  searchOptions?: SearchOptions;
};

export type DuckduckgoPluginRunArgs = {
  query: string;
};

export interface DuckduckgoPluginExpose extends PluginDescriptions {
  tool: DuckDuckGoSearch | null
}

export const DuckduckgoPluginPluginTypes = {
  runArgs: {} as DuckduckgoPluginRunArgs,
  return: {} as any,
  expose: {} as DuckduckgoPluginExpose,
};