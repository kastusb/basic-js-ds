const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootTree = null;
  }

  root() {
    return this.rootTree;
  }

  add(data) {
    const addWithin = (node, data) => {
      if (!node) return new Node(data);
      if (node.data === data) return node;
      if (data < node.data) node.left = addWithin(node.left, data);
      if (data > node.data) node.right = addWithin(node.right, data);
      return node;
    }
    this.rootTree = addWithin(this.rootTree, data);
  }

  has(data) {
    const searchWithin = (node, data) => {
      if (!node) return false;
      if (node.data === data) return true;
      if (data < node.data) return searchWithin(node.left, data);
      if (data > node.data) return searchWithin(node.right, data);
    }
    return searchWithin(this.rootTree, data);
  }

  find(data) {
    const findWithin = (node, data) => {
      if (!node) return null;
      if (node.data === data) return node;
      if (data < node.data) return findWithin(node.left, data);
      if (data > node.data) return findWithin(node.right, data);
    }
    return findWithin(this.rootTree, data);
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (!node) return null;
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) return node = node.right;
        if (!node.right) return node = node.left;
        let minFromRight = node.right;
        while (minFromRight.left) minFromRight = minFromRight.left;
        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);
        return node;
      }
    }
    this.rootTree = removeNode(this.rootTree, data);
  }

  min() {
    if (!this.rootTree) return;
    let node = this.rootTree;
    while (node.left) node = node.left;
    return node.data;
  }

  max() {
    if (!this.rootTree) return;
    let node = this.rootTree;
    while (node.right) node = node.right;
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};
