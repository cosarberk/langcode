import { DallEAPIWrapper } from "@langchain/openai";
import { PluginDescriptions } from "./plugin";

export type DalleSize = "256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792";

export type DalleInitConfig = {
  openAIApiKey: string;
  modelName?: string;
  size?: DalleSize;
  n?: number;
};


export type DalleRunArgs = {
    prompt: string;
    outputPath: string;
};

export interface DalleExpose extends PluginDescriptions{
  dalle:DallEAPIWrapper | null
}
  
  export const DallePluginTypes = {
    runArgs: {} as DalleRunArgs,
    return: "" as string,
    expose:{} as DalleExpose
  }; 