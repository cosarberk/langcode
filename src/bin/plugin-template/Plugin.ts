import { Plugin } from "../../types";
import { PluginType, {{PluginName}}InitConfig, {{PluginName}}RunArgs, {{PluginName}}Expose } from "../../types";
export default class {{PluginName}}Plugin
  implements Plugin<{{PluginName}}InitConfig, {{PluginName}}RunArgs, {{PluginName}}Expose, any> {
  
  name = "{{pluginName}}";
  description = "{{PluginName}} açıklaması...";
  type = PluginType.Tool;

  configExample: {{PluginName}}InitConfig = {
    // config örneği
  };

  private tool: any = null;

  expose(): {{PluginName}}Expose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      configExample: this.configExample,
      tool: this.tool,
    };
  }

  async init(config: {{PluginName}}InitConfig) {
    // tool başlatma
  }

  async run(args: {{PluginName}}RunArgs): Promise<any> {
    return {}; // örnek çıktı
  }
}