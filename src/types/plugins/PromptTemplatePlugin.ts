

export type PromptTemplateInitConfig = {};
  
  
  
  
  export type PromptTemplateRunArgs = {
    template: string;
    inputVariables: Record<string, string>;
    };
    
    export const PromptTemplatePluginTypes = {
      runArgs: {} as PromptTemplateRunArgs,
      return: "" as string,
    };