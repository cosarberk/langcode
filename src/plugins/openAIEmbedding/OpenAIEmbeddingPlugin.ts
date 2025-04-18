import { OpenAIEmbeddingExpose, OpenAIEmbeddingInitConfig, OpenAIEmbeddingRunArgs, Plugin, PluginType } from "../../types";
import { OpenAIEmbeddings } from "@langchain/openai";



export default class OpenAIEmbeddingPlugin
  implements Plugin<OpenAIEmbeddingInitConfig, OpenAIEmbeddingRunArgs,OpenAIEmbeddingExpose, number[]>
{
  name = "openAIEmbedding";
  description = "Get embeddings from OpenAI for a given text.";
  type=PluginType.Embedding;
  RunConfigExample:OpenAIEmbeddingRunArgs={
    text: ""
  }
  InitConfigExample: OpenAIEmbeddingInitConfig = {
    apiKey: "sk-...",
    model: "text-embedding-3-small",
  };

  private embeddingModel!: OpenAIEmbeddings;

  expose():OpenAIEmbeddingExpose {
    return {
      name:this.name,
      description:this.description,
      type:this.type,
      InitConfigExample:this.InitConfigExample,
      RunConfigExample:this.RunConfigExample,
      embeddingModel:this.embeddingModel
    }
  }

  async init(config: OpenAIEmbeddingInitConfig) {
    this.embeddingModel = new OpenAIEmbeddings({
      apiKey: config.apiKey,
      model: config.model || "text-embedding-3-small",
    });
  }

  async run(args: OpenAIEmbeddingRunArgs): Promise<number[]> {
    const result = await this.embeddingModel.embedQuery(args.text);
    return result;
  }


}