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

  list_add_single_double: function() {
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
  }
};