export type OpenAIVectorSearchInitConfig = {
    apiKey: string;
    model?: string;
    indexPath: string;
    k?: number;
  };
  
  export type OpenAIVectorSearchRunArgs = {
    query: string;
  };
  

export const OpenAIVectorSearchPluginTypes = {
  runArgs: {} as OpenAIVectorSearchRunArgs,
  return: "" as string,
};