import {EmbeddingProviders,VectorStores, OpenAIVectorSearchExpose, OpenAIVectorSearchInitConfig, OpenAIVectorSearchRunArgs, Plugin, PluginType } from "../../types";
import { Document } from "@langchain/core/documents";
import {  retrieverBuilder } from "../../base";
import VectorSearchPlugin from "../VectorSearch/VectorSearchPlugin";



export default class OpenAIVectorSearchPlugin
  implements Plugin<OpenAIVectorSearchInitConfig, OpenAIVectorSearchRunArgs,OpenAIVectorSearchExpose, Document[]>
{
  name = "openaivectorsearch";
  description = "Query a FAISS vector index using OpenAI embeddings.";
  type=PluginType.VectorSearch;
  RunConfigExample:OpenAIVectorSearchRunArgs={
    query: ""
  }
  InitConfigExample: OpenAIVectorSearchInitConfig = {
    apiKey: "sk-...",
    model: "text-embedding-3-small",
    indexPath: "./data/faiss-index",
    k: 3,
  };
  private retriever!:OpenAIVectorSearchExpose["retriever"]


  expose():OpenAIVectorSearchExpose {
    return {
      name:this.name,
      description:this.description,
      type:this.type,
      InitConfigExample:this.InitConfigExample,
      RunConfigExample:this.RunConfigExample,
      retriever:this.retriever
    }
  }

  async init(config: OpenAIVectorSearchInitConfig) {



  const retriever =await retrieverBuilder({embedding:{provider:EmbeddingProviders.OpenAI,
    apiKey:config.apiKey,
    model:config.model || "text-embedding-3-small"
  },store:{type:VectorStores.Faiss,indexPath:config.indexPath || "./data/faiss-index" },k:config.k ?? 4})

  this.retriever=retriever
   
  }

  async run(args: OpenAIVectorSearchRunArgs) {
  const vectorSearchPlugin = new VectorSearchPlugin()
    return await vectorSearchPlugin.run({retriever:this.retriever,query:args.query})
  }


}