import { Plugin, PluginType, PromptTemplateExpose, PromptTemplateInitConfig, PromptTemplateRunArgs } from "../../types";
import { PromptTemplate } from "@langchain/core/prompts";

export default class PromptTemplatePlugin
  implements Plugin<PromptTemplateInitConfig, PromptTemplateRunArgs,PromptTemplateExpose, string>
{
  name = "prompttemplate";
  description = "LangChain PromptTemplate formatter";
  type=PluginType.Prompt;
  configExample:PromptTemplateInitConfig={} 

  expose(): PromptTemplateExpose {
    return {
      name:this.name,
      description:this.description,
      type:this.type,
      configExample:this.configExample
    }
  }

  async init(_: PromptTemplateInitConfig) {
    // Bu plugin için init'e ihtiyaç yok
  }

  async run(args: PromptTemplateRunArgs): Promise<string> {
    const { template, inputVariables } = args;

    const prompt = new PromptTemplate({
      template,
      inputVariables: Object.keys(inputVariables),
    });

    const result = await prompt.format(inputVariables);
    return result;
  }
}