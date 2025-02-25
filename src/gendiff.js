#!/usr/bin/env node

import { Command } from 'commander';
import parseFile from './parsers.js';
import _ from 'lodash';

const program = new Command();

const genDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const result = keys.map((key) => {
    if (!Object.hasOwn(data2, key)) return `  - ${key}: ${data1[key]}`;
    if (!Object.hasOwn(data1, key)) return `  + ${key}: ${data2[key]}`;
    if (data1[key] !== data2[key]) return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    return `    ${key}: ${data1[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const data1 = parseFile(filepath1);
    const data2 = parseFile(filepath2);

    const diff = genDiff(data1, data2);
    console.log(diff);
  });



