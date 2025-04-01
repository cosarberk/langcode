const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const BASE_PATH = path.resolve("src");
const PLUGIN_PATH = path.join(BASE_PATH, "plugins");
const TYPE_PATH = path.join(BASE_PATH, "types");
const ENUM_PATH = path.join(TYPE_PATH, "enums", "index.ts");
const TYPE_EXPORT_PATH = path.join(TYPE_PATH, "plugins", "plugin.ts");
const INDEX_EXPORT_PATH = path.join(TYPE_PATH, "index.ts");
const PLUGIN_EXPORT_PATH = path.join(PLUGIN_PATH, "index.ts");

function updatePluginName(oldName, newName) {
  const OldName = oldName.charAt(0).toUpperCase() + oldName.slice(1);
  const NewName = newName.charAt(0).toUpperCase() + newName.slice(1);

  const oldFolder = path.join(PLUGIN_PATH, oldName);
  const newFolder = path.join(PLUGIN_PATH, newName);

  if (!fs.existsSync(oldFolder)) {
    console.log(chalk.red("❌ Plugin bulunamadı:"), oldName);
    return;
  }

  fs.renameSync(oldFolder, newFolder);
  fs.renameSync(
    path.join(newFolder, `${oldName}Plugin.ts`),
    path.join(newFolder, `${newName}Plugin.ts`)
  );

  const pluginTypePathOld = path.join(TYPE_PATH, "plugins", `${oldName}Plugin.ts`);
  const pluginTypePathNew = path.join(TYPE_PATH, "plugins", `${newName}Plugin.ts`);
  fs.renameSync(pluginTypePathOld, pluginTypePathNew);

  const updateInFile = (filePath, oldStr, newStr) => {
    let content = fs.readFileSync(filePath, "utf-8");
    content = content.replaceAll(oldStr, newStr);
    fs.writeFileSync(filePath, content);
  };

  // Enum ve export dosyalarını güncelle
  let enumContent = fs.readFileSync(ENUM_PATH, "utf-8");
const enumRegex = new RegExp(`${oldName}\\s*=\\s*"${oldName}"`, "g");
enumContent = enumContent.replace(enumRegex, `${newName} = "${newName}"`);
fs.writeFileSync(ENUM_PATH, enumContent);
  updateInFile(TYPE_EXPORT_PATH, `${OldName}PluginTypes`, `${NewName}PluginTypes`);
  updateInFile(TYPE_EXPORT_PATH, `./${oldName}Plugin`, `./${newName}Plugin`);
  updateInFile(TYPE_EXPORT_PATH, `${oldName}:`, `${newName}:`);
  updateInFile(INDEX_EXPORT_PATH, `./plugins/${oldName}Plugin`, `./plugins/${newName}Plugin`);
  updateInFile(PLUGIN_EXPORT_PATH, `./${oldName}/${oldName}Plugin`, `./${newName}/${newName}Plugin`);

  // Plugin ve Type dosyalarının içeriğini güncelle
  const pluginCodePath = path.join(newFolder, `${newName}Plugin.ts`);
  const typeCodePath = path.join(TYPE_PATH, "plugins", `${newName}Plugin.ts`);

  const updateContent = (filePath, oldVal, newVal) => {
    let content = fs.readFileSync(filePath, "utf-8");
    const OldVal = oldVal.charAt(0).toUpperCase() + oldVal.slice(1);
    const NewVal = newName.charAt(0).toUpperCase() + newName.slice(1);
  
    content = content
      .replaceAll(`${OldVal}InitConfig`, `${NewVal}InitConfig`)
      .replaceAll(`${OldVal}RunArgs`, `${NewVal}RunArgs`)
      .replaceAll(`${OldVal}Expose`, `${NewVal}Expose`)
      .replaceAll(`${OldVal}Plugin`, `${NewVal}Plugin`)
      .replaceAll(`${OldVal}PluginTypes`, `${NewVal}PluginTypes`)
      .replaceAll(`${oldName}`, `${newName}`)
      .replaceAll(`"${oldName}"`, `"${newName}"`);
  
    fs.writeFileSync(filePath, content);
  };

  updateContent(pluginCodePath, oldName, newName);
  updateContent(typeCodePath, oldName, newName);

  console.log(chalk.green(`\n🔁 Plugin adı '${oldName}' → '${newName}' olarak TAMAMEN güncellendi.`));
}

function deletePlugin(pluginName) {
  const PluginName = pluginName.charAt(0).toUpperCase() + pluginName.slice(1);
  const pluginFolder = path.join(PLUGIN_PATH, pluginName);
  const pluginTypeFile = path.join(TYPE_PATH, "plugins", `${pluginName}Plugin.ts`);

  if (!fs.existsSync(pluginFolder)) {
    console.log(chalk.red("❌ Plugin bulunamadı:"), pluginName);
    return;
  }

  fs.rmSync(pluginFolder, { recursive: true, force: true });
  if (fs.existsSync(pluginTypeFile)) fs.unlinkSync(pluginTypeFile);

  const removeFromFile = (filePath, matcher) => {
    let content = fs.readFileSync(filePath, "utf-8");
    content = content
      .split("\n")
      .filter((line) => !matcher.test(line))
      .join("\n");
    fs.writeFileSync(filePath, content);
  };

  removeFromFile(ENUM_PATH, new RegExp(`${pluginName}\\s=\\s\"${pluginName}\"`));
  removeFromFile(TYPE_EXPORT_PATH, new RegExp(`${pluginName}:\\s`));
  removeFromFile(TYPE_EXPORT_PATH, new RegExp(`\\{\\s${PluginName}PluginTypes\\s\\}`));
  removeFromFile(TYPE_EXPORT_PATH, new RegExp(`from \\\"\\./${pluginName}Plugin\\\"`));
  removeFromFile(INDEX_EXPORT_PATH, new RegExp(`\\./plugins/${pluginName}Plugin`));
  removeFromFile(PLUGIN_EXPORT_PATH, new RegExp(`\\./${pluginName}/${pluginName}Plugin`));

  console.log(chalk.yellow(`\n🗑️ Plugin '${pluginName}' tamamen silindi.`));
}

module.exports = {
  updatePluginName,
  deletePlugin,
};