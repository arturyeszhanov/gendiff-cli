import path from 'path';
import { readFileSync } from 'fs';
import parseFile from './parsers.js';
import buildDiff from './buildDiff.js';
import formatters from './formatters/index.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => {
  const fullPath = getFullPath(filepath);
  const data = readFileSync(fullPath, 'utf-8');
  const format = path.extname(filepath).slice(1); // 'json', 'yaml', etc.
  return parseFile(data, format);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const diff = buildDiff(data1, data2);

  return formatters(diff, formatName);
};

export default genDiff;
