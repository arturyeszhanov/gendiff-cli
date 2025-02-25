import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parseFile = (filepath) => {
  if (typeof filepath !== 'string') {
    throw new Error(`Invalid filepath: expected a string, got ${typeof filepath}`);
  }

  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');

  if (filepath.endsWith('.json')) {
    return JSON.parse(fileContent);
  }
  if (filepath.endsWith('.yaml') || filepath.endsWith('.yml')) {
    return yaml.load(fileContent);
  }

  throw new Error('Unsupported file format');
};

export default parseFile;
