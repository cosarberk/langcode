
export type OpenAIEmbeddingInitConfig = {
  apiKey: string;
  model?: string;
};

export type OpenAIEmbeddingRunArgs = {
  text: string;
};
    
    export const OpenAIEmbeddingPluginTypes = {
      runArgs: {} as OpenAIEmbeddingRunArgs,
      return: "" as string,
    };