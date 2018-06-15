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


const selection = require('../../lib/sort/selection');

const compare = require('../../lib/core/compare');
const utility = require('../../lib/core/utility');


module.exports = {
  name: "sort/selection",

  $setup: function() {
    this.array = utility.array.random(1000);
  },

  sort_empty: function() {
    const sorted = selection.sort([], compare.number);
    this.assert(sorted.length === 0, "selection-sort empty");
  },

  sort_single: function() {
    const sorted = selection.sort([99], compare.number);
    this.assert(sorted.length === 1, "selection-sort single");
  },

  sort_valid_ascending: function() {
    const sorted = selection.sort(this.array, compare.number);
    this.assert(utility.ascending(sorted, compare.number), "selection-sort valid ascending");
  },

  sort_valid_descending_1: function() {
    const sorted = selection.sort(this.array, compare.number, true);
    this.assert(utility.descending(sorted, compare.number), "selection-sort valid descending 1");
  },

  sort_valid_descending_2: function() {
    const sorted = selection.sort(this.array, compare.reverse(compare.number));
    this.assert(utility.descending(sorted, compare.number), "selection-sort valid descending 2");
  }
};