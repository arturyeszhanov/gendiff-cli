import _ from 'lodash';

const getIndent = (depth, spaces = 4, shift = 2) => ' '.repeat(depth * spaces - shift);
const getBracketIndent = (depth, spaces = 4) => ' '.repeat((depth - 1) * spaces);

const formatValue = (value, depth) => {
    if (!_.isObject(value) || value === null) {
        return String(value);
    }

    const indent = getIndent(depth + 1);
    const bracketIndent = getBracketIndent(depth);
    
    const lines = Object.entries(value)
        .map(([key, val]) => `${indent}  ${key}: ${formatValue(val, depth + 1)}`);

    return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const formatStylish = (diff, depth = 1) => {
  const indent = getIndent(depth);
  const bracketIndent = getBracketIndent(depth);

  const lines = diff.map(({ key, type, value, oldValue, newValue, children }) => {
    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${formatValue(value, depth)}`;
      case 'removed':
        return `${indent}- ${key}: ${formatValue(value, depth)}`;
      case 'changed':
        return `${indent}- ${key}: ${formatValue(oldValue, depth)}\n${indent}+ ${key}: ${formatValue(newValue, depth)}`;
      case 'nested':
        return `${indent}  ${key}: ${formatStylish(children, depth + 1)}`;
      default:
        return `${indent}  ${key}: ${formatValue(value, depth)}`;
    }
  });

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

export default formatStylish;
