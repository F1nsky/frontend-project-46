import { parseJson } from "./jsonParser.js";
import { parseYaml } from "./yamlParser.js";
import { parseIni } from "./iniParser.js";

export const parse = (type, data) => {
  switch (type) {
    case "json":
      return parseJson(data);
    case "yaml":
    case "yml":
      return parseYaml(data);
    case "ini":
      return parseIni(data);
    default:
      throw new Error(`Data type ${type} is not supported!`);
  }
};
