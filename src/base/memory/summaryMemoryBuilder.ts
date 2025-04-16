import { ConversationSummaryMemory } from "langchain/memory";
import {  logger } from "../../core";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { LoggerArgs } from "../../types";

type SummaryMemoryBuilderConfig = {
  llm: BaseChatModel;
  memoryKey?: string;
  log:LoggerArgs
};

export async function summaryMemoryBuilder(config: SummaryMemoryBuilderConfig) {
  const _logger = logger(config.log)

  _logger.info("🧠 SummaryMemory başlatılıyor...", {
    memoryKey: config.memoryKey,
    llm: `[Instance of ${config.llm.constructor.name}]`,
  });

  const memory = new ConversationSummaryMemory({
    llm: config.llm,
    memoryKey: config.memoryKey || "summary_chat",
  });

  _logger.success("✅ SummaryMemory hazır.");
  return memory;
}