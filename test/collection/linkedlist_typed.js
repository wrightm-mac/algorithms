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


const linkedlist = require('../../lib/collection/typed/linkedlist');
const compare = require('../../lib/core/compare');


function ListItem(value) {
  this.value = value;
  this.comparer = compare.string;

  this.compare = function(other) {
    return this.comparer(this.value, other.value);
  };
}

module.exports = {
  name: "collection/linkedlist-typed",

  $setup: function() {
    this.collection = new linkedlist();
  },

  list_add_single_added: function() {
    this.collection.add(new ListItem("hello"));
    this.assertDefined(this.collection.first, "linked-list - single added");
  },

  list_add_single_value: function() {
    this.collection.add(new ListItem("hello"));
    this.assert(this.collection.first.value.value === "hello", "linked-list - single value correct");
  },

  list_add_double_added: function() {
    this.collection.add(new ListItem("hello"));
    this.collection.add(new ListItem("world"));
    this.assertDefined(this.collection.first.next, "linked-list - double added");
  },

  list_add_double_value: function() {
    this.collection.add(new ListItem("hello"));
    this.collection.add(new ListItem("world"));
    this.assert(this.collection.first.next.value.value === "hello", "linked-list - double value correct");
  },

  list_find_single_value_exists: function() {
    this.collection.add(new ListItem("hello"));
    this.assertDefined(this.collection.find(new ListItem("hello")), "linked-list - find single");
  },

  list_find_single_value_notexists: function() {
    this.collection.add(new ListItem("hello"));
    this.collection.add(new ListItem("world"));
    this.assertUndefined(this.collection.find(new ListItem("yada")), "linked-list - single value correct");
  },

  list_find_single_value_correct: function() {
    this.collection.add(new ListItem("hello"));
    this.assert(this.collection.find(new ListItem("hello")).value === "hello", "linked-list - find single value-correct");
  },

  list_find_double_first_value_exists: function() {
    this.collection.add(new ListItem("hello"));
    this.collection.add(new ListItem("world"));
    this.assertDefined(this.collection.find(new ListItem("hello")), "linked-list - find double first-exists");
  },

  list_find_double_second_value_exists: function() {
    this.collection.add(new ListItem("hello"));
    this.collection.add(new ListItem("world"));
    this.assertDefined(this.collection.find(new ListItem("world")), "linked-list - find double second-exists");
  },

  list_find_double_second_value_correct: function() {
    this.collection.add(new ListItem("hello"));
    this.collection.add(new ListItem("world"));
    this.assert(this.collection.find(new ListItem("world")).value === "world", "linked-list - find double second-correct");
  },

  list_find_double_notexists: function() {
    this.collection.add(new ListItem("hello"));
    this.collection.add(new ListItem("world"));
    this.assertUndefined(this.collection.find(new ListItem("yada")), "linked-list - find double not-exists");
  },

  list_find_triple_lastvalue_correct: function() {
    this.collection.add(new ListItem("hello"));
    this.collection.add(new ListItem("world"));
    this.collection.add(new ListItem("yada"));
    this.assert(this.collection.find(new ListItem("yada")).value === "yada", "linked-list - find trip third-correct");
  },

  list_find_triple_lastvalue_exists: function() {
    this.collection.add(new ListItem("hello"));
    this.collection.add(new ListItem("world"));
    this.collection.add(new ListItem("yada"));
    this.assertDefined(this.collection.find(new ListItem("yada")), "linked-list - find triple third-exists");
  },

  list_find_triple_notexists: function() {
    this.collection.add(new ListItem("hello"));
    this.collection.add(new ListItem("world"));
    this.collection.add(new ListItem("yada"));
    this.assertUndefined(this.collection.find(new ListItem("blah")), "linked-list - find triple not-exists");
  },

  list_delete_single: function() {
    this.collection.add(new ListItem("abc"));
    this.collection.remove(new ListItem("abc"));
    this.assertUndefined(this.collection.find(new ListItem("abc")), "linked-list - delete single - gone");
  },

  list_delete_single_notexists: function() {
    this.collection.add(new ListItem("xyz"));
    this.collection.remove(new ListItem("xyz"));
    this.assertUndefined(this.collection.find(new ListItem("xyz")), "linked-list - delete single - not exists");
  },

  list_delete_first: function() {
    this.collection.add(new ListItem("abc"));
    this.collection.add(new ListItem("pqr"));
    this.collection.add(new ListItem("xyz"));
    this.collection.remove(new ListItem("abc"));
    this.assertUndefined(this.collection.find(new ListItem("abc")), "linked-list - delete first - first gone");
    this.assertDefined(this.collection.find(new ListItem("pqr")), "linked-list - delete first - second remains");
    this.assertDefined(this.collection.find(new ListItem("xyz")), "linked-list - delete first - third remains");
  },

  list_delete_middle: function() {
    this.collection.add(new ListItem("abc"));
    this.collection.add(new ListItem("pqr"));
    this.collection.add(new ListItem("xyz"));
    this.collection.remove(new ListItem("pqr"));
    this.assertDefined(this.collection.find(new ListItem("abc")), "linked-list - delete middle - first remains");
    this.assertUndefined(this.collection.find(new ListItem("pqr")), "linked-list - delete middle - second gone");
    this.assertDefined(this.collection.find(new ListItem("xyz")), "linked-list - delete middle - third remains");
  },

  list_delete_last: function() {
    this.collection.add(new ListItem("abc"));
    this.collection.add(new ListItem("pqr"));
    this.collection.add(new ListItem("xyz"));
    this.collection.remove(new ListItem("xyz"));
    this.assertDefined(this.collection.find(new ListItem("abc")), "linked-list - delete last - first remains");
    this.assertDefined(this.collection.find(new ListItem("pqr")), "linked-list - delete last - second remains");
    this.assertUndefined(this.collection.find(new ListItem("xyz")), "linked-list - delete last - deleted gone");
  },

  list_size_empty: function() {
    this.assert(this.collection.size() === 0, "linked-list - size - single");
  },

  list_size_single: function() {
    this.collection.add(new ListItem("abc"));
    this.assert(this.collection.size() === 1, "linked-list - size - single");
  },

  list_size_double: function() {
    this.collection.add(new ListItem("abc"));
    this.collection.add(new ListItem("pqr"));
    this.assert(this.collection.size() === 2, "linked-list - size - double");
  },

  list_size_triple: function() {
    this.collection.add(new ListItem("abc"));
    this.collection.add(new ListItem("pqr"));
    this.collection.add(new ListItem("xyz"));
    this.assert(this.collection.size() === 3, "linked-list - size - triple");
  },

  list_size_single_delete: function() {
    this.collection.add(new ListItem("abc"));
    this.collection.remove(new ListItem("abc"));
    this.assert(this.collection.size() === 0, "linked-list - size - delete single");
  },

  list_size_delete_double_first: function() {
    this.collection.add(new ListItem("abc"));
    this.collection.add(new ListItem("pqr"));
    this.collection.remove(new ListItem("abc"));
    this.assert(this.collection.size() === 1, "linked-list - size - delete double first");
  },

  list_size_delete_double_last: function() {
    this.collection.add(new ListItem("abc"));
    this.collection.add(new ListItem("pqr"));
    this.collection.remove(new ListItem("pqr"));
    this.assert(this.collection.size() === 1, "linked-list - size - delete double last");
  },

  list_size_delete_triple_middle: function() {
    this.collection.add(new ListItem("abc"));
    this.collection.add(new ListItem("pqr"));
    this.collection.add(new ListItem("xyz"));
    this.collection.remove(new ListItem("pqr"));
    this.assert(this.collection.size() === 2, "linked-list - size - delete triple middle");
  },

  list_update_add: function() {
    this.collection.update(new ListItem("abc"));
    this.assert(this.collection.size() === 1, "linked-list - update - add");
  },

  list_update_add_another: function() {
    this.collection.update(new ListItem("abc"));
    this.collection.update(new ListItem("pqr"));
    this.assert(this.collection.size() === 2, "linked-list - update - add");
  },

  list_update_add_another_exists_first_size: function() {
    this.collection.update(new ListItem("abc"));
    this.collection.update(new ListItem("def"));
    this.collection.update(new ListItem("abc"));
    this.assert(this.collection.size() === 2, "linked-list - update - exists first size");
  },

  list_update_add_another_exists_first: function() {
    this.collection.update(new ListItem("abc"));
    this.collection.update(new ListItem("def"));
    this.collection.update(new ListItem("abc"));
    this.assertDefined(this.collection.find(new ListItem("abc")), "linked-list - update - exists first");
  },

  list_update_add_another_exists_second_size: function() {
    this.collection.update(new ListItem("abc"));
    this.collection.update(new ListItem("def"));
    this.collection.update(new ListItem("def"));
    this.assertDefined(this.collection.size() === 2, "linked-list - update - exists second size");
  },

  list_update_add_another_exists_second: function() {
    this.collection.update(new ListItem("abc"));
    this.collection.update(new ListItem("def"));
    this.collection.update(new ListItem("def"));
    this.assertDefined(this.collection.find(new ListItem("abc")), "linked-list - update - exists second");
  },

  list_update_add_same_single: function() {
    this.collection.update(new ListItem("abc"));
    this.collection.update(new ListItem("abc"));
    this.assert(this.collection.size() === 1, "linked-list - update - same");
  },

  list_iterate_values: function() {
    this.collection.add(new ListItem("hello"));
    this.collection.add(new ListItem("world"));
    this.collection.add(new ListItem("yada"));
    this.assertDefined(this.collection.iterate().value === "hello", "linked-list - iterate first value");
    this.assertDefined(this.collection.iterate().value === "world", "linked-list - iterate second value");
    this.assertDefined(this.collection.iterate().value === "yada", "linked-list - iterate third value");
  },

  list_iterate_count: function() {
    this.collection.add(new ListItem("hello"));
    this.collection.add(new ListItem("world"));
    this.collection.add(new ListItem("yada"));

    let count = 0;
    for (const value of this.collection.iterate()) {
      this.assertDefined(value, "linked-list - iterate count has value");
      ++count;
    }
    this.assert(count === 3, "linked-list - iterate count correct");
  }
};