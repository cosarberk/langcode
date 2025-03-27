import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { OpenAiInitConfig, OpenAiRunArgs,Plugin } from "../../types";

export default class OpenAIPlugin implements Plugin<OpenAiInitConfig, OpenAiRunArgs ,String> {
  name = "openai";
  description = "OpenAI GPT modellerini kullanır.";
  private llm: ChatOpenAI | null = null;
  static exampleConfig = {
    apiKey: "sk-...",
    modelName: "gpt-4o",
    temperature: 0
  };

  async init(config:OpenAiInitConfig) {
    const { apiKey, modelName = "gpt-4o", temperature = 0 } = config;

    this.llm = new ChatOpenAI({
      apiKey,
      model: modelName,
      temperature,
    });

    // API anahtarının geçerliliğini kontrol etmek için basit bir test
    try {
      await this.llm.invoke([new HumanMessage("Merhaba")]);
    } catch (error) {
      throw new Error("OpenAI API anahtarı geçersiz veya erişim sağlanamıyor.");
    }
  }

  async run(args:OpenAiRunArgs):Promise<any> {
    if (!this.llm) {
      throw new Error("Plugin başlatılmadı. Lütfen önce init() metodunu çağırın.");
    }

    const { prompt } = args;
    const response = await this.llm.invoke([new HumanMessage(prompt)]);
    return response.content;
  }
}