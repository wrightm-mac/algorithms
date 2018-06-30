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



module.exports = function HashMap(comparer, unique) {

  let root;
  let size = 0;

  function Node(value) {
    this.value = value;

    this.add = function(newvalue) {
      if (unique && (comparer(newvalue, this.value) === 0)) {
        this.value = newvalue;
      }
      else {
        if (comparer(newvalue, this.value) < 0) {
          if (this.left) {
            this.left.add(newvalue);
          }
          else {
            this.left = new Node(newvalue);
          }
        }
        else {
          if (this.right) {
            this.right.add(newvalue);
          }
          else {
            this.right = new Node(newvalue);
          }
        }
      }
    }

    ++size;
  }

  this.add = function(item) {
    if (root) {
      root.add(item);
    }
    else {
      root = new Node(item);
    }

    return item;
  }

  this.remove = function(item) {
  }

  this.find = function(item) {
    let node = root;

    while (node) {
      if (comparer(item, node.value) < 0) {
        node = node.left;
      }
      else if (comparer(item, node.value) > 0) {
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
  }
};