import { Command } from 'commander';
import genDiff from '../src/gendiff.js';
import parseFile from '../src/parsers.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const data1 = parseFile(filepath1);
    const data2 = parseFile(filepath2);
    console.log(genDiff(data1, data2));
  });

if (process.argv[1].endsWith('gendiff.js')) {
  program.parse();
}
