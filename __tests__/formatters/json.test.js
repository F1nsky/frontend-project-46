import path from 'path';
import fs from 'fs';
import genDiff from '../../src/index.js';

const extensions = ['json', 'yml', 'ini'];

describe('genDiff - JSON Output', () => {
  const jsonResult = fs.readFileSync(
    path.resolve(__dirname, '../__fixtures__/json.diff'),
    'utf8',
  );

  extensions.forEach((ext) => {
    const before = path.resolve(__dirname, `../__fixtures__/before.${ext}`);
    const after = path.resolve(__dirname, `../__fixtures__/after.${ext}`);
    const expected = genDiff(before, after, 'json');

    test(`json output for ${ext} files`, () => {
      expect(expected).toEqual(jsonResult);
    });
  });
});
