const path = require('path');
import { FS } from '@robert.tools/fs';
import { LOG } from '@robert.tools/log';

/**
 * 🎯 Retrieves chunk information for a given entry file.
 * @param {string} entryFile ➡️ The entry file for which to retrieve chunk information.
 * @returns {object} 📤 The chunk information for the specified entry file.
 */
export const getChunkInformationFor = (entryFile: string | undefined) => {
    // We want an entryFilename, because in practice you might have multiple entrypoints
    // This is similar to how you specify an entry in development more
    if (!entryFile) {
        throw new Error(
            'You must specify an entryFilename, so that vite-script can find the correct file.'
        );
    }
    const manifestPath = path.resolve(process.cwd(), '_site', 'manifest.json');
    const manifest: string = FS.readFile(manifestPath) as string;

    const parsed = manifest ? JSON.parse(manifest) : {};

    let entryChunk = parsed[entryFile];
    if (!entryChunk) {
        const possibleEntries = Object.values(parsed)
            .filter((chunk: any) => chunk.isEntry === true)
            .map((chunk: any) => (chunk.src ? `"${chunk.src}"` : ''))
            .join(`, `);
        throw new Error(
            `No entry for ${entryFile} found in _site/manifest.json. Valid entries in manifest: ${possibleEntries}`
        );
    }

    return entryChunk;
};

/**
 * 🎯 Generates a script tag for a given entry file.
 * @param {string} entryFile ➡️ The entry file for which to generate the script tag.
 * @param {string} prefix ➡️ The path prefix to prepend to the script's src attribute.
 * @param {boolean} [module=true] ➡️ Whether to generate a module script tag or a nomodule script tag.
 * @returns {string} 📤 The generated script tag as a string.
 */
export const getScript = (entryFile: string, prefix: string, module = true) => {
    const attr = module ? `type="module"` : `nomodule`;
    const entryChunk = getChunkInformationFor(entryFile);
    return `<script ${attr} src="${prefix}${entryChunk.file}"></script>`;
};

/**
 * 🎯 Generates a modern module script tag for a given entry file.
 * @param {string} entryFile ➡️ The entry file for which to generate the script tag.
 * @param {string} prefix ➡️ The path prefix to prepend to the script's src attribute.
 * @returns {string} 📤 The generated script tag as a string.
 */
export const viteScriptTag = (entryFile: string, prefix: string) => {
    return getScript(entryFile, prefix, true);
};

/**
 * 🎯 Generates a legacy nomodule script tag for a given entry file.
 * @param {string} entryFile ➡️ The entry file for which to generate the script tag.
 * @param {string} prefix ➡️ The path prefix to prepend to the script's src attribute.
 * @returns {string} 📤 The generated script tag as a string.
 */
export const viteLegacyScriptTag = (entryFile: string, prefix: string) => {
    return getScript(entryFile, prefix, false);
};

/**
 * 🎯 Generates link tags for the CSS files associated with a given entry file.
 * @param {string} entryFile ➡️ The entry file for which to generate the link tags.
 * @param {string} prefix ➡️ The path prefix to prepend to the link tags' href attributes.
 * @returns {string} 📤 The generated link tags as a string.
 */
export const viteLinkStylesheetTags = (entryFile: string, prefix: string) => {
    const entryChunk = getChunkInformationFor(entryFile);
    if (!entryChunk.css || entryChunk.css.length === 0) {
        LOG.WARN(`No css found for ${entryFile} entry. Is that correct?`);
        return '';
    }
    /* There can be multiple CSS files per entry, so assume many by default */
    return entryChunk.css
        .map(
            (cssFile: string) =>
                `<link rel="stylesheet" href="${prefix}${cssFile}"></link>`
        )
        .join('\n');
};
