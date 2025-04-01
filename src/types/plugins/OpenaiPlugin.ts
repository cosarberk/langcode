import { ChatOpenAI } from "@langchain/openai";
import { PluginDescriptions } from "./plugin";


export type OpenAiInitConfig = {
  apiKey: string;
  modelName?: string;
  temperature?: number;
};




export type OpenAiRunArgs = {
    prompt: string;
  };

  export interface OpenAiExpose extends PluginDescriptions{
   llm: ChatOpenAI | null
  }
  
  export const OpenAiPluginTypes = {
    runArgs: {} as OpenAiRunArgs,
    return: "" as string,
    expose:{} as OpenAiExpose
  };