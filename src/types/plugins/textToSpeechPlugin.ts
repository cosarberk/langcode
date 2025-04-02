import { PluginDescriptions } from "./plugin";

export type TextToSpeechInitConfig = {
  elevenLabsApiKey: string;
  defaultVoiceId?: string;
};

export type TextToSpeechRunArgs = {
  text: string;          
  voiceId?: string;       
  outputFilePath?: string
};

export interface TextToSpeechExpose extends PluginDescriptions {
  apiKey: string | null
  defaultVoiceId: string 
}

export const TextToSpeechPluginTypes = {
  runArgs: {} as TextToSpeechRunArgs,
  return: {} as any,
  expose: {} as TextToSpeechExpose,
};