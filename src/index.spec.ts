import mock from 'mock-fs';
import {
    getChunkInformationFor,
    getScript,
    viteScriptTag,
    viteLegacyScriptTag,
    viteLinkStylesheetTags,
} from './index';

const prefix = '/prefix/';
const entry = 'main.ts';
const file = 'hello.js';
const MANIFEST_JSON = {
    [entry]: {
        file,
        isEntry: true,
        css: [],
    },
};
const MANIFEST_WITH_CSS = {
    [entry]: {
        file,
        isEntry: true,
        css: ['style.css'],
    },
};
const PATH_MANIFEST = '_site/manifest.json';
describe('getChunkInformationFor()', () => {
    const FN = getChunkInformationFor;
    afterEach(() => {
        mock.restore();
    });
    it('should return chunk information for a given entry', () => {
        mock({ [PATH_MANIFEST]: JSON.stringify(MANIFEST_JSON) });
        const result = FN(entry);
        const EXPECTED = {
            file,
            isEntry: true,
            css: [],
        };
        expect(result).toEqual(EXPECTED);
    });
    it('should throw an error with empty manifest', () => {
        mock({});
        const EXPECTED_ERROR = `No entry for ${entry} found in ${PATH_MANIFEST}. Valid entries in manifest:`;
        expect(() => FN(entry)).toThrow(EXPECTED_ERROR);
    });
    it('should throw an error with invalid entry file', () => {
        const entry = 'no.ts';
        mock({ [PATH_MANIFEST]: JSON.stringify(MANIFEST_JSON) });
        const EXPECTED_ERROR = `No entry for ${entry} found in ${PATH_MANIFEST}. Valid entries in manifest:`;
        expect(() => FN(entry)).toThrow(EXPECTED_ERROR);
    });
    it('should throw an error if no entry file is given', () => {
        mock({ [PATH_MANIFEST]: JSON.stringify(MANIFEST_JSON) });
        const EXPECTED_ERROR = `You must specify an entryFilename, so that vite-script can find the correct file.`;
        expect(() => FN(undefined)).toThrow(EXPECTED_ERROR);
    });
    it('should list possible entries', () => {
        mock({
            [PATH_MANIFEST]: JSON.stringify({
                'foo.ts': {
                    isEntry: true,
                    src: 'foo.ts',
                },
                'bar.ts': {
                    isEntry: true,
                },
            }),
        });

        expect(() => FN(entry)).toThrow(
            `No entry for ${entry} found in ${PATH_MANIFEST}. Valid entries in manifest: "foo.ts", `
        );
    });
});
describe('✅ getScript()', () => {
    const FN = getScript;
    afterEach(() => {
        mock.restore();
    });
    it('should return a eleventy-shortcodes-script-style string', () => {
        mock({ [PATH_MANIFEST]: JSON.stringify(MANIFEST_JSON) });
        const result = FN(entry, prefix);
        const EXPECTED = `type="module" src="${prefix}${file}"`;
        expect(result).toBe(`<script ${EXPECTED}></script>`);
    });
    it('should return a eleventy-shortcodes-script-style string', () => {
        mock({ [PATH_MANIFEST]: JSON.stringify(MANIFEST_JSON) });
        const result = FN(entry, prefix, false);
        const EXPECTED = `nomodule src="${prefix}${file}"`;
        expect(result).toBe(`<script ${EXPECTED}></script>`);
    });

    it('should return a eleventy-shortcodes-script-style string with empty input', () => {
        mock({});
        const EXPECTED_ERROR = `No entry for ${entry} found in ${PATH_MANIFEST}. Valid entries in manifest:`;
        expect(() => FN(entry, '/prefix/')).toThrow(EXPECTED_ERROR);
    });
});
describe('✅ viteScriptTag()', () => {
    const FN = viteScriptTag;
    afterEach(() => {
        mock.restore();
    });
    it('should return a eleventy-shortcodes-script-style string', () => {
        mock({ [PATH_MANIFEST]: JSON.stringify(MANIFEST_JSON) });
        const result = FN(entry, prefix);
        const EXPECTED = `type="module" src="${prefix}${file}"`;
        expect(result).toBe(`<script ${EXPECTED}></script>`);
    });
    it('should throw an error with empty input', () => {
        mock({});
        const EXPECTED_ERROR = `No entry for ${entry} found in ${PATH_MANIFEST}. Valid entries in manifest:`;
        expect(() => FN(entry, prefix)).toThrow(EXPECTED_ERROR);
    });
});
describe('✅ viteLegacyScriptTag()', () => {
    const FN = viteLegacyScriptTag;
    afterEach(() => {
        mock.restore();
    });
    it('should return a eleventy-shortcodes-script-style string', () => {
        mock({ [PATH_MANIFEST]: JSON.stringify(MANIFEST_JSON) });
        const result = FN(entry, prefix);
        const EXPECTED = `nomodule src="${prefix}${file}"`;
        expect(result).toBe(`<script ${EXPECTED}></script>`);
    });
    it('should throw an error with empty input', () => {
        mock({});
        const EXPECTED_ERROR = `No entry for ${entry} found in ${PATH_MANIFEST}. Valid entries in manifest:`;
        expect(() => FN(entry, prefix)).toThrow(EXPECTED_ERROR);
    });
});

describe('✅ viteLinkStylesheetTags()', () => {
    const FN = viteLinkStylesheetTags;
    afterEach(() => {
        mock.restore();
    });
    it('should return an empty string if no CSS is found', () => {
        mock({ [PATH_MANIFEST]: JSON.stringify(MANIFEST_JSON) });
        const result = FN(entry, prefix);
        expect(result).toBe('');
    });
    it('should return link tags for CSS files if CSS is found', () => {
        mock({ [PATH_MANIFEST]: JSON.stringify(MANIFEST_WITH_CSS) });
        const result = FN(entry, prefix);
        const EXPECTED = `<link rel="stylesheet" href="${prefix}style.css"></link>`;
        expect(result).toBe(EXPECTED);
    });
    it('should throw an error with empty input', () => {
        mock({});
        const EXPECTED_ERROR = `No entry for ${entry} found in ${PATH_MANIFEST}. Valid entries in manifest:`;
        expect(() => FN(entry, prefix)).toThrow(EXPECTED_ERROR);
    });
});
