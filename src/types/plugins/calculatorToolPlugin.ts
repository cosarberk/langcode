import { Calculator } from "@langchain/community/tools/calculator";
import { PluginDescriptions } from "./plugin";

export type CalculatorToolInitConfig = {};

export type CalculatorToolRunArgs = {
  input: string;
};

export interface CalculatorToolExpose extends PluginDescriptions {
  tool: Calculator | null 
}

export const CalculatorToolPluginTypes = {
  runArgs: {} as CalculatorToolRunArgs,
  return: {} as any,
  expose: {} as CalculatorToolExpose,
};