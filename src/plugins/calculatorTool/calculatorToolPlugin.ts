import { Calculator } from "@langchain/community/tools/calculator";
import { Plugin } from "../../types";
import { PluginType, CalculatorToolInitConfig, CalculatorToolRunArgs, CalculatorToolExpose } from "../../types";
export default class CalculatorToolPlugin
  implements Plugin<CalculatorToolInitConfig, CalculatorToolRunArgs, CalculatorToolExpose, any> {
  
  name = "calculatorTool";
  description = "Evaluate math expressions using a built-in calculator.";
  type = PluginType.Tool;
  RunConfigExample:CalculatorToolRunArgs={
    input: ""
  }
  InitConfigExample: CalculatorToolInitConfig = {};

  private tool: CalculatorToolExpose["tool"]= null;

  expose(): CalculatorToolExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      InitConfigExample: this.InitConfigExample,
      RunConfigExample:this.RunConfigExample,
      tool: this.tool,
    };
  }

  async init(config: CalculatorToolInitConfig) {
    this.tool = new Calculator();
  }

  async run(args: CalculatorToolRunArgs): Promise<any> {
    if (!this.tool) throw new Error("Tool is not initialized.");
    const result = await this.tool.invoke(args);
    return result;
  }
}