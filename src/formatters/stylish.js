const indentSize = 4;

const makeIndent = (depth, shift = 0) => ' '.repeat((depth - 1) * indentSize + shift);

const makeBracketIndent = (depth) => ' '.repeat((depth - 1) * indentSize);

const formatValue = (value, depth) => {
  if (value === null) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value !== 'object') return String(value);

  const isArray = Array.isArray(value);
  const bracketOpen = isArray ? '[' : '{';
  const bracketClose = isArray ? ']' : '}';
  const entries = isArray ? value : Object.entries(value);

  const lines = isArray
    ? entries.map((item) => `${makeIndent(depth + 1)}${formatValue(item, depth + 1)}`)
    : entries.map(
      ([key, val]) => `${makeIndent(depth + 1)}${key}: ${formatValue(val, depth + 1)}`,
    );

  return `${bracketOpen}\n${lines.join('\n')}\n${makeBracketIndent(depth)}${bracketClose}`;
};

const formatStylish = (diff, depth = 1) => {
  const indent = ' '.repeat((depth - 1) * 4);
  const bracketIndent = ' '.repeat((depth - 1) * 4);

  const lines = diff.map((node) => {
    const {
      type, key, value, oldValue, newValue, children,
    } = node;

    switch (type) {
      case 'added':
        return `${indent}  + ${key}: ${formatValue(value, depth + 1)}`;
      case 'removed':
        return `${indent}  - ${key}: ${formatValue(value, depth + 1)}`;
      case 'unchanged':
        return `${indent}    ${key}: ${formatValue(value, depth + 1)}`;
      case 'changed':
        return [
          `${indent}  - ${key}: ${formatValue(oldValue, depth + 1)}`,
          `${indent}  + ${key}: ${formatValue(newValue, depth + 1)}`,
        ].join('\n');
      case 'nested':
        return `${indent}    ${key}: ${formatStylish(children, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

export default formatStylish;
