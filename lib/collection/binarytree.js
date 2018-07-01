/* ----------------------------------------------------------------------------

                            BSD 3-Clause License

                        Copyright (c) 2018, wrightm-mac
                            All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.

  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

  * Neither the name of the copyright holder nor the names of its
    contributors may be used to endorse or promote products derived from
    this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
  FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
  DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
  CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
  OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

----------------------------------------------------------------------------- */


const standard = require('../core/standard');


module.exports = function BinaryTree(comparer, unique) {

  let root;
  let size = 0;

  function Node(value) {
    this.value = value;
    this.height = 0;

    this.add = function(newvalue) {
      const comparison = comparer(newvalue, this.value);
      if (unique && (comparison === 0)) {
        this.value = newvalue;
        return this;
      }
      else {
        let newroot = this;

        if (comparison < 0) {
          this.left = addToSubtree(this.left, newvalue);
          if (this.heightDifference() === 2) {
            if (comparer(newvalue, this.left.value) <= 0) {
              newroot = rotateRight();
            }
            else {
              newroot = rotateLeftRight();
            }
          }
        }
        else {
          this.right = addToSubtree(this.right, newvalue);
          if (this.heightDifference() === -2) {
            if (comparer(newvalue, this.right.value) > 0) {
              newroot = rotateLeft();
            }
            else {
              newroot = rotateRightLeft();
            }
          }
        }

        newroot.computeHeight();
        return newroot;
      }
    }

    this.computeHeight = function() {
      this.height = -1;

      if (this.left) {
        this.height = standard.max(this.height, this.left.height);
      }
      if (this.right) {
        this.height = standard.max(this.height, this.right.height);
      }

      this.height++;
    }

    this.heightDifference = function() {
      let leftTarget = 0;
      let rightTarget = 0;

      if (this.left) {
        leftTarget = 1 + this.left.height;
      }
      if (this.right) {
        rightTarget = 1 + this.right.height;
      }

      return leftTarget - rightTarget;
    }

    function rotateRight() {
      const newroot = this.left;
      const grandson = newroot.right;
      this.left = grandson;
      newroot.right = this;

      computeHeight();
      return newroot;
    }

    function rotateRightLeft() {
      const child = this.right;
      const newroot = child.left;
      const grand1 = newroot.left;
      const grand2 = newroot.right;
      child.left = grand2;
      this.right = grand1;

      newroot.left = this;
      newroot.right = child;

      child.computeHeight();
      this.computeHeight();

      return newroot;
    }

    function rotateLeft() {
      const newroot = this.right;
      const grandson = newroot.left;
      this.right = grandson;
      newroot.left = this;

      this.computeHeight();
      return newroot;
    }

    function rotateLeftRight() {
      const child = this.left;
      const newroot = child.right;
      const grand1 = newroot.left;
      const grand2 = newroot.right;
      child.right = grand1;
      this.left = grand2;

      newroot.left = child;
      newroot.right = this;

      child.computeHeight();
      this.computeHeight();

      return newroot;
    }

    this.remove = function(value, deleted) {
      let newroot = this;

      const comparison = comparer(value, this.value);
      if (comparison === 0) {
        if (! deleted) {
          --size;

          // Use the 'deleted' flag to ensure that the size is only decremented
          // by 1 when the tree is reshaped after a removal...
          deleted = true;
        }

        if (! this.left) {
          return this.right;
        }

        let child = this.left;
        while (child.right) {
          child = child.right;
        }

        let childkey = child.value;
        this.left = removeFromParent(this.left, childkey, deleted);
        this.value = childkey;

        if (this.heightDifference() === -2) {
          if (this.right.heightDifference() <= 0) {
            newroot = rotateLeft();
          }
          else {
            newroot = rotateRightLeft();
          }
        }
      }
      else if (comparison < 0) {
        this.left = removeFromParent(this.left, value, deleted);
        if (this.heightDifference() === -2) {
          if (this.right.heightDifference() <= 0) {
            newroot = rotateLeft();
          }
          else {
            newroot = rotateRightLeft();
          }
        }
      }
      else {
        this.right = removeFromParent(this.right, value, deleted);
        if (this.heightDifference() === 2) {
          if (this.left.heightDifference() >= 0) {
            newroot = rotateRight();
          }
          else {
            newroot = rotateLeftRight();
          }
        }
      }

      newroot.computeHeight();
      return newroot;
    }

    function removeFromParent(parent, value, deleted) {
      if (parent) {
        return parent.remove(value, deleted);
      }
    }
}

  function addToSubtree(parent, newvalue) {
    if (! parent) {
      ++size;
      return new Node(newvalue);
    }

    parent = parent.add(newvalue);
    return parent;
  }

  this.add = function(item) {
    root = addToSubtree(root, item);

    return item;
  }

  this.remove = function(item) {
    if (root) {
      root = root.remove(item);
    }
  }

  this.find = function(item) {
    let node = root;

    while (node) {
      const comparison = comparer(item, node.value);
      if (comparison < 0) {
        node = node.left;
      }
      else if (comparison > 0) {
        node = node.right;
      }
      else {
        return node.value;
      }
    }
  }

  this.each = function(func) {
    function recurse(node) {
      if (node) {
        recurse(node.left);
        func(node.value);
        recurse(node.right);
      }
    }

    recurse(root);
  }

  this.size = function() {
    return size;
  }

  this.debug = function() {
    const values = [];
    this.each(value => values.push(value));
    console.log("binarytree.debug(%o)", values);
  }
};