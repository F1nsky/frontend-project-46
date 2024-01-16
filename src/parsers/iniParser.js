import ini from "ini";

const normalizeConfig = (config) => {
  const configKeys = Object.keys(config);
  return configKeys.reduce((acc, key) => {
    const value = config[key];
    if (typeof value === "object" && value !== null) {
      return { ...acc, [key]: normalizeConfig(value) };
    }
    if (typeof value === "boolean" || Number.isNaN(Number(value))) {
      return { ...acc, [key]: value };
    }
    return { ...acc, [key]: Number(value) };
  }, {});
};

export const parseIni = (data) => {
  const parseFile = ini.parse(data);
  return normalizeConfig(parseFile);
};
