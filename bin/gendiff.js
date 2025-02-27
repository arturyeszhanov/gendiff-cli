#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2, options) => {
    const fullPath1 = path.resolve(__dirname, '../__fixtures__', file1);
    const fullPath2 = path.resolve(__dirname, '../__fixtures__', file2);
    console.log(genDiff(fullPath1, fullPath2, options.format));
  });

program.parse();
