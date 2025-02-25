import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import yaml from 'js-yaml';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff JSON files', () => {
    const file1 = JSON.parse(readFile('file1.json'));
    const file2 = JSON.parse(readFile('file2.json'));
    const expected = readFile('expected_result.txt');
    console.log('GEN DIFF OUTPUT:', genDiff(file1, file2));
    expect(genDiff(file1, file2)).toEqual(expected.trim());
});

test('gendiff YAML files', () => {
    const file1 = yaml.load(readFile('file1.yaml'));
    const file2 = yaml.load(readFile('file2.yaml'));
    const expected = readFile('expected_result.txt');
    console.log('GEN DIFF OUTPUT:', genDiff(file1, file2));
    expect(genDiff(file1, file2)).toEqual(expected.trim());
});
