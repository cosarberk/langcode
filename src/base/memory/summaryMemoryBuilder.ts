import { ConversationSummaryMemory } from "langchain/memory";
import { LoggerArgs, logger } from "../../core";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";

type SummaryMemoryBuilderConfig = {
  llm: BaseChatModel;
  memoryKey?: string;
  log:LoggerArgs
};

export async function summaryMemoryBuilder(config: SummaryMemoryBuilderConfig) {
  const _logger = logger(config.log)

  _logger.log("🧠 SummaryMemory başlatılıyor...", {
    memoryKey: config.memoryKey,
    llm: `[Instance of ${config.llm.constructor.name}]`,
  });

  const memory = new ConversationSummaryMemory({
    llm: config.llm,
    memoryKey: config.memoryKey || "summary_chat",
  });

  _logger.log("✅ SummaryMemory hazır.");
  return memory;
}