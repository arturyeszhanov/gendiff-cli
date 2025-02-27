import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parseFile = (filepath) => {
  if (typeof filepath !== 'string') {
    throw new Error(`Invalid filepath: expected a string, got ${typeof filepath}`);
  }

  const absolutePath = path.resolve(__dirname, '../__fixtures__', filepath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }

  const fileContent = fs.readFileSync(absolutePath, 'utf-8');

  if (filepath.endsWith('.json')) {
    return JSON.parse(fileContent);
  }
  if (filepath.endsWith('.yaml') || filepath.endsWith('.yml')) {
    return yaml.load(fileContent);
  }

  throw new Error(`Unsupported file format: ${filepath}`);
};

export default parseFile;
