import fs from 'fs';
import path from 'path';
import render from './formatters/formatterIndex.js';
import parse from './parsers/parserIndex.js';

const buildDiffTree = (beforeConfig, afterConfig) => {
  const buildNode = (key, innerBeforeConfig, innerAfterConfig) => {
    let modifiedNode;
    if (!(key in innerAfterConfig)) {
      modifiedNode = { key, status: 'deleted', value: innerBeforeConfig[key] };
    } else if (!(key in innerBeforeConfig)) {
      modifiedNode = { key, status: 'added', value: innerAfterConfig[key] };
    } else {
      const oldValue = innerBeforeConfig[key];
      const newValue = innerAfterConfig[key];
      if (oldValue === newValue) {
        modifiedNode = { key, status: 'unmodified', value: oldValue };
      } else if (typeof oldValue === 'object' && typeof newValue === 'object') {
        modifiedNode = {
          key,
          status: 'merged',
          children: buildDiffTree(oldValue, newValue),
        };
      } else {
        modifiedNode = {
          key,
          status: 'modified',
          oldValue,
          newValue,
        };
      }
    }
    return modifiedNode;
  };

  const fileKeys = [
    ...new Set([...Object.keys(beforeConfig), ...Object.keys(afterConfig)]),
  ];
  const result = fileKeys.map((key) => buildNode(key, beforeConfig, afterConfig));
  return result;
};

const makeFileData = (pathToFile) => {
  const data = fs.readFileSync(path.resolve(pathToFile), 'utf-8');
  const type = path.extname(pathToFile).slice(1);
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
