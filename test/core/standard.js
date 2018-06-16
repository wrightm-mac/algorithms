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


const standard = require('../../lib/core/standard');
const compare = require('../../lib/core/compare');


module.exports = {
  name: "core/standard",

  swap_same: function() {
    const values = [10, 20, 30, 40, 50];
    standard.swap(values, 2, 2);
    this.assert(values[2] === 30, "swap same index");
  },

  swap_different_valuesok: function() {
    const values = [10, 20, 30, 40, 50];
    standard.swap(values, 1, 3);
    this.assert(values[1] === 40, "swap different index - value 1");
    this.assert(values[3] === 20, "swap different index - value 2");
  },

  swap_changed: function() {
    const values = [10, 20, 30, 40, 50];
    standard.swap(values, 1, 3);
    this.assert(compare.array(values, [10, 20, 30, 40, 50], compare.number) !== 0, "swap changed");
  },

  swap_expected: function() {
    const values = [10, 20, 30, 40, 50];
    standard.swap(values, 1, 3);
    this.assert(compare.array(values, [10, 40, 30, 20, 50], compare.number) === 0, "swap expected");
  },

  copy_empty: function() {
    const copied = standard.copy([]);
    this.assert(copied.length === 0, "copy empty");
  },

  copy_different: function() {
    const values = [10, 20, 30, 40, 50];
    const copied = standard.copy(values);
    this.assert(copied !== values, "copy different");
  },

  copy_same_values: function() {
    const values = [10, 20, 30, 40, 50];
    const copied = standard.copy(values);
    this.assert(compare.array(values, copied, compare.number) === 0, "copy same values");
  },

  append_simple: function() {
    const first = [9, 8, 7, 6];
    const second = [4, 3, 2, 1];
    const appended = standard.append(first, second);
    this.assert(compare.array(appended, [9, 8, 7, 6, 4, 3, 2, 1], compare.number) === 0, "append simple");
  },

  append_first_empty: function() {
    const first = [];
    const second = [4, 3, 2, 1];
    const appended = standard.append(first, second);
    this.assert(compare.array(appended, [4, 3, 2, 1], compare.number) === 0, "append first empty");
  },

  append_second_empty: function() {
    const first = [9, 8, 7, 6];
    const second = [];
    const appended = standard.append(first, second);
    this.assert(compare.array(appended, [9, 8, 7, 6], compare.number) === 0, "append second empty");
  },

  merge_empty: function() {
    const merged = standard.merge([]);
    this.assert(merged, "merge empty - defined");
    this.assert(merged.length === 0, "merge empty - empty");
  },

  merge_single: function() {
    const merged = standard.merge([10, 20, 30]);
    this.assert(merged.length === 3, "merge single - length");
    this.assert(compare.array(merged, [10, 20, 30], compare.number) === 0, "merge single - values");
  },

  merge_double: function() {
    const merged = standard.merge([10, 20, 30], [40, 50, 60]);
    this.assert(merged.length === 6, "merge double - length");
    this.assert(compare.array(merged, [10, 20, 30, 40, 50, 60], compare.number) === 0, "merge double - values");
  },

  merge_triple: function() {
    const merged = standard.merge([10, 20, 30], [40, 50, 60], [70, 80, 90]);
    this.assert(merged.length === 9, "merge triple - length");
    this.assert(compare.array(merged, [10, 20, 30, 40, 50, 60, 70, 80, 90], compare.number) === 0, "merge triple - values");
  },

  min_same: function() {
    this.assert(standard.min(99, 99) === 99, "min same");
  },

  min_highfirst: function() {
    this.assert(standard.min(21, 8) === 8, "min high first");
  },

  min_lowfirst: function() {
    this.assert(standard.min(8, 21) === 8, "min low first");
  },

  max_same: function() {
    this.assert(standard.max(99, 99) === 99, "max same");
  },

  max_highfirst: function() {
    this.assert(standard.max(21, 8) === 21, "max high first");
  },

  max_lowfirst: function() {
    this.assert(standard.max(8, 21) === 21, "max low first");
  }
};