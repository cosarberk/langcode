import { Plugin } from "../../types";
import { PluginType, SpeechToTextInitConfig, SpeechToTextRunArgs, SpeechToTextExpose } from "../../types";
import axios from "axios";
import fs from "fs/promises";
import FormData from "form-data";



export default class SpeechToTextPlugin
  implements Plugin<SpeechToTextInitConfig, SpeechToTextRunArgs, SpeechToTextExpose, any> {
  
  name = "speechToText";
  description = "Bir ses dosyasını OpenAI Whisper API kullanarak metne çeviren plugin.";
  type = PluginType.Tool;

  configExample: SpeechToTextInitConfig = {
    openAIApiKey: "sk-...",
    openAIModel: "whisper-1",
  };

  private apiKey: SpeechToTextExpose["apiKey"] = null;
  private model: SpeechToTextExpose["model"] = "whisper-1";

  expose(): SpeechToTextExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      configExample: this.configExample,
      apiKey: this.apiKey,
      model:this.model
    };
  }

  async init(config: SpeechToTextInitConfig) {
    if (!config.openAIApiKey) {
      throw new Error("openAIApiKey is required for SpeechToTextPlugin.");
    }
    this.apiKey = config.openAIApiKey;
    if (config.openAIModel) {
      this.model = config.openAIModel;
    }
  }

  async run(args: SpeechToTextRunArgs): Promise<any> {
    if (!this.apiKey) {
      throw new Error("Plugin has not been initialized with an OpenAI API key.");
    }
    const { audioFilePath, prompt } = args;
    if (!audioFilePath) {
      throw new Error("'audioFilePath' parametresi zorunludur.");
    }

    // 1) Ses dosyasını oku
    const fileData = await fs.readFile(audioFilePath);

    // 2) OpenAI Audio Transcription API’ine isteği hazırlamak için form-data kullan
    const formData = new FormData();
    formData.append("model", this.model);
    formData.append("file", fileData, "audio.wav");
    if (prompt) {
      // Modelin transkripsiyonu iyileştirmesi için bir ön prompt geçebilirsiniz
      formData.append("prompt", prompt);
    }

    try {
      // 3) API’ye isteği gönder
      const response = await axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      // 4) Cevabı döndür (örneğin { text: "..." } içerir)
      return response.data;
    } catch (err: any) {
      throw new Error(`OpenAI Whisper isteği başarısız: ${err.message}`);
    }
  }
}