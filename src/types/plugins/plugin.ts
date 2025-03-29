import { plugins } from "../enums";
import { AgentOpenAIPluginTypes } from "./AgentOpenAIPlugin";
import { DallePluginTypes } from "./DallePlugin";
import { HttpPluginTypes } from "./HttpPlugin";
import { MailerPluginTypes } from "./MailerPlugin";
import { OpenAIEmbeddingPluginTypes } from "./OpenAIEmbeddingPlugin";
import { OpenAiPluginTypes } from "./OpenaiPlugin";
import { OpenAIVectorSearchPluginTypes } from "./OpenAIVectorSearchPlugin";
import { PromptTemplatePluginTypes } from "./PromptTemplatePlugin";

export interface Plugin<InitConfig = Record<string, any>,RunArgs = Record<string, any>,RunReturn = any> {
  name: string;
  description: string;

  init(config: InitConfig): Promise<void>;
  run(args: RunArgs): Promise<RunReturn>;
}
export interface PluginDescriptions {
  name: string;
  description: string;
  configExample: Record<string, any>;
}

export interface PluginConfigs {
  pluginName:plugins
  config:{ [key: string]: any }
}

export interface PluginTypeMap {
  dalle: typeof DallePluginTypes;
  openai: typeof OpenAiPluginTypes;
  http: typeof HttpPluginTypes
  mailer: typeof MailerPluginTypes
  promptTemplate :typeof PromptTemplatePluginTypes
  agentOpenAI: typeof AgentOpenAIPluginTypes
  openaiEmbedding:typeof OpenAIEmbeddingPluginTypes
  openaiVectorSearch:typeof OpenAIVectorSearchPluginTypes
}