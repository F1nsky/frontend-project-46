# Difference finder

[![Actions Status](https://github.com/F1nsky/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/F1nsky/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/727434c725ea78375da8/maintainability)](https://codeclimate.com/github/F1nsky/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/727434c725ea78375da8/test_coverage)](https://codeclimate.com/github/F1nsky/frontend-project-46/test_coverage)

### Description

This is a program that determines the difference between two data structures. This is a popular task for which there are many online services, such as https://jsondiff.com/. A similar mechanism is used when outputting tests or automatically tracking changes in configuration files.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/F1nsky/frontend-project-46.git
   ```
2. Navigate to the project directory:
   ```
   cd frontend-project-46
   ```
3. Install dependencies:
   ```
   make install
   ```

## Usage

To use the difference finder, follow these steps:

1. Run the program with two file paths:
   ```
   gendiff path/to/file1.json path/to/file2.json
   ```
   Replace path/to/file1.json and path/to/file2.json with the actual paths of the files you want to compare.
   
   The program will output the differences between the two files.
   
2. Additional options:
   
   To get a plain output, add the --format plain flag:
   ```
   gendiff path/to/file1.json path/to/file2.json --format plain
   ```
   To get JSON output, add the --format json flag:
   ```
   gendiff path/to/file1.json path/to/file2.json --format json
   ```
   ### Hexlet tasks screencasts

   Task 4 asciinema: https://asciinema.org/a/JchjuoutF7HcX9POojX6f2YGD

   Task 6 asciinema: https://asciinema.org/a/cLgFsT9PHUG7MIvTTAIjfb2Vh

   Task 7 asciinema: https://asciinema.org/a/6m3j2uLS8csm0JDXeC2r6KdRo

   Task 8 asciinema: https://asciinema.org/a/AiqcatebaQEncYBvmKbLTYMYl

   Task 9 asciinema: https://asciinema.org/a/Ej9LVsdDRNRZ1N2rfohusZoEm
