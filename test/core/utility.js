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


const compare = require('../../lib/core/compare');
const utility = require('../../lib/core/utility');


module.exports = {
  name: "core/utility",

  array_random_sizeonly_length: function() {
    const array = utility.array.random(19);
    this.assert(array && (array.length === 19), "array random size-only length");
  },

  array_random_sizeonly_inrange: function() {
    const array = utility.array.random(19);
    this.assert(! array.find(value => (value < 1) || (value > 100)), "array random size-only in range");
  },

  array_random_sizeminmax_length: function() {
    const array = utility.array.random(1000, 800, 2100);
    this.assert(array && (array.length === 1000), "array random size-min-max length");
  },

  array_random_sizeminmax_inrange: function() {
    const array = utility.array.random(1000, 800, 2100);
    this.assert(! array.find(value => (value < 800) || (value > 2100)), "array random size-min-max in range");
  },

  array_ascending_null: function() {
    this.assert(! utility.ascending(null, compare.number), "array ascending null");
  },

  array_ascending_empty: function() {
    this.assert(! utility.ascending([], compare.number), "array ascending empty");
  },

  array_ascending_valid: function() {
    this.assert(utility.ascending([10, 20, 30, 40, 50], compare.number), "array ascending valid");
  },

  array_ascending_notvalid: function() {
    this.assert(! utility.ascending([50, 40, 20, 30, 10], compare.number), "array ascending not-valid");
  },

  array_descending_null: function() {
    this.assert(! utility.descending(null, compare.number), "array descending null");
  },

  array_descending_empty: function() {
    this.assert(! utility.descending([], compare.number), "array descending empty");
  },

  array_descending_valid: function() {
    this.assert(utility.descending([50, 40, 30, 20, 10], compare.number), "array descending valid");
  },

  array_descending_notvalid: function() {
    this.assert(! utility.descending([50, 40, 20, 30, 10], compare.number), "array descending not-valid");
  },
};