import { PluginDescriptions } from "./plugin";


export type PromptTemplateInitConfig = {};
  
  
  
  
  export type PromptTemplateRunArgs = {
    template: string;
    inputVariables: Record<string, string>;
    };
    
    export interface PromptTemplateExpose extends PluginDescriptions{
      
    }

    export const PromptTemplatePluginTypes = {
      runArgs: {} as PromptTemplateRunArgs,
      return: "" as string,
      expose:{} as PromptTemplateExpose
    };