import { DockerPluginTypes } from "./dockerPlugin";
import { TerminalPluginTypes } from "./terminalPlugin";
import { PythonExecutorPluginTypes } from "./pythonExecutorPlugin";
import { TextToSpeechPluginTypes } from "./textToSpeechPlugin";
import { SpeechToTextPluginTypes } from "./speechToTextPlugin";
import { PdfParserPluginTypes } from "./pdfParserPlugin";
import { CheerioScraperPluginTypes } from "./cheerioScraperPlugin";
import { BrowserToolPluginTypes } from "./browserToolPlugin";
import { DuckduckgoPluginPluginTypes } from "./duckduckgoPluginPlugin";
import { SerpAPIToolPluginTypes } from "./serpAPIToolPlugin";
import { RequestsPostToolPluginTypes } from "./requestsPostToolPlugin";
import { RequestsGetToolPluginTypes } from "./requestsGetToolPlugin";
import { CalculatorToolPluginTypes } from "./calculatorToolPlugin";
import { DirectoryLoaderPluginTypes } from "./directoryLoaderPlugin";
import { CsvLoaderPluginTypes } from "./csvLoaderPlugin";
import { PdfLoaderPluginTypes } from "./pdfLoaderPlugin";
import { TextLoaderPluginTypes } from "./textLoaderPlugin";
import { BufferMemoryPluginTypes } from "./bufferMemoryPlugin";
import { plugins, PluginType } from "../enums";
import { AgentOpenAIPluginTypes } from "./agentOpenAIPlugin";
import { DallePluginTypes } from "./dallePlugin";
import { HttpPluginTypes } from "./httpPlugin";
import { MailerPluginTypes } from "./mailerPlugin";
import { OpenAIEmbeddingPluginTypes } from "./openAIEmbeddingPlugin";
import { OpenAIPluginTypes } from "./openAIPlugin";
import { OpenAIVectorSearchPluginTypes } from "./openAIVectorSearchPlugin";
import { PromptTemplatePluginTypes } from "./promptTemplatePlugin";
import { StructuredOutputParserPluginTypes } from "./structuredOutputParserPlugin";
import { VectorSearchPluginTypes } from "./vectorSearchPlugin";
import "../global";
export interface Plugin<InitConfig = Record<string, any>,RunArgs = Record<string, any>,Expose = Record<string, any>,RunReturn = any> {
  name: string;
  description: string;
  InitConfigExample?: Record<string, any> | {};
  RunConfigExample?: Record<string, any> | {};
  type: PluginType;
  init(config: InitConfig): Promise<void>;
  run(args: RunArgs): Promise<RunReturn>;
  expose(): Expose;
  
}


export interface PluginDescriptions {
  name: string;
  description: string;
  InitConfigExample: Record<string, any>;
  RunConfigExample: Record<string, any>;
  type: PluginType;
}

export interface PluginConfigs {
  pluginName:plugins
  config:{ [key: string]: any }
}

export interface PluginTypeMap {
  dalle: typeof DallePluginTypes;
  openai: typeof OpenAIPluginTypes;
  http: typeof HttpPluginTypes
  mailer: typeof MailerPluginTypes
  promptTemplate :typeof PromptTemplatePluginTypes
  agentOpenAI: typeof AgentOpenAIPluginTypes
  openAIEmbedding:typeof OpenAIEmbeddingPluginTypes
  openAIVectorSearch:typeof OpenAIVectorSearchPluginTypes
  vectorSearch:typeof VectorSearchPluginTypes
  structuredOutputParser:typeof StructuredOutputParserPluginTypes
  bufferMemory: typeof BufferMemoryPluginTypes;
  textLoader: typeof TextLoaderPluginTypes;
  pdfLoader: typeof PdfLoaderPluginTypes;
  csvLoader: typeof CsvLoaderPluginTypes;
  directoryLoader: typeof DirectoryLoaderPluginTypes;
  calculatorTool: typeof CalculatorToolPluginTypes;
  requestsGetTool: typeof RequestsGetToolPluginTypes;
  requestsPostTool: typeof RequestsPostToolPluginTypes;
  serpAPITool: typeof SerpAPIToolPluginTypes;
  duckduckgoPlugin: typeof DuckduckgoPluginPluginTypes;
  browserTool: typeof BrowserToolPluginTypes;
  cheerioScraper: typeof CheerioScraperPluginTypes;
  pdfParser: typeof PdfParserPluginTypes;
  speechToText: typeof SpeechToTextPluginTypes;
  textToSpeech: typeof TextToSpeechPluginTypes;
  pythonExecutor: typeof PythonExecutorPluginTypes;
  terminal: typeof TerminalPluginTypes;
  docker: typeof DockerPluginTypes;
}