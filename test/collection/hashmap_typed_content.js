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


const hashmap = require('../../lib/collection/typed/hashmap');
const compare = require('../../lib/core/compare');
const hash = require('../../lib/core/hash');
const utility = require('../../lib/core/utility');


function ListItem(value) {
  this.value = value;
  
  const comparer = compare.number;

  this.hash = function() {
    return hash(this.value);
  };

  this.compare = function(other) {
    return comparer(this.value, other.value);
  };
}


module.exports = {
  name: "collection/hashmap-typed-content",

  $setup: function() {
    this.collection = new hashmap(197);

    this.values = utility.array.scatter(2000);
    for (const value of this.values) {
      this.collection.add(new ListItem(value));
    }
  },

  list_content_size: function() {
    this.assert(this.collection.size() === this.values.length, "hashmap size");
  },

  list_content_find_good: function() {
    this.assertDefined(this.collection.find(new ListItem(8)), "hashmap - content good");
    this.assertDefined(this.collection.find(new ListItem(21)), "hashmap - content good");
    this.assertDefined(this.collection.find(new ListItem(407)), "hashmap - content good");
    this.assertDefined(this.collection.find(new ListItem(923)), "hashmap - content good");
  },

  list_content_find_bad: function() {
    this.assertUndefined(this.collection.find(new ListItem(-31)), "hashmap - content bad");
    this.assertUndefined(this.collection.find(new ListItem(this.values.length + 2108)), "hashmap - content bad");
    this.assertUndefined(this.collection.find(new ListItem(this.values.length + 1001)), "hashmap - content bad");
  },

  list_content_add_duplicate_size: function() {
    this.collection.add(new ListItem(210));
    this.assert(this.collection.size() === this.values.length, "hashmap - content add duplicate size");
  },

  list_content_add_duplicate_find: function() {
    const value = this.values.length + 9999;
    this.collection.add(new ListItem(value));
    this.assertDefined(this.collection.find(new ListItem(value)), "hashmap - content add duplicate find");
  },

  list_content_add_duplicate_not_find: function() {
    const value = this.values.length + 9999;
    this.collection.add(new ListItem(value));
    this.assertUndefined(this.collection.find(new ListItem(this.values.length + 2108)), "hashmap - content add duplicate not find");
  },

  list_content_remove_size: function() {
    this.collection.remove(new ListItem(800));
    this.collection.remove(new ListItem(210));
    this.assert(this.collection.size() === this.values.length - 2, "hashmap - content remove size");
  },

  list_content_remove_find_other: function() {
    this.collection.remove(new ListItem(800));
    this.assertDefined(this.collection.find(new ListItem(210)), "hashmap - content remove find other");
  },

  list_content_remove_not_find: function() {
    this.collection.remove(new ListItem(800));
    this.assertUndefined(this.collection.find(new ListItem(800)), "hashmap - content remove not find");
  },

  list_content_iterate_count: function() {
    let count = 0;
    for (const value of this.collection.iterate()) {
      this.assertDefined(value, "hashmap - content iterate has value");
      ++count;
    }
    this.assert(count === this.values.length, "hashmap - content iterate count correct");
  },

  list_content_iterate_value_correct: function() {
    let found;
    for (const item of this.collection.iterate()) {
      if (item.value === 21) {
        found = true;
        break;
      }
    }
    this.assert(found, "hashmap - content iterate value correct");
  },

  list_content_iterate_value_incorrect: function() {
    let found;
    for (const item of this.collection.iterate()) {
      if (item.value === this.values + 2108) {
        found = true;
        break;
      }
    }
    this.assertUndefined(found, "hashmap - content iterate value incorrect");
  }
};