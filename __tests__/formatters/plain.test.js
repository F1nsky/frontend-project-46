import path from 'path';
import fs from 'fs';
import genDiff from '../../src/index.js';

const extensions = ['json', 'yml', 'ini'];

describe('genDiff - Plain Output', () => {
  const plainResult = fs.readFileSync(
    path.resolve(__dirname, '../__fixtures__/plain.diff'),
    'utf8',
  );

  extensions.forEach((ext) => {
    const before = path.resolve(__dirname, `../__fixtures__/before.${ext}`);
    const after = path.resolve(__dirname, `../__fixtures__/after.${ext}`);
    const expected = genDiff(before, after, 'plain');

    test(`plain output for ${ext} files`, () => {
      expect(expected).toEqual(plainResult);
    });
  });

  test('handles numeric strings and null values', () => {
    const before = path.resolve(
      __dirname,
      '../__fixtures__/plain-numeric-before.json',
    );
    const after = path.resolve(
      __dirname,
      '../__fixtures__/plain-numeric-after.json',
    );
    const expected = "Property 'numString' was changed from '1' to 1\n"
      + "Property 'addedNull' was added with value: null";
    expect(genDiff(before, after, 'plain')).toEqual(expected);
  });
});
