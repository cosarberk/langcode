import { plugins } from "../types/enums";
import { Plugin, PluginDescriptions } from "../types/plugins/plugin";

// Her plugin ayrı dosyada default export olacak şekilde tasarlandı
export async function getPlugins(): Promise<PluginDescriptions[]> {
  const availablePlugins: PluginDescriptions[] = [];

  for (const pluginName of Object.values(plugins)) {
    try {
      const pluginModule = await import(`../plugins/${pluginName}/${capitalize(pluginName)}Plugin`);
      const pluginInstance: Plugin = new pluginModule.default();
      const configExample = pluginModule.default.exampleConfig || {};

      availablePlugins.push({
        name: pluginInstance.name,
        description: pluginInstance.description,
        configExample
      });
    } catch (err) {
      console.warn(`Plugin '${pluginName}' yüklenemedi:`, err);
    }
  }

  return availablePlugins;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}