import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff JSON files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const expected = readFileSync(getFixturePath('expected_result_plain.txt'), 'utf-8');
    const result = genDiff(file1, file2, 'plain');
    expect(result).toEqual(expected.trim());
});

test('gendiff cli yml', () => {
    const file1 = getFixturePath('file1.yaml');
    const file2 = getFixturePath('file2.yaml');
    const expected = readFileSync(getFixturePath('expected_result_plain.txt'), 'utf-8');
    const result = genDiff(file1, file2, 'plain');
    expect(result).toEqual(expected.trim());
});

test('gendiff JSON output format', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const expected = readFileSync(getFixturePath('expected_result_json.txt'), 'utf-8');
    const result = genDiff(file1, file2, 'json');
    expect(result).toEqual(expected.trim());
});