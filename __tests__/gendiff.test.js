import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';

import { beforeEach, test, expect, describe } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let expectedPlain;
let expectedJson;
let expectedStylish;

beforeEach(() => {
  expectedPlain = readFileSync(getFixturePath('expected_result_plain.txt'), 'utf-8').trim();
  expectedJson = readFileSync(getFixturePath('expected_result_json.txt'), 'utf-8').trim();
  expectedStylish = readFileSync(getFixturePath('expected_result_stylish.txt'), 'utf-8').trim();
});

describe('gendiff', () => {
  describe('json files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    test('json format', () => {
      expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedJson);
    });

    test('plain format', () => {
      expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
    });

    test('stylish format', () => {
      expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
    });

    test('default format', () => {
      expect(genDiff(filepath1, filepath2)).toEqual(expectedStylish);
    });
  });

  describe('yaml files', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('file2.yaml');

    test('json format', () => {
      expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedJson);
    });

    test('plain format', () => {
      expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
    });

    test('stylish format', () => {
      expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
    });

    test('default format', () => {
      expect(genDiff(filepath1, filepath2)).toEqual(expectedStylish);
    });
  });
});
