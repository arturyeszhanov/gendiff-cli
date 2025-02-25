#!/usr/bin/env node

import { Command } from 'commander';
import parseFile from './parsers.js';
import formatStylish from './formatters/stylish.js';
import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, type: 'nested', children: buildDiff(data1[key], data2[key]) };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return { key, type: 'changed', oldValue: data1[key], newValue: data2[key] };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });
};

const formatters = {
  stylish: formatStylish,
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildDiff(data1, data2);

  return formatters[format](diff);
};

export default genDiff;

const program = new Command();
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  });

if (import.meta.url === `file://${process.argv[1]}`) {
  program.parse();
}
