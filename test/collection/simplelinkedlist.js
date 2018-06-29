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


const linkedlist = require('../../lib/collection/simplelinkedlist');


module.exports = {
  name: "collection/simplelinkedlist",

  $setup: function() {
    this.collection = new linkedlist();
  },

  list_add_single_added: function() {
    this.collection.add("hello");
    this.assertDefined(this.collection.first, "simple-linked-list - single added");
  },

  list_add_single_value: function() {
    this.collection.add("hello");
    this.assert(this.collection.first.value === "hello", "simple-linked-list - single value correct");
  },

  list_add_double_added: function() {
    this.collection.add("hello");
    this.collection.add("world");
    this.assertDefined(this.collection.first.next, "simple-linked-list - double added");
  },

  list_add_double_value: function() {
    this.collection.add("hello");
    this.collection.add("world");
    this.assert(this.collection.first.next.value === "hello", "simple-linked-list - double value correct");
  },

  list_find_single_value_exists: function() {
    this.collection.add("hello");
    this.assertDefined(this.collection.find(item => item === "hello"), "simple-linked-list - find single");
  },

  list_find_single_value_notexists: function() {
    this.collection.add("hello");
    this.collection.add("world");
    this.assertUndefined(this.collection.find(item => item === "yada"), "simple-linked-list - single value correct");
  },

  list_find_single_value_correct: function() {
    this.collection.add("hello");
    this.assert(this.collection.find(item => item === "hello") === "hello", "simple-linked-list - find single value-correct");
  },

  list_find_single_value_notexists: function() {
    this.collection.add("hello");
    this.assertUndefined(this.collection.find(item => item === "yada"), "simple-linked-list - find single not-exists");
  },

  list_find_double_firstvalue_exists: function() {
    this.collection.add("hello");
    this.collection.add("world");
    this.assertDefined(this.collection.find(item => item === "hello"), "simple-linked-list - find double first-exists");
  },

  list_find_double_firstvalue_correct: function() {
    this.collection.add("hello");
    this.collection.add("world");
    this.assert(this.collection.find(item => item === "hello") === "hello", "simple-linked-list - find double first-correct");
  },

  list_find_double_secondvalue_exists: function() {
    this.collection.add("hello");
    this.collection.add("world");
    this.assertDefined(this.collection.find(item => item === "world"), "simple-linked-list - find double second-exists");
  },

  list_find_double_secondvalue_correct: function() {
    this.collection.add("hello");
    this.collection.add("world");
    this.assert(this.collection.find(item => item === "world") === "world", "simple-linked-list - find double second-correct");
  },

  list_find_double_notexists: function() {
    this.collection.add("hello");
    this.collection.add("world");
    this.assertUndefined(this.collection.find(item => item === "yada"), "simple-linked-list - find double not-exists");
  },

  list_find_triple_lastvalue_correct: function() {
    this.collection.add("hello");
    this.collection.add("world");
    this.collection.add("yada");
    this.assert(this.collection.find(item => item === "yada") === "yada", "simple-linked-list - find trip third-correct");
  },

  list_find_triple_lastvalue_exists: function() {
    this.collection.add("hello");
    this.collection.add("world");
    this.collection.add("yada");
    this.assertDefined(this.collection.find(item => item === "yada"), "simple-linked-list - find triple third-exists");
  },

  list_find_triple_notexists: function() {
    this.collection.add("hello");
    this.collection.add("world");
    this.collection.add("yada");
    this.assertUndefined(this.collection.find(item => item === "blah"), "simple-linked-list - find triple not-exists");
  },

  list_delete_single: function() {
    this.collection.add("abc");
    this.collection.remove(item => item === "abc");
    this.assertUndefined(this.collection.find(item => item === "abc"), "simple-linked-list - delete single - gone");
  },

  list_delete_single_notexists: function() {
    this.collection.add("abc");
    this.collection.remove(item => item === "xyz");
    this.assertUndefined(this.collection.find(item => item === "xyz"), "simple-linked-list - delete single - not exists");
    this.assertDefined(this.collection.find(item => item === "abc"), "simple-linked-list - delete single");
  },

  list_delete_first: function() {
    this.collection.add("abc");
    this.collection.add("pqr");
    this.collection.add("xyz");
    this.collection.remove(item => item === "abc");
    this.assertUndefined(this.collection.find(item => item === "abc"), "simple-linked-list - delete first - first gone");
    this.assertDefined(this.collection.find(item => item === "pqr"), "simple-linked-list - delete first - second remains");
    this.assertDefined(this.collection.find(item => item === "xyz"), "simple-linked-list - delete first - third remains");
  },

  list_delete_middle: function() {
    this.collection.add("abc");
    this.collection.add("pqr");
    this.collection.add("xyz");
    this.collection.remove(item => item === "pqr");
    this.assertDefined(this.collection.find(item => item === "abc"), "simple-linked-list - delete middle - first remains");
    this.assertUndefined(this.collection.find(item => item === "pqr"), "simple-linked-list - delete middle - second gone");
    this.assertDefined(this.collection.find(item => item === "xyz"), "simple-linked-list - delete middle - third remains");
  },

  list_delete_last: function() {
    this.collection.add("abc");
    this.collection.add("pqr");
    this.collection.add("xyz");
    this.collection.remove(item => item === "xyz");
    this.assertDefined(this.collection.find(item => item === "abc"), "simple-linked-list - delete last - first remains");
    this.assertDefined(this.collection.find(item => item === "pqr"), "simple-linked-list - delete last - second remains");
    this.assertUndefined(this.collection.find(item => item === "xyz"), "simple-linked-list - delete last - deleted gone");
  },

  list_size_empty: function() {
    this.assert(this.collection.size() === 0, "simple-linked-list - size - single");
  },

  list_size_single: function() {
    this.collection.add("abc");
    this.assert(this.collection.size() === 1, "simple-linked-list - size - single");
  },

  list_size_double: function() {
    this.collection.add("abc");
    this.collection.add("pqr");
    this.assert(this.collection.size() === 2, "simple-linked-list - size - double");
  },

  list_size_triple: function() {
    this.collection.add("abc");
    this.collection.add("pqr");
    this.collection.add("xyz");
    this.assert(this.collection.size() === 3, "simple-linked-list - size - triple");
  },

  list_size_single_delete: function() {
    this.collection.add("abc");
    this.collection.remove(item => item === "abc");
    this.assert(this.collection.size() === 0, "simple-linked-list - size - delete single");
  },

  list_size_delete_double_first: function() {
    this.collection.add("abc");
    this.collection.add("pqr");
    this.collection.remove(item => item === "abc");
    this.assert(this.collection.size() === 1, "simple-linked-list - size - delete double first");
  },

  list_size_delete_double_last: function() {
    this.collection.add("abc");
    this.collection.add("pqr");
    this.collection.remove(item => item === "pqr");
    this.assert(this.collection.size() === 1, "simple-linked-list - size - delete double last");
  },

  list_size_delete_triple_middle: function() {
    this.collection.add("abc");
    this.collection.add("pqr");
    this.collection.add("xyz");
    this.collection.remove(item => item === "pqr");
    this.assert(this.collection.size() === 2, "simple-linked-list - size - delete triple middle");
  },

  list_update_add: function() {
    this.collection.update("abc", item => item === "abc");
    this.assert(this.collection.size() === 1, "simple-linked-list - update - add");
  },

  list_update_add_another: function() {
    this.collection.update("abc", item => item === "abc");
    this.collection.update("def", item => item === "def");
    this.assert(this.collection.size() === 2, "simple-linked-list - update - add");
  },

  list_update_add_another_exists_first: function() {
    this.collection.update("abc", item => item === "abc");
    this.collection.update("def", item => item === "def");
    this.assertDefined(this.collection.find(item => item === "abc"), "simple-linked-list - update - exists");
  },

  list_update_add_another_exists_second: function() {
    this.collection.update("abc", item => item === "abc");
    this.collection.update("def", item => item === "def");
    this.assertDefined(this.collection.find(item => item === "def"), "simple-linked-list - update - exists");
  },

  list_update_add_same_single: function() {
    this.collection.update("abc", item => item === "abc");
    this.collection.update("abc", item => item === "abc");
    this.assert(this.collection.size() === 1, "simple-linked-list - update - same");
  },

  list_update_add_same_double_first: function() {
    this.collection.update("abc"), item => item === "abc";
    this.collection.update("def", item => item === "def");
    this.collection.update("abc", item => item === "abc");
    this.assert(this.collection.size() === 2, "simple-linked-list - update - same multiple first");
  },

  list_update_add_same_double_second: function() {
    this.collection.update("abc", item => item === "abc");
    this.collection.update("def", item => item === "def");
    this.collection.update("def", item => item === "def");
    this.assert(this.collection.size() === 2, "simple-linked-list - update - same multiple second");
  },

  list_iterate_values: function() {
    this.collection.add("hello");
    this.collection.add("world");
    this.collection.add("yada");
    this.assertDefined(this.collection.iterate() === "hello", "simple-linked-list - iterate first value");
    this.assertDefined(this.collection.iterate() === "world", "simple-linked-list - iterate second value");
    this.assertDefined(this.collection.iterate() === "yada", "simple-linked-list - iterate third value");
  },

  list_iterate_count: function() {
    this.collection.add("hello");
    this.collection.add("world");
    this.collection.add("yada");

    let count = 0;
    for (const value of this.collection.iterate()) {
      this.assertDefined(value, "simple-linked-list - iterate count has value");
      ++count;
    }
    this.assert(count === 3, "simple-linked-list - iterate count correct");
  }
};