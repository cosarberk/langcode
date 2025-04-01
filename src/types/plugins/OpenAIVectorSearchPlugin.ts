import { BaseRetriever } from "@langchain/core/retrievers";
import { loadFaissStore } from "../../base";
import { PluginDescriptions } from "./plugin";

export type OpenAIVectorSearchInitConfig = {
   // [x: string]: string;
    apiKey: string;
    model?: string;
    indexPath: string;
    k?: number;
  };
  
  export type OpenAIVectorSearchRunArgs = {
    query: string;
  };
  

  export interface OpenAIVectorSearchExpose extends PluginDescriptions{
   retriever:BaseRetriever
  }

export const OpenAIVectorSearchPluginTypes = {
  runArgs: {} as OpenAIVectorSearchRunArgs,
  return: "" as string,
  expose:{} as OpenAIVectorSearchExpose
};