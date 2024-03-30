const checkValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (Number.isNaN(Number(value))) {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree) => {
  const iter = (node, path) => node
    .filter((childNode) => childNode.status !== 'unmodified')
    .map((n) => {
      const newProperty = `${path}.${n.key}`.replace(/^\./, '');
      switch (n.status) {
        case 'modified':
          return `Property '${newProperty}' was changed from ${checkValue(
            n.oldValue,
          )} to ${checkValue(n.newValue)}`;
        case 'added':
          return `Property '${newProperty}' was added with value: ${checkValue(
            n.value,
          )}`;
        case 'deleted':
          return `Property '${newProperty}' was deleted`;
        case 'merged':
          return iter(n.children, newProperty);
        default:
          throw new Error(`Unknown node status! ${n.status} is wrong!`);
      }
    })
    .join('\n');
  return iter(tree, '');
};

export default plain;
