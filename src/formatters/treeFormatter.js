const buildTreeFormat = (tree, initialLevel = 0) => {
  const tab = (lvl) => '    '.repeat(lvl);

  const stringify = (value, lvl) => {
    if (typeof value !== 'object') {
      return value;
    }

    const keys = Object.keys(value);
    const result = keys.map(
      (key) => `{\n${tab(lvl + 2)}${key}: ${stringify(value[key], lvl + 2)}\n${tab(lvl + 1)}}`,
    );

    return result.join(',\n');
  };

  const formatNode = (node, lvl) => {
    switch (node.status) {
      case 'unmodified':
        return `    ${tab(lvl)}${node.key}: ${stringify(node.value, lvl)}`;
      case 'modified':
        return [
          `  ${tab(lvl)}- ${node.key}: ${stringify(node.oldValue, lvl)}`,
          `  ${tab(lvl)}+ ${node.key}: ${stringify(node.newValue, lvl)}`,
        ].join('\n');
      case 'added':
        return `  ${tab(lvl)}+ ${node.key}: ${stringify(node.value, lvl)}`;
      case 'deleted':
        return `  ${tab(lvl)}- ${node.key}: ${stringify(node.value, lvl)}`;
      case 'merged':
        return `${tab(lvl + 1)}${node.key}: {\n${buildTreeFormat(node.children, lvl + 1)}\n${tab(lvl + 1)}}`;
      default:
        throw new Error(`Node status ${node.status} is unknown!`);
    }
  };

  const formattedNodes = tree.map((node) => formatNode(node, initialLevel));
  return formattedNodes.join('\n');
};

const treeFormatter = (tree) => `{\n${buildTreeFormat(tree)}\n}`;

export default treeFormatter;
