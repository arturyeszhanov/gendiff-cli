import _ from 'lodash';

const indentSize = 4; // 4 пробела на уровень
const shiftSize = 2;  // Смещение влево для спецсимволов

const getIndent = (depth, shift = 0) => ' '.repeat((depth - 1) * indentSize + shift);

const getBracketIndent = (depth) => ' '.repeat((depth - 1) * indentSize);

const formatValue = (value, depth) => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const indent = ' '.repeat(depth * 4); // Отступ для вложенных объектов
      const bracketIndent = ' '.repeat((depth - 1) * 4); // Отступ для скобок
  
      const lines = Object.entries(value)
        .map(([key, val]) => `${indent}    ${key}: ${formatValue(val, depth + 1)}`);
  
      return `{\n${lines.join('\n')}\n${bracketIndent}}`;
    }
  
    if (Array.isArray(value)) {
      const indent = ' '.repeat(depth * 4);
      const bracketIndent = ' '.repeat((depth - 1) * 4);
  
      const lines = value
        .map((item) => `${indent}${formatValue(item, depth + 1)}`);
  
      return `[\n${lines.join('\n')}\n${bracketIndent}]`;
    }
  
    if (value === null) {
      return 'null';
    }
  
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }
  
    return String(value); // Все остальные примитивы
  };

const formatStylish = (diff, depth = 1) => {
  const indent = getIndent(depth, shiftSize); // Отступ для спецсимволов
  const bracketIndent = getBracketIndent(depth); // Отступ для скобок

  const formatters = {
    added: ({ key, value }) => `${indent}+ ${key}: ${formatValue(value, depth + 1)}`,
    removed: ({ key, value }) => `${indent}- ${key}: ${formatValue(value, depth)}`,
    changed: ({ key, oldValue, newValue }) => [
      `${indent}- ${key}: ${formatValue(oldValue, depth)}`,
      `${indent}+ ${key}: ${formatValue(newValue, depth)}`,
    ].join('\n'),
    nested: ({ key, children }) => `${indent}   ${key}: ${formatStylish(children, depth)}`,
    unchanged: ({ key, value }) => `${indent}  ${key}: ${formatValue(value, depth)}`,
  };

  const lines = diff.map((node) => formatters[node.type](node));

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

export default formatStylish;
