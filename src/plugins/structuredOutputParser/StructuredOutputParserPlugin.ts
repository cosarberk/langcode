import { Plugin, PluginType, StructuredOutputParserExpose, StructuredOutputParserInitConfig, StructuredOutputParserRunArgs } from "../../types";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";



export default class StructuredOutputParserPlugin
  implements Plugin<StructuredOutputParserInitConfig, StructuredOutputParserRunArgs,StructuredOutputParserExpose, any>
{
  name = "structuredOutputParser";
  description = "Parses structured JSON-like LLM outputs using a Zod schema.";
  type=PluginType.Parser;
  RunConfigExample:StructuredOutputParserRunArgs={
    text: ""
  }
  private parser!:StructuredOutputParserExpose["parser"];
 InitConfigExample:StructuredOutputParserInitConfig = {
    schema: z.object({
      name: z.string(),
      age: z.number(),
    }),
  };
  expose():StructuredOutputParserExpose {
    return {
      name: this.name,
      description: this.description,
      type:this.type,
      InitConfigExample:this.InitConfigExample,
      RunConfigExample:this.RunConfigExample,
      parser:this.parser
    };
  }
  async init(config: StructuredOutputParserInitConfig) {
    this.parser = StructuredOutputParser.fromZodSchema(config.schema);
  }

  async run(args: StructuredOutputParserRunArgs) {
    return await this.parser.parse(args.text);
  }


}