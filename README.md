# 🗂️ @robert.tools/eleventy-shortcodes-script-style

A collections of shortcodes to include a script and style tag.

## 📜 Usage

### 🟢 Installation

```bash
npm install @robert.tools/eleventy-shortcodes-script-style
```

### 📝 Sample usage

```typescript
import { viteScriptTag } from '@robert.tools/eleventy-shortcodes-script-style';
```
## 📜 Usage

```typescript
    eleventyConfig.addNunjucksShortcode('scriptTag', viteScriptTag);
```
You can use the following functions:

* `viteScriptTag(entryFile, pathPrefix)` - Generates a script tag for the given entry file and path prefix.
* `viteLegacyScriptTag(entryFile, pathPrefix)` - Generates a legacy script tag for the given entry file and path prefix.
* `viteLinkStylesheetTags(entryFile, pathPrefix)` - Generates link tags for the CSS files associated with the given entry file and path prefix.

```nunjucks
    {% scriptTag entryFile, pathPrefix %}
```
* `entryFile` - The entry file for the script tag.
* `pathPrefix` - The path prefix to prepend to the script file.

## 🗃️ commands
After an npm install with `npm i` the following commands are available:
* initialize placeholders: `npm run init <semantic>`
* release a new version: `npm run release <semantic>`


## ⚖️ Notes
This software is hand-crafted, test-driven and assisted by AI tools. I know each line of my code. ✌️


| Tool  | Comment |
 | ------------- | ------------- |
| <img src="https://img.shields.io/badge/Jest-TDD-008800?logo=jest" alt="assisted by Jest" />  | Test-driven development with Jest |
| <img src="https://img.shields.io/badge/robert.tools-ecosystem-008800" alt="assisted by robert.tools" />  | Part of the robert.tools ecosystem |
| <img src="https://img.shields.io/badge/GitHub_Copilot-assisted-8A2BE2?logo=githubcopilot" alt="assisted by GitHub Copilot" />   | Code completion |
| <img src="https://img.shields.io/badge/OpenAI-assisted-8A2BE2?logo=openaigym" alt="assisted by OpenAI" />  | chatGPT research |