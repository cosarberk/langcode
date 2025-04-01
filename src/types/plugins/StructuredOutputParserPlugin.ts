import { z, ZodSchema } from "zod";
import { PluginDescriptions } from "./plugin";
import { StructuredOutputParser } from "langchain/output_parsers";


export type StructuredOutputParserInitConfig = {
  schema: ZodSchema<any>;
};

export type StructuredOutputParserRunArgs = {
  text: string;
};

  export interface StructuredOutputParserExpose extends PluginDescriptions{
    parser: StructuredOutputParser<any>
  }

export const StructuredOutputParserPluginTypes = {
    runArgs: {} as StructuredOutputParserRunArgs,
    return: {} as any,
    expose:{} as StructuredOutputParserExpose
  };