import { ConversationSummaryMemory } from "langchain/memory";
import { Logger } from "../../core/Logger";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";

type SummaryMemoryBuilderConfig = {
  llm: BaseChatModel;
  memoryKey?: string;
};

export async function summaryMemoryBuilder(config: SummaryMemoryBuilderConfig) {
  const logger = new Logger(); // debug ve logfile yok, SENİN SİSTEMİNE UYGUN

  logger.log("🧠 SummaryMemory başlatılıyor...", {
    memoryKey: config.memoryKey,
    llm: `[Instance of ${config.llm.constructor.name}]`,
  });

  const memory = new ConversationSummaryMemory({
    llm: config.llm,
    memoryKey: config.memoryKey || "summary_chat",
  });

  logger.log("✅ SummaryMemory hazır.");
  return memory;
}