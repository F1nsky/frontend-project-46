import {
  has,
  isObject,
  union,
  keys,
  trim,
} from 'lodash';
import fs from 'fs';
import path from 'path';
import render from './formatters/index.js';
import { parse } from './parsers.js';

// diffTree
export const buildDiffTree = (beforeConfig, afterConfig) => {
  const fileKeys = union(keys(beforeConfig), keys(afterConfig));
  const result = fileKeys.map((key) => buildNode(key, beforeConfig, afterConfig));
  return result;
};

const buildNode = (key, beforeConfig, afterConfig) => {
  let modifiedNode;
  if (!has(afterConfig, key)) {
    modifiedNode = { key, status: 'deleted', value: beforeConfig[key] };
  } else if (!has(beforeConfig, key)) {
    modifiedNode = { key, status: 'added', value: afterConfig[key] };
  } else {
    const oldValue = beforeConfig[key];
    const newValue = afterConfig[key];
    if (oldValue === newValue) {
      modifiedNode = { key, status: 'unmodified', value: oldValue };
    } else if (isObject(oldValue) && isObject(newValue)) {
      modifiedNode = { key, status: 'merged', children: buildDiffTree(oldValue, newValue) };
    } else {
      modifiedNode = { key, status: 'modified', oldValue, newValue };
    }
  }
  return modifiedNode;
};

const makeFileData = (pathToFile) => {
  const data = fs.readFileSync(path.resolve(pathToFile), 'utf-8');
  const type = trim(path.extname(pathToFile), '.');

  return { data, type };
};

const genDiff = (pathToFile1, pathToFile2, format) => {
  const beforeConfig = makeFileData(pathToFile1);
  const afterConfig = makeFileData(pathToFile2);

  const parseBefore = parse(beforeConfig.type, beforeConfig.data);
  const parseAfter = parse(afterConfig.type, afterConfig.data);

  const diffTree = buildDiffTree(parseBefore, parseAfter);
  const result = render(diffTree, format);

  return result;
};

export default genDiff;
