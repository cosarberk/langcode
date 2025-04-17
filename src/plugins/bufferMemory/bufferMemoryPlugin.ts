import { BufferMemory } from "langchain/memory";
import { Plugin } from "../../types";
import {
  PluginType,
  BufferMemoryInitConfig,
  BufferMemoryRunArgs,
  BufferMemoryExpose,
} from "../../types";
export default class BufferMemoryPlugin
  implements
    Plugin<
      BufferMemoryInitConfig,
      BufferMemoryRunArgs,
      BufferMemoryExpose,
      any
    >
{
  name = "bufferMemory";
  description = "Stores chat messages in memory (non-persistent)";
  type = PluginType.Memory;
  RunConfigExample:BufferMemoryRunArgs={

  }
  InitConfigExample: BufferMemoryInitConfig = {
    memoryKey: "chat_history",
    aiPrefix: "AI",
    humanPrefix: "Human",
  };

  private memory: BufferMemoryExpose["memory"] = null;

  expose(): BufferMemoryExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      InitConfigExample: this.InitConfigExample,
      RunConfigExample:this.RunConfigExample,
      memory: this.memory,
    };
  }

  async init(config: BufferMemoryInitConfig) {
    this.memory = new BufferMemory({
      memoryKey: config.memoryKey || "chat_history",
      humanPrefix: config.humanPrefix || "Human",
      aiPrefix: config.aiPrefix || "AI",
    });
  }

  async run(args: BufferMemoryRunArgs): Promise<any> {
    if (!this.memory) throw new Error("Memory is not initialized.");
    const history = await this.memory.chatHistory.getMessages();
    return history;
  }
}
