import path from 'path';
import fs from 'fs';
import genDiff from '../../src/index.js';

const extensions = ['json', 'yml', 'ini'];

describe('genDiff', () => {
  const recursiveResult = fs.readFileSync(
    path.resolve(__dirname, '../__fixtures__/result.diff'),
    'utf8',
  );

  extensions.forEach((ext) => {
    const before = path.resolve(__dirname, `../__fixtures__/before.${ext}`);
    const after = path.resolve(__dirname, `../__fixtures__/after.${ext}`);
    const expected = genDiff(before, after);

    test(`compare two ${ext} files`, () => {
      expect(expected).toEqual(recursiveResult);
    });
  });
});
