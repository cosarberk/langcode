import { BaseRetriever } from "@langchain/core/retrievers";
import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";

export type RetrieverBuilderConfig = {
  type: "faiss"; // İleride: "supabase", "pinecone", vs.
  embeddings: {
    provider: "openai"; // gelecekte "huggingface" vs. olabilir
    apiKey: string;
    model?: string;
  };
  indexPath: string; // FAISS dizini
};

export async function buildRetriever(config: RetrieverBuilderConfig): Promise<BaseRetriever> {
  if (config.type === "faiss") {
    if (config.embeddings.provider !== "openai") {
      throw new Error(`Unsupported embedding provider: ${config.embeddings.provider}`);
    }

    const embeddings = new OpenAIEmbeddings({
      apiKey: config.embeddings.apiKey,
      model: config.embeddings.model || "text-embedding-3-small",
    });

    const vectorstore = await FaissStore.load(config.indexPath, embeddings);
    return vectorstore.asRetriever();
  }

  throw new Error(`Unsupported retriever type: ${config.type}`);
}