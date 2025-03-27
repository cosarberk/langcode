import { DallEAPIWrapper } from "@langchain/openai";
import fs from "fs/promises";
import path from "path";
import axios from "axios";
import { DalleInitConfig, DalleRunArgs,Plugin } from "../../types";


export default class DallePlugin implements Plugin<DalleInitConfig, DalleRunArgs, string>
{
  name = "dalle";
  description = "OpenAI DALL·E API ile görsel üretir.";

  private dalle: DallEAPIWrapper | null = null;

  async init(config: DalleInitConfig) {
    this.dalle = new DallEAPIWrapper({
      openAIApiKey: config.apiKey,
      modelName: config.model || "dall-e-3",
      size: config.size || "1024x1024",
      n: config.n || 1,
    });

    await this.dalle.invoke("ping");
  }

  async run(args: DalleRunArgs): Promise<string> {
    if (!this.dalle) throw new Error("Plugin başlatılmadı");
    const { prompt, outputPath} = args;

    const imageUrl = await this.dalle.invoke(prompt);
    if (outputPath) {
      const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
      const dir = path.dirname(outputPath);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(outputPath, response.data);
    }

    return imageUrl;
  }
}