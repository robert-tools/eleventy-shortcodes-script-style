/**
 * 🧪 testing module
 * @version 1.0.0
 * @date 2026-09-10
 * @license MIT
 * @author Robert Willemelis <github.com/robert-willi84>
 */
import { sample } from './index';

describe('@robert.tools/eleventy-shortcodes-script-style', () => {
    it('should return a eleventy-shortcodes-script-style string', () => {
        expect(sample('hello')).toBe('sample: hello');
    });

    it('should return a eleventy-shortcodes-script-style string with empty input', () => {
        expect(sample('')).toBe('sample: ');
    });
});
