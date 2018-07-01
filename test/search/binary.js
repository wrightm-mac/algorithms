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


const search = require('../../lib/search/binary');

const sort = require('../../lib/sort/quick');
const compare = require('../../lib/core/compare');
const utility = require('../../lib/core/utility');


module.exports = {
  name: "search/binary",

  $init: function() {
    this.collection = sort(utility.array.scatter(1000000), compare.number);
  },

  search_find_empty: function() {
    this.assert(! search([], 2108, compare.number), "search binary - find empty");
  },

  search_find_small: function() {
    this.assert(search([10, 20, 30], 20, compare.number), "search binary - find small range");
  },

  search_find_small_fail: function() {
    this.assert(! search([10, 20, 30], 19, compare.number), "search binary - fail small range");
  },

  search_find_first_defined: function() {
    const value = this.collection[0];
    this.assertDefined(search(this.collection, value, compare.number), "search binary - find first defined");
  },

  search_find_first_index: function() {
    const value = this.collection[0];
    this.assert(search(this.collection, value, compare.number) === 0, "search binary - find first index");
  },

  search_find_median_defined: function() {
    const index = Math.floor(this.collection.length / 2);
    const value = this.collection[index];
    this.assertDefined(search(this.collection, value, compare.number), "search binary - find median defined");
  },

  search_find_median_index: function() {
    const index = Math.floor(this.collection.length / 2);
    const value = this.collection[index];
    this.assert(search(this.collection, value, compare.number) === index, "search binary - find median index");
  },

  search_find_last_defined: function() {
    const index = this.collection.length - 1;
    const value = this.collection[index];
    this.assertDefined(search(this.collection, value, compare.number), "search binary - find last defined");
  },

  search_find_last_index: function() {
    const index = this.collection.length - 1;
    const value = this.collection[index];
    this.assert(search(this.collection, value, compare.number) === index, "search binary - find last index");
  },

  search_fail: function() {
    const value = this.collection.length + 2108;
    this.assertUndefined(search(this.collection, value, compare.number), "search binary - not found");
  }
};