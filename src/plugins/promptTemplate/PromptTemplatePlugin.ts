import { Plugin, PromptTemplateInitConfig, PromptTemplateRunArgs } from "../../types";
import { PromptTemplate } from "@langchain/core/prompts";

export default class PromptTemplatePlugin
  implements Plugin<PromptTemplateInitConfig, PromptTemplateRunArgs, string>
{
  name = "prompttemplate";
  description = "LangChain PromptTemplate formatter";

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