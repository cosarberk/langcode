# langcode

**langcode** is a plugin-based LangChain SDK that allows developers to rapidly prototype and deploy AI-powered microservices using OpenAI, DALL·E, and more. It is designed to be modular, extensible, and beginner-friendly.

---

## 🚀 Features

- ⚡ Plugin-based architecture
- 🧱 Unified `langcode()` entry point with config list
- 🧠 Built-in support for OpenAI, DALL·E (image generation)
- ✅ Strong TypeScript typings with autocomplete
- 📦 CLI tool for instant usage (`npx langcode`)
- 🪵 Optional debug and logging support

---

## 📦 Installation

```bash
npm install langcode
```

or for CLI usage only:

```bash
npx langcode
```

---

## 📁 Project Structure (for contributors)

```
src/
├── core/              # langcode entry point and plugin runner
├── plugins/           # All plugin implementations
├── enums/             # Plugin enums
├── types/             # Type mapping for strong typings
└── bin/               # CLI entry
```

---

## 🔧 Usage Example (SDK)

```ts
import { langcode, plugins } from "langcode";

const manager = await langcode([
  {
    pluginName: plugins.openai,
    config: {
      apiKey: process.env.OPENAI_API_KEY!,
      modelName: "gpt-4o",
    },
  },
  {
    pluginName: plugins.dalle,
    config: {
      apiKey: process.env.OPENAI_API_KEY!,
      size: "1024x1024",
    },
  },
]);

const answer = await manager.run(plugins.openai, {
  prompt: "Can you generate an image?",
});

if (answer.toLowerCase().includes("yes")) {
  await manager.run(plugins.dalle, {
    prompt: "Futuristic cityscape with neon lights and flying cars",
    outputPath: "./output/image.png",
  });
}
```

---

## 🧑‍💻 Plugin Config Format

Each plugin config follows this format:

```ts
{
  pluginName: plugins.dalle,  // or plugins.openai
  config: { ... }             // plugin-specific options
}
```

---

## 🧠 CLI Usage

```bash
npx langcode chat       # Chat with OpenAI
npx langcode image      # Generate an image with DALL·E
npx langcode list       # Show available plugins
```

---

## 🛠️ Creating Your Own Plugin

Each plugin implements the `Plugin` interface:

```ts
interface Plugin<InitConfig, RunArgs, RunReturn> {
  name: string;
  description: string;
  init(config: InitConfig): Promise<void>;
  run(args: RunArgs): Promise<RunReturn>;
}
```

Create a file like `plugins/myplugin/MyPlugin.ts` and register it inside `PluginTypeMap`:

```ts
export type MyPluginRunArgs = { input: string };
export const MyPluginTypes = {
  runArgs: {} as MyPluginRunArgs,
  return: {} as string,
};
```

---

## ⚙️ Logging (Optional)

Enable console and file-based logging with:

```ts
await langcode(configList, {
  debug: true,
  logFile: "./debug/langcode.log",
});
```

---

## 🧩 Extending

- Add a new plugin under `src/plugins/`
- Export the class as `default`
- Add its types to `PluginTypeMap`
- Done!

---

## 📜 License

MIT License

Copyright (c) 2025 Relteco Teknoloji Sanayi ve Ticaret Ltd. Şti.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

