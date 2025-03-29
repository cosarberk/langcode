import { Plugin } from "../../types";
import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { Document } from "@langchain/core/documents";


export type OpenAIVectorSearchInitConfig = {
  apiKey: string;
  model?: string;
  indexPath: string;
  k?: number;
};

export type OpenAIVectorSearchRunArgs = {
  query: string;
};

export default class OpenAIVectorSearchPlugin
  implements Plugin<OpenAIVectorSearchInitConfig, OpenAIVectorSearchRunArgs, Document[]>
{
  name = "openaiVectorSearch";
  description = "Query a FAISS vector index using OpenAI embeddings.";

  private retriever!: ReturnType<FaissStore["asRetriever"]>;

  async init(config: OpenAIVectorSearchInitConfig) {
    const embeddings = new OpenAIEmbeddings({
      apiKey: config.apiKey,
      model: config.model || "text-embedding-3-small",
    });

    const vectorstore = await FaissStore.load(config.indexPath, embeddings);
    this.retriever = vectorstore.asRetriever({
      k: config.k ?? 4,
    });
  }

  async run(args: OpenAIVectorSearchRunArgs) {
    return await this.retriever.invoke(args.query);
  }

  static exampleConfig: OpenAIVectorSearchInitConfig = {
    apiKey: "sk-...",
    model: "text-embedding-3-small",
    indexPath: "./data/faiss-index",
    k: 3,
  };
}