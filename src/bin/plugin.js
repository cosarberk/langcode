#!/usr/bin/env node

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
const TEMPLATE_PATH = path.join(__dirname, "plugin-template");

async function createPlugin(pluginName) {
  const PluginName = pluginName.charAt(0).toUpperCase() + pluginName.slice(1);
  const pluginFolder = path.join(PLUGIN_PATH, pluginName);
  const pluginFile = path.join(pluginFolder, `${pluginName}Plugin.ts`);
  const pluginTypeFile = path.join(TYPE_PATH, "plugins", `${pluginName}Plugin.ts`);

  if (!fs.existsSync(pluginFolder)) fs.mkdirSync(pluginFolder);

  const pluginTemplate = fs.readFileSync(path.join(TEMPLATE_PATH, "Plugin.ts"), "utf-8")
  .replace(/{{PluginName}}/g, PluginName)
  .replace(/{{pluginName}}/g, pluginName);

const typeTemplate = fs.readFileSync(path.join(TEMPLATE_PATH, "types.ts"), "utf-8")
  .replace(/{{PluginName}}/g, PluginName)
  .replace(/{{pluginName}}/g, pluginName);

  fs.writeFileSync(pluginFile, pluginTemplate);
  fs.writeFileSync(pluginTypeFile, typeTemplate);

  let enumContent = fs.readFileSync(ENUM_PATH, "utf-8");
  if (!enumContent.includes(`${pluginName} =`)) {
    enumContent = enumContent.replace(
      /export enum plugins {([\s\S]*?)}/,
      (match, p1) => `export enum plugins {${p1}  ${pluginName} = "${pluginName}",\n}`
    );
    fs.writeFileSync(ENUM_PATH, enumContent);
  }

  let pluginMap = fs.readFileSync(TYPE_EXPORT_PATH, "utf-8");
  const importLine = `import { ${PluginName}PluginTypes } from "./${pluginName}Plugin";`;
  if (!pluginMap.includes(importLine)) {
    pluginMap = importLine + "\n" + pluginMap;
  }
  if (!pluginMap.includes(`${pluginName}:`)) {
    pluginMap = pluginMap.replace(
      /export interface PluginTypeMap {([\s\S]*?)}/,
      (match, p1) => `export interface PluginTypeMap {${p1}  ${pluginName}: typeof ${PluginName}PluginTypes;\n}`
    );
    fs.writeFileSync(TYPE_EXPORT_PATH, pluginMap);
  }

  const typeIndex = fs.readFileSync(INDEX_EXPORT_PATH, "utf-8");
  const typeExportLine = `export * from "./plugins/${pluginName}Plugin";`;
  if (!typeIndex.includes(typeExportLine)) {
    fs.appendFileSync(INDEX_EXPORT_PATH, `\n${typeExportLine}`);
  }

  const pluginIndex = fs.readFileSync(PLUGIN_EXPORT_PATH, "utf-8");
  const pluginExportLine = `export * from "./${pluginName}/${pluginName}Plugin";`;
  if (!pluginIndex.includes(pluginExportLine)) {
    fs.appendFileSync(PLUGIN_EXPORT_PATH, `\n${pluginExportLine}`);
  }

  console.log(chalk.green(`\n✅ Plugin '${pluginName}' başarıyla oluşturuldu.`));
  console.log(chalk.gray(`- src/plugins/${pluginName}/${PluginName}Plugin.ts`));
  console.log(chalk.gray(`- src/types/plugins/${pluginName}.ts`));
  console.log(chalk.gray(`- Plugin enum, PluginTypeMap, ve export'lar güncellendi\n`));
}

module.exports = { createPlugin };