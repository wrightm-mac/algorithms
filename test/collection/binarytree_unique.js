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


const binarytree = require('../../lib/collection/binarytree');
const compare = require('../../lib/core/compare');
const utility = require('../../lib/core/utility');


module.exports = {
  name: "collection/binarytree-unique",

  $setup: function() {
    this.tree = new binarytree(compare.number, true);

    this.size = 2108;
    for (let count = 0; count < 3; ++count) {
      this.values = utility.array.scatter(this.size);
      for (const value of this.values) {
        this.tree.add(value);
      }
    }
  },

  tree_size: function() {
    this.assert(this.tree.size() === this.size, "tree - size");
  },

  tree_contains_good: function() {
    const value = utility.random(this.values);
    this.assertDefined(this.tree.find(value), "tree - contains good");
  },

  tree_contains_bad: function() {
    this.assertUndefined(this.tree.find(this.size + 999), "tree - contains bad");
  },

  tree_each_sequence: function() {
    let current = 0;
    this.tree.each(value => {
      this.assert(value === current++, "tree - each - good sequence");
    });
  },

  tree_each_all: function() {
    let count = 0;
    this.tree.each(value => ++count);
    this.assert(count === this.size, "tree - each - size");
  },

  tree_remove_good_size: function() {
    const value = utility.random(this.values);
    this.tree.remove(value);
    this.assert(this.tree.size() === this.size - 1, "tree - remove - size good");
  },

  tree_remove_bad_size: function() {
    const value = this.size + 999;
    this.tree.remove(value);
    this.assert(this.tree.size() === this.size, "tree - remove - size bad");
  },

  tree_remove_good: function() {
    const value = utility.random(this.values);
    this.tree.remove(value);
    this.assertUndefined(this.tree.find(value), "tree - remove - good");
  },

  tree_remove_bad: function() {
    const value = this.size + 999;
    this.tree.remove(value);
    this.assertUndefined(this.tree.find(value), "tree - remove - bad");
  },

  tree_remove_good_sequence: function() {
    const value = utility.random(this.values);
    this.tree.remove(value);
    let current = 0;
    this.tree.each(value => {
      this.assert(value >= current, "tree - remove - good sequence");
      current = value;
    });
  },

  tree_remove_good_sequence_size: function() {
    const value = utility.random(this.values);
    this.tree.remove(value);
    let count = 0;
    this.tree.each(value => ++count);
    this.assert(count === this.size - 1, "tree - remove - good sequence size");
  },

  tree_remove_bad_sequence: function() {
    const value = utility.random(this.values);
    this.tree.remove(value);
    let current = 0;
    this.tree.each(value => {
      this.assert(value >= current, "tree - each - good sequence");
      current = value;
    });
  },
};