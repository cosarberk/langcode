import { Plugin } from "../../types";
import {
  PluginType,
  PythonExecutorInitConfig,
  PythonExecutorRunArgs,
  PythonExecutorExpose,
} from "../../types";
import { PythonInterpreterTool } from "@langchain/community/experimental/tools/pyinterpreter";
import { loadPyodide, PyodideInterface } from "pyodide";

export default class PythonExecutorPlugin
  implements
    Plugin<
      PythonExecutorInitConfig,
      PythonExecutorRunArgs,
      PythonExecutorExpose,
      any
    >
{
  name = "pythonExecutor";
  description =
    "Python kodlarını LangChain'in PythonInterpreterTool aracıyla çalıştıran plugin.";
  type = PluginType.Tool;
  RunConfigExample: PythonExecutorRunArgs = {
    code: "",
    packages: [""],
    micropipPackages: [""],
  };
  InitConfigExample: PythonExecutorInitConfig = {};

  private pythonInterpreter: PythonExecutorExpose["pythonInterpreter"] = null;
  private pyodideInstance: PythonExecutorExpose["pyodideInstance"] = null;

  expose(): PythonExecutorExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      InitConfigExample: this.InitConfigExample,
      RunConfigExample:this.RunConfigExample,
      pyodideInstance: this.pyodideInstance,
      pythonInterpreter: this.pythonInterpreter,
    };
  }

  async init(config: PythonExecutorInitConfig) {
    const pyodideInstance: PyodideInterface = await loadPyodide();
    this.pyodideInstance = pyodideInstance;
    this.pythonInterpreter = new PythonInterpreterTool({
      instance: pyodideInstance,
    });
  }

  async run(args: PythonExecutorRunArgs): Promise<any> {
    if (!this.pythonInterpreter)
      throw new Error("PythonExecutorPlugin başlatılmadı.");

    const { code, packages, micropipPackages } = args;

    try {
      // Pyodide resmi paketleri yükle
      if (packages?.length) {
        for (const pkg of packages) {
          await this.pythonInterpreter.addPackage(pkg);
        }
      }

      // micropip paketlerini yükle (PyPI'den saf python paketleri)
      if (micropipPackages?.length) {
        await this.pythonInterpreter.addPackage("micropip");
        const micropip =
          this.pythonInterpreter.pyodideInstance.pyimport("micropip");
        for (const pkg of micropipPackages) {
          await micropip.install(pkg);
        }
      }

      // Python kodunu çalıştır
      const result = await this.pythonInterpreter.invoke(code);
      return { result };
    } catch (error: any) {
      return { error: error.message || error };
    }
  }
}
