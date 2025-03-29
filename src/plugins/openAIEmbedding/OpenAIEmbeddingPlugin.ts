import { OpenAIEmbeddingInitConfig, OpenAIEmbeddingRunArgs, Plugin } from "../../types";
import { OpenAIEmbeddings } from "@langchain/openai";



export default class OpenAIEmbeddingPlugin
  implements Plugin<OpenAIEmbeddingInitConfig, OpenAIEmbeddingRunArgs, number[]>
{
  name = "openaiEmbedding";
  description = "Get embeddings from OpenAI for a given text.";

  static exampleConfig: OpenAIEmbeddingInitConfig = {
    apiKey: "sk-...",
    model: "text-embedding-3-small",
  };

  private embeddingModel!: OpenAIEmbeddings;

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