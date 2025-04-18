import { ChatOpenAI } from "@langchain/openai";
import { PluginDescriptions } from "./plugin";


export type OpenAIInitConfig = {
  apiKey: string;
  modelName?: string;
  temperature?: number;
};




export type OpenAIRunArgs = {
    prompt: string;
  };

  export interface OpenAIExpose extends PluginDescriptions{
   llm: ChatOpenAI | null
  }
  
  export const OpenAIPluginTypes = {
    runArgs: {} as OpenAIRunArgs,
    return: "" as string,
    expose:{} as OpenAIExpose
  };