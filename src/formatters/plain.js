import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const formatPlain = (diff, path = '') => {
  const lines = diff
    .flatMap(({
      key, type, value, oldValue, newValue, children,
    }) => {
      const property = path ? `${path}.${key}` : key;

      switch (type) {
        case 'added':
          return `Property '${property}' was added with value: ${formatValue(value)}`;
        case 'removed':
          return `Property '${property}' was removed`;
        case 'changed':
          return `Property '${property}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
        case 'nested':
          return formatPlain(children, property);
        default:
          return [];
      }
    });

  return lines.join('\n');
};

export default formatPlain;
