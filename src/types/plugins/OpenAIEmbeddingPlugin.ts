import { OpenAIEmbeddings } from "@langchain/openai";
import { PluginDescriptions } from "./plugin";

export type OpenAIEmbeddingInitConfig = {
  apiKey: string;
  model?: string;
};

export type OpenAIEmbeddingRunArgs = {
  text: string;
};
export interface OpenAIEmbeddingExpose extends PluginDescriptions{
  embeddingModel: OpenAIEmbeddings | null
}
    
    export const OpenAIEmbeddingPluginTypes = {
      runArgs: {} as OpenAIEmbeddingRunArgs,
      return: "" as string,
      expose:{} as OpenAIEmbeddingExpose
    };