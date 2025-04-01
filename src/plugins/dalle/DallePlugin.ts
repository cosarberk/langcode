import { DallEAPIWrapper } from "@langchain/openai";
import fs from "fs/promises";
import path from "path";
import axios from "axios";
import { DalleExpose, DalleInitConfig, DalleRunArgs,Plugin, PluginType } from "../../types";


export default class DallePlugin implements Plugin<DalleInitConfig, DalleRunArgs,DalleExpose, string>
{
  name = "dalle";
  description = "OpenAI DALL·E API ile görsel üretir.";
type=PluginType.Tool;
  private dalle: DalleExpose["dalle"] | null = null;

  configExample:DalleInitConfig = {
    openAIApiKey: "sk-...",
    modelName: "dall-e-3",
    size: "1024x1024",
    n:1
  };

  expose():DalleExpose {
    return {
      name:this.name,
      description:this.description,
      type:this.type,
      configExample:this.configExample,
      dalle:this.dalle
    } 
  }

  async init(config: DalleInitConfig) {
    this.dalle = new DallEAPIWrapper({
      openAIApiKey: config.openAIApiKey,
      modelName: config.modelName || "dall-e-3",
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