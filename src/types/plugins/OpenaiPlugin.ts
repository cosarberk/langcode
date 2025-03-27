

export type OpenAiInitConfig = {
  apiKey: string;
  modelName?: string;
  temperature?: number;
};




export type OpenAiRunArgs = {
    prompt: string;
  };
  
  export const OpenAiPluginTypes = {
    runArgs: {} as OpenAiRunArgs,
    return: "" as string,
  };