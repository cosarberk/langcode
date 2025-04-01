import { PluginDescriptions } from "./plugin";

export type {{PluginName}}InitConfig = {
  // init config alanları
};

export type {{PluginName}}RunArgs = {
  // run parametreleri
};

export interface {{PluginName}}Expose extends PluginDescriptions {
  tool: any;
}

export const {{PluginName}}PluginTypes = {
  runArgs: {} as {{PluginName}}RunArgs,
  return: {} as any,
  expose: {} as {{PluginName}}Expose,
};