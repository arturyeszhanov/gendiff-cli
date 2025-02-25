import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff JSON files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const expected = readFile('expected_result.txt');

    const result = genDiff(file1, file2);
    expect(result).toEqual(expected.trim());
});


test('gendiff YAML files', () => {
    const file1 = getFixturePath('file1.yaml');
    const file2 = getFixturePath('file2.yaml');
    const expected = readFile('expected_result.txt');

    const result = genDiff(file1, file2);
    expect(result).toEqual(expected.trim());
});
