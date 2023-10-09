import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

readFile('expected_file.txt');

const expected = getFixturePath('expected_file.txt');
const path1 = getFixturePath('file1.json');
const path2 = getFixturePath('file2.json');

test('plain diff test', () => {
  expect(genDiff(path1, path2)).toEqual(expected);
});
