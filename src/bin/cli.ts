#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import { langcode, plugins, getPlugins } from "..";
import fs from "fs";

const program = new Command();

program
  .name("langcode")
  .description("🧠 langcode: Plugin tabanlı LangChain SDK CLI")
  .version("0.1.0");

program
  .command("chat")
  .description("OpenAI ile terminalden sohbet başlat")
  .action(async () => {
    console.log(chalk.bold.cyan("🤖 LangChain + OpenAI Sohbet Modu\n"));

    const { apiKey } = await inquirer.prompt([
      {
        type: "password",
        name: "apiKey",
        message: "OpenAI API anahtarınızı girin:",
        mask: "*",
      },
    ]);

    const manager = await langcode([
      {
        pluginName: plugins.openai,
        config: {
          apiKey,
          modelName: "gpt-4o",
          temperature: 0.7,
        },
      },
    ]);

    console.log(chalk.green("✅ Chat hazır! Çıkmak için 'exit' yazın.\n"));

    while (true) {
      const { prompt } = await inquirer.prompt([
        {
          type: "input",
          name: "prompt",
          message: chalk.blue("🗨️  Siz:"),
        },
      ]);

      if (prompt.toLowerCase() === "exit") {
        console.log(chalk.gray("👋 Görüşmek üzere!"));
        break;
      }

      const response = await manager.run(plugins.openai, { prompt });
      console.log(chalk.yellow("🤖 LLM:"), response);
    }
  });

program
  .command("image")
  .description("DALL·E ile görsel oluştur")
  .action(async () => {
    console.log(chalk.bold.magenta("🖼️  Görsel Üretim Modu (DALL·E)\n"));

    const { apiKey, prompt, outputPath } = await inquirer.prompt([
      {
        type: "password",
        name: "apiKey",
        message: "OpenAI API anahtarınızı girin:",
        mask: "*",
      },
      {
        type: "input",
        name: "prompt",
        message: "🎨 Görsel için prompt:",
      },
      {
        type: "input",
        name: "outputPath",
        message: "💾 Kayıt yolu (örnek: ./output/image.png):",
        default: "./output/image.png",
      },
    ]);

    const manager = await langcode([
      {
        pluginName: plugins.dalle,
        config: {
          apiKey,
          size: "1024x1024",
        },
      },
    ]);

    const imageUrl = await manager.run(plugins.dalle, { prompt, outputPath });
    console.log(chalk.green("✅ Görsel oluşturuldu!"));
    console.log(chalk.gray(imageUrl));
  });

program
  .command("list")
  .description("Mevcut pluginleri listele")
  .action(async () => {
    const list = await getPlugins();
    console.log(chalk.bold("\n📦 Yüklü Pluginler:\n"));
    list.forEach((plugin) => {
      console.log(chalk.green(`- ${plugin.name}`));
      console.log("  ", chalk.gray(plugin.description));
    });
  });

program.parse(process.argv);