import yaml from "js-yaml";

export const parseYaml = (data) => {
  return yaml.safeLoad(data);
};
