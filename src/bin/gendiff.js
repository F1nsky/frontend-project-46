#!/usr/bin/env node
import program from "commander";
import genDiff from "../index.js";

program
  .version("1.1.0")
  .description("Compares two configuration files and shows a difference")
  .arguments("<firstConfig> <secondConfig>")
  .option("-f, --format [type]", "output format: json, plain, tree", "tree")
  .action((firstConfig, secondConfig) =>
    console.log(genDiff(firstConfig, secondConfig, program.format))
  )
  .parse(process.argv);
