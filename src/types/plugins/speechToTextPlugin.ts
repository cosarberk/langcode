import { PluginDescriptions } from "./plugin";

export type SpeechToTextInitConfig = {
  openAIApiKey: string;
  openAIModel?: string;
};

export type SpeechToTextRunArgs = {
  audioFilePath: string; 
  prompt?: string; 
};

export interface SpeechToTextExpose extends PluginDescriptions {
apiKey: string | null
model: string
}

export const SpeechToTextPluginTypes = {
  runArgs: {} as SpeechToTextRunArgs,
  return: {} as any,
  expose: {} as SpeechToTextExpose,
};