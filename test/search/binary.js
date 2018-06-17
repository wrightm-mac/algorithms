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
    this.collection = sort(utility.array.random(1000000, 1, 10000), compare.number);
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

  search_find_median: function() {
    const value = this.collection[Math.floor(this.collection.length / 2)];
    this.assert(search(this.collection, value, compare.number), "search binary - find median");
  },

  search_find_first: function() {
    const value = this.collection[0];
    this.assert(search(this.collection, value, compare.number), "search binary - find first");
  },

  search_find_last: function() {
    const value = this.collection[this.collection.length - 1];
    this.assert(search(this.collection, value, compare.number), "search binary - find last");
  },

  search_fail: function() {
    const value = 99000;
    this.assert(! search(this.collection, value, compare.number), "search binary - not found");
  }
};