const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

/*
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rootEl = null;
  }

  root() {
    return this.rootEl;
  }

  add(data) {
    function addElement(element, data) {
      if (!element) return new Node(data);
      if (element.data === data) return element;
      if (data < element.data) {
        element.left = addElement(element.left, data);
      } else {
        element.right = addElement(element.right, data);
      };
      return element;
    };

    this.rootEl = addElement(this.rootEl, data);
  };

  has(data) {
    function isHas(element, data) {
      if (!element) return false;
      if (element.data === data) return true;
      return element.data < data ? isHas(element.right, data) : isHas(element.left, data);
    };
    return isHas(this.rootEl, data);
  };

  find(data) {
    function findEl(element, data) {
      if (!element) return null;
      if (element.data === data) return element;
      return element.data < data ? findEl(element.right, data) : findEl(element.left, data);
    };
    return findEl(this.rootEl, data);
  };

  remove(data) {
    function removeEl(element, data) {
      if (!element) return null;
      if (data > element.data) {
        element.right = removeEl(element.right, data);
        return element;
      } else if (data < element.data) {
        element.left = removeEl(element.left, data);
        return element;
      } else {
        if (!element.left && !element.right) {
          return null;
        };
        if (!element.left) {
          element = element.right;
          return element;
        };
        if (!element.right) {
          element = element.left;
          return element;
        };
        let minRight = element.right;
        while (minRight.left) {
          minRight = minRight.left;
        };
        element.data = minRight.data;
        element.right = removeEl(element.right, minRight.data);
        return element;
      };
    };

    this.rootEl = removeEl(this.rootEl, data);
  }

  min() {
    if (!this.rootEl) return;

    let min = this.rootEl;
    while(min.left) {
      min = min.left;
    }

    return min.data;
  };

  max() {
    if (!this.rootEl) return;

    let max = this.rootEl;
    while (max.right) {
      max = max.right;
    }

    return max.data;
  };
};

module.exports = {
  BinarySearchTree
};