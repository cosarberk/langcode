import { PythonInterpreterTool } from "@langchain/community/experimental/tools/pyinterpreter";
import { PluginDescriptions } from "./plugin";
import { PyodideInterface } from "pyodide";

export type PythonExecutorInitConfig = {};

export type PythonExecutorRunArgs = {
  code: string; 
  packages?: string[]
  micropipPackages?: string[]
};

export interface PythonExecutorExpose extends PluginDescriptions {
pythonInterpreter: PythonInterpreterTool | null
pyodideInstance: PyodideInterface | null
}

export const PythonExecutorPluginTypes = {
  runArgs: {} as PythonExecutorRunArgs,
  return: {} as any,
  expose: {} as PythonExecutorExpose,
};