// import { BaseRetriever } from "@langchain/core/retrievers";
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
// import { FaissStore } from "@langchain/community/vectorstores/faiss";
// import { MemoryVectorStore } from "langchain/vectorstores/memory";
// import { OllamaEmbeddings } from "@langchain/ollama";
// import { EmbeddingProvider, VectorStoreType } from "../../types";

// type RetrieverBuilderConfig = {
//   embedding: {
//     provider: EmbeddingProvider;
//     apiKey?: string; // bazı provider'lar istemez
//     model?: string;
//   };
//   store: {
//     type: VectorStoreType;
//     indexPath?: string; // FAISS için gerekli
//   };
//   k?: number;
// };

// const embeddingFactories: Record<EmbeddingProvider, (config: RetrieverBuilderConfig["embedding"]) => any> = {
//   openai: ({ apiKey, model }) =>
//     new OpenAIEmbeddings({ apiKey, model: model || "text-embedding-3-small" }),
//   ollama: ({ model }) => new OllamaEmbeddings({ model: model || "nomic-embed-text" }),
//   huggingface: ({ apiKey, model }) =>
//     new HuggingFaceInferenceEmbeddings({
//       apiKey: apiKey!,
//       model: model || "sentence-transformers/all-MiniLM-L6-v2",
//     }),
// };

// const storeLoaders: Record<VectorStoreType,(config: RetrieverBuilderConfig["store"], embeddings: any) => Promise<any>> = {
//   faiss: async ({ indexPath }, embeddings) => {
//     if (!indexPath) throw new Error("indexPath is required for FAISS");
//     return await FaissStore.load(indexPath, embeddings);
//   },
//   memory: async (_, embeddings) => new MemoryVectorStore(embeddings),};

// export async function retrieverBuilder(config: RetrieverBuilderConfig): Promise<BaseRetriever> {
//   const embeddingFactory = embeddingFactories[config.embedding.provider];
//   if (!embeddingFactory) throw new Error(`Unsupported embedding provider: ${config.embedding.provider}`);
//   const embeddings = embeddingFactory(config.embedding);

//   const storeLoader = storeLoaders[config.store.type];
//   if (!storeLoader) throw new Error(`Unsupported vector store: ${config.store.type}`);
//   const store = await storeLoader(config.store, embeddings);

//   return store.asRetriever({ k: config.k ?? 4 });
// }



import { BaseRetriever } from "@langchain/core/retrievers";
import { OpenAIEmbeddings } from "@langchain/openai";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OllamaEmbeddings } from "@langchain/ollama";
import { EmbeddingProvider, VectorStoreType } from "../../types";
import { Document } from "@langchain/core/documents";

type RetrieverBuilderConfig = {
  embedding: {
    provider: EmbeddingProvider;
    apiKey?: string;
    model?: string;
  };
  store: {
    type: VectorStoreType;
    indexPath?: string;
    documents?: Document[];
  };
  k?: number;
};

const embeddingFactories: Record<EmbeddingProvider, (config: RetrieverBuilderConfig["embedding"]) => any> = {
  openai: ({ apiKey, model }) =>
    new OpenAIEmbeddings({ apiKey, model: model || "text-embedding-3-small" }),
  ollama: ({ model }) => new OllamaEmbeddings({ model: model || "nomic-embed-text" }),
  huggingface: ({ apiKey, model }) =>
    new HuggingFaceInferenceEmbeddings({
      apiKey: apiKey!,
      model: model || "sentence-transformers/all-MiniLM-L6-v2",
    }),
};

const storeLoaders: Record<
  VectorStoreType,
  (config: RetrieverBuilderConfig["store"], embeddings: any) => Promise<any>
> = {
  faiss: async ({ indexPath, documents }, embeddings) => {
    if (!indexPath) throw new Error("indexPath is required for FAISS");

    // Eğer documents varsa önce oluştur, kaydet, sonra yükle
    if (documents && documents.length > 0) {
      const createdStore = await FaissStore.fromDocuments(documents, embeddings);
      await createdStore.save(indexPath);
    }

    return await FaissStore.load(indexPath, embeddings);
  },
  memory: async (_, embeddings) => new MemoryVectorStore(embeddings),
};

export async function retrieverBuilder(config: RetrieverBuilderConfig): Promise<BaseRetriever> {
  const embeddingFactory = embeddingFactories[config.embedding.provider];
  if (!embeddingFactory) throw new Error(`Unsupported embedding provider: ${config.embedding.provider}`);
  const embeddings = embeddingFactory(config.embedding);

  const storeLoader = storeLoaders[config.store.type];
  if (!storeLoader) throw new Error(`Unsupported vector store: ${config.store.type}`);
  const store = await storeLoader(config.store, embeddings);

  return store.asRetriever({ k: config.k ?? 4 });
}