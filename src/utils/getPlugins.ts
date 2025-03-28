import chalk from "chalk";
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

export async function printPlugins() {
  const Allplugins:PluginDescriptions[] =await getPlugins()
    Allplugins.forEach((p, index) => {
      const border = chalk.gray("═".repeat(50));
    
      console.log("\n" + border);
      console.log(chalk.bold.cyan(`🔌 Plugin: ${p.name}`));
      console.log(chalk.gray("📄 Description:"), chalk.white(p.description));
      console.log(chalk.gray("🧪 Example Config:"));
      console.log(
        JSON.stringify(p.configExample, null, 2)
          .split("\n")
          .map((line) => "  " + chalk.green(line))
          .join("\n")
      );
      console.log(border);
    });
}


function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}