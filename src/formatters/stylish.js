import _ from 'lodash';

const indentSize = 4; // 4 пробела для базового отступа
const shiftSize = 2;  // Для `+` и `-` изменений

// Возвращает отступ с учетом глубины и возможного смещения
const getIndent = (depth, shift = 0) => ' '.repeat((depth - 1) * indentSize + shift);

// Возвращает отступ перед закрывающей скобкой
const getBracketIndent = (depth) => ' '.repeat((depth - 1) * indentSize);

// Форматирует значение (если объект — рекурсивно)
const formatValue = (value, depth) => {
  if (!_.isPlainObject(value)) return String(value);

  const indent = getIndent(depth + 1);
  const bracketIndent = getBracketIndent(depth + 1);

  const lines = Object.entries(value)
    .map(([key, val]) => `${indent}  ${key}: ${formatValue(val, depth + 1)}`);

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

// Главная функция
const formatStylish = (diff, depth = 1) => {
  const indent = getIndent(depth, shiftSize);
  const bracketIndent = getBracketIndent(depth);

  const formatters = {
    added: ({ key, value }) => `${indent}+ ${key}: ${formatValue(value, depth)}`,
    removed: ({ key, value }) => `${indent}- ${key}: ${formatValue(value, depth)}`,
    changed: ({ key, oldValue, newValue }) => [
      `${indent}- ${key}: ${formatValue(oldValue, depth)}`,
      `${indent}+ ${key}: ${formatValue(newValue, depth)}`,
    ].join('\n'),
    nested: ({ key, children }) => `${indent}  ${key}: ${formatStylish(children, depth + 1)}`,
    unchanged: ({ key, value }) => `${indent}  ${key}: ${formatValue(value, depth)}`,
  };

  const lines = diff.map((node) => formatters[node.type](node));

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

export default formatStylish;
