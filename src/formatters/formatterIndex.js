import plain from './plain.js';
import treeFormatter from './treeFormatter.js';

export default (tree, format) => {
  switch (format) {
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      return treeFormatter(tree);
  }
};
