export enum plugins {
    openai = "openai",
    dalle = "dalle",
    http = "http",
    mailer = "mailer",
    promptTemplate="promptTemplate",
    agentOpenAI = "agentOpenAI",
    openaiEmbedding = "openaiEmbedding",
    openaiVectorSearch ="openaiVectorSearch",
    vectorSearch = "vectorSearch",
    structuredOutputParser ="structuredOutputParser",
  bufferMemory = "bufferMemory",
  textLoader = "textLoader",
  pdfLoader = "pdfLoader",
  csvLoader = "csvLoader",
  directoryLoader = "directoryLoader",
  calculatorTool = "calculatorTool",
  requestsGetTool = "requestsGetTool",
  requestsPostTool = "requestsPostTool",
  serpAPITool = "serpAPITool",
  duckduckgoPlugin = "duckduckgoPlugin",
}



export enum PluginType {
  LLM = "llm",
  Embedding = "embedding",
  VectorSearch = "vectorsearch",
  Parser = "parser",
  Memory = "memory",
  Agent = "agent",
  Tool = "tool",
  Retriever = "retriever",
  Prompt = "prompt",
  Output = "output",
  Loader = "loader",
  Chain = "chain",
  LangCodeTool = "langCodeTool"
}