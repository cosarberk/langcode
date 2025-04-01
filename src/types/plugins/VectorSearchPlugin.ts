import { BaseRetriever } from "@langchain/core/retrievers";
import { PluginDescriptions } from "./plugin";

export type VectorSearchInitConfig = {
};

export type VectorSearchRunArgs = {
  query: string;
  retriever: BaseRetriever;

};

export interface VectorSearchExpose extends PluginDescriptions{
  retriever: BaseRetriever
}

export const VectorSearchPluginTypes = {
  runArgs: {} as VectorSearchRunArgs,
  return: "" as string,
  expose:{} as VectorSearchExpose
};