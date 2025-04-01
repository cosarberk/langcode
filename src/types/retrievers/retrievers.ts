export enum EmbeddingProviders {
    OpenAI = "openai",
    Ollama = "ollama",
    HuggingFace = "huggingface",
  }
  
  export enum VectorStores {
    Faiss = "faiss",
    Memory = "memory",
  }
  
  export type EmbeddingProvider = `${EmbeddingProviders}`;
  export type VectorStoreType = `${VectorStores}`;