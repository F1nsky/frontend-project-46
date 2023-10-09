import yaml from 'js-yaml';
import ini from 'ini';
import { isObject, isBoolean, keys } from 'lodash';

const normalizeConfig = (config) => {
  const configKeys = keys(config);
  return configKeys.reduce((acc, key) => {
    if (isObject(config[key])) {
      return { ...acc, [key]: normalizeConfig(config[key]) };
    }
    if (isBoolean(config[key])) {
      return { ...acc, [key]: config[key] };
    }
    if (Number.isNaN(Number(config[key]))) {
      return { ...acc, [key]: config[key] };
    }
    return { ...acc, [key]: Number(config[key]) };
  }, {});
};

const myIniParse = (data) => {
  const parseFile = ini.parse(data);
  return normalizeConfig(parseFile);
};

export const parse = (type, data) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      return myIniParse(data);
    default:
      throw new Error(`Unknown data type! ${type} is not supported!`);
  }
};

export default parse;
