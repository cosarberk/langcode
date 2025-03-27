import { DallePluginTypes } from "./DallePlugin";
import { OpenAiPluginTypes } from "./OpenaiPlugin";

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


export interface PluginTypeMap {
  dalle: typeof DallePluginTypes;
  openai: typeof OpenAiPluginTypes;
}