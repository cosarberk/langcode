import { Plugin } from "../../types";
import { PluginType, TextToSpeechInitConfig, TextToSpeechRunArgs, TextToSpeechExpose } from "../../types";
import axios from "axios";
import fs from "fs/promises";


export default class TextToSpeechPlugin
  implements Plugin<TextToSpeechInitConfig, TextToSpeechRunArgs, TextToSpeechExpose, any> {
  
  name = "textToSpeech";
  description = "Metni ElevenLabs üzerinden sese çeviren plugin.";
  type = PluginType.Tool;

  configExample: TextToSpeechInitConfig = {
    elevenLabsApiKey: "api-...",
    defaultVoiceId: "EXAVITQu4vr4xnSDxMaL",
  };

  private apiKey: TextToSpeechExpose["apiKey"]= null;
  private defaultVoiceId: TextToSpeechExpose["defaultVoiceId"] = "EXAVITQu4vr4xnSDxMaL";

  expose(): TextToSpeechExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      configExample: this.configExample,
      apiKey: this.apiKey,
      defaultVoiceId: this.defaultVoiceId,

    };
  }

  async init(config: TextToSpeechInitConfig) {
    if (!config.elevenLabsApiKey) {
      throw new Error("ElevenLabs API key (elevenLabsApiKey) is required.");
    }
    this.apiKey = config.elevenLabsApiKey;
    if (config.defaultVoiceId) {
      this.defaultVoiceId = config.defaultVoiceId;
    }
  }

  async run(args: TextToSpeechRunArgs): Promise<any> {
    if (!this.apiKey) {
      throw new Error("Plugin has not been initialized with an ElevenLabs API key.");
    }

    const { text, voiceId, outputFilePath } = args;
    if (!text) {
      throw new Error("Lütfen 'text' parametresini sağlayın.");
    }

    // Kullanıcı bir voiceId geçmezse, init aşamasındaki defaultVoiceId’yi kullan
    const usedVoiceId = voiceId || this.defaultVoiceId;

    try {
      // 1) ElevenLabs API'ine POST isteği
      //    https://api.elevenlabs.io/v1/text-to-speech/{voiceId}
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${usedVoiceId}`,
        {
          text,
        },
        {
          headers: {
            "xi-api-key": this.apiKey,
            "Content-Type": "application/json",
          },
          // responseType: "arraybuffer" -> mp3 veya ogg binary gelecek
          responseType: "arraybuffer",
        },
      );

      const audioBuffer = Buffer.from(response.data);

      // 2) Kullanıcı isterse ses dosyası diske kaydedilebilir
      if (outputFilePath) {
        await fs.writeFile(outputFilePath, audioBuffer);
        return {
          message: `Audio file saved to ${outputFilePath}`,
          size: audioBuffer.length,
        };
      }

      // 3) Aksi halde Buffer olarak direkt döndürelim
      return {
        audioBuffer,
        size: audioBuffer.length,
      };
    } catch (err: any) {
      throw new Error(`Text-to-speech isteği başarısız: ${err.message}`);
    }
  }
}