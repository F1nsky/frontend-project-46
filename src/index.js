/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import fs from 'fs';
import path from 'path';

export default (path1, path2) => {
  const parsedFile1 = JSON.parse(fs.readFileSync(path.resolve(path1)));
  const parsedFile2 = JSON.parse(fs.readFileSync(path.resolve(path2)));
  const compareObjects = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const uniqKeys = _.union(keys1, keys2);
    const sortedKeys = _.sortBy(uniqKeys);
    const processedDiff = {};
    for (const key of sortedKeys) {
      if (key in obj1 && key in obj2) {
        if (obj1[key] === obj2[key]) {
          processedDiff[`  ${key}`] = obj1[key];
        } else {
          processedDiff[`- ${key}`] = obj1[key];
          processedDiff[`+ ${key}`] = obj2[key];
        }
      }

      if (key in obj1 === false && key in obj2) {
        processedDiff[`+ ${key}`] = obj2[key];
      }

      if (key in obj1 && key in obj2 === false) {
        processedDiff[`- ${key}`] = obj1[key];
      }
    }
    return processedDiff;
  };
  const stringify = (obj) => {
    const str = JSON.stringify(obj, null, ' ');
    console.log(str.replaceAll('"', ''));
  };
  const rnd = compareObjects(parsedFile1, parsedFile2);
  stringify(rnd);
};
