import _ from 'lodash';
import fs from 'fs';
import path from 'path';

export default (path1, path2) => {
    const parsedFile1 = JSON.parse(fs.readFileSync(path.resolve(path1)));
    const parsedFile2 = JSON.parse(fs.readFileSync(path.resolve(path2)));
    const compareObjects = (parsedFile1, parsedFile2) => {
        const keys1 = Object.keys(parsedFile1);
        const keys2 = Object.keys(parsedFile2);
        const uniqKeys = _.union(keys1, keys2);
        const sortedKeys = _.sortBy(uniqKeys);
        const processedDiff = {};
        for (const key of sortedKeys) {
            if (key in parsedFile1 && key in parsedFile2) {
                if (parsedFile1[key] === parsedFile2[key]) {
                    processedDiff[`  ${key}`] = parsedFile1[key];
                } else {
                    processedDiff[`- ${key}`] = parsedFile1[key];
                    processedDiff[`+ ${key}`] = parsedFile2[key];
                }
            }

            if (key in parsedFile1 === false && key in parsedFile2) {
                processedDiff[`+ ${key}`] = parsedFile2[key];
            }
            
            if (key in parsedFile1 && key in parsedFile2 === false) {
                processedDiff[`- ${key}`] = parsedFile1[key];
            }
        }
        return processedDiff;
    };
    const stringify = (obj) => {
        const str = JSON.stringify(obj, null, ' ');
        console.log(str.replaceAll('"', ''));
    }
    const rnd = compareObjects(parsedFile1, parsedFile2);
    stringify(rnd);
};
