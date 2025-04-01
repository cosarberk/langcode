
import { Document } from "@langchain/core/documents";
import { VectorSearchInitConfig, VectorSearchRunArgs,Plugin, VectorSearchExpose, PluginType } from "../../types";


export default class VectorSearchPlugin
  implements Plugin<VectorSearchInitConfig, VectorSearchRunArgs, VectorSearchExpose, Document[]>
{
  name = "vectorSearch";
  description = "Generic vector search with dynamic retriever input.";
  type=PluginType.VectorSearch;
  private retriever!:VectorSearchExpose["retriever"];

  configExample = {}; // init'e config verilmeyecek

  expose(): VectorSearchExpose {
    return {
      name: this.name,
      description: this.description,
      type:this.type,
      configExample: this.configExample,
      retriever: this.retriever,
    };
  }
  
  async init(_: VectorSearchInitConfig) {
    // hiçbir şey yapılmaz
  }

  async run(args: VectorSearchRunArgs): Promise<Document[]> {
    const { retriever, query } = args;
  //  if (!retriever || !query) {throw new Error("retriever instance is required")};
    this.retriever = retriever
    return await retriever.invoke(query);
  }

 
}