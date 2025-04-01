import { BaseRetriever } from "@langchain/core/retrievers";

type RetrieverCreatorConfig = {
  embeddings: any;
  store: any; // FaissStore, Pinecone, MemoryVectorStore vs.
  k?: number;
};

export async function retrieverCreator(config: RetrieverCreatorConfig): Promise<BaseRetriever> {
  return config.store.asRetriever({ k: config.k ?? 4 });
}