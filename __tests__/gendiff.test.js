import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import { beforeAll, test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let expectedPlain;
let expectedJson;
let expectedStylish;

beforeAll(() => {
  expectedPlain = readFileSync(getFixturePath('expected_result_plain.txt'), 'utf-8').trim();
  expectedJson = readFileSync(getFixturePath('expected_result_json.txt'), 'utf-8').trim();
  expectedStylish = readFileSync(getFixturePath('expected_result_stylish.txt'), 'utf-8').trim();
});

test('json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedJson);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(filepath1, filepath2)).toEqual(expectedStylish); // default формат
});

test('yaml', () => {
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yaml');

  expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedJson);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(filepath1, filepath2)).toEqual(expectedStylish); // default формат
});
