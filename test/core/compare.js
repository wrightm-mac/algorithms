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


module.exports = {
  name: "core/compare",

  comparenumber_equal: function() {
    this.assert(compare.number(99, 99) === 0, "number comparison equal");
  },

  comparenumber_lessthan: function() {
    this.assert(compare.number(8, 21) < 0, "number comparison less-than");
  },

  comparenumber_greaterthan: function() {
    this.assert(compare.number(21, 8) > 0, "number comparison greater-than");
  },

  compare_number_reverse_lessthan: function() {
    this.assert(compare.reverse(compare.number)(8, 21) > 0, "number comparison reverse less-than");
  },

  compare_number_reverse_greaterthan: function() {
    this.assert(compare.reverse(compare.number)(21, 8) < 0, "number comparison reverse greater-than");
  },


  comparestring_equal: function() {
    this.assert(compare.string("abc", "abc") === 0, "string comparison equal");
  },

  comparestring_lessthan: function() {
    this.assert(compare.string("abc", "xyz") < 0, "string comparison less-than");
  },

  comparestring_greaterthan: function() {
    this.assert(compare.string("xyz", "abc") > 0, "string comparison greater-than");
  },

  comparestring_reverse_lessthan: function() {
    this.assert(compare.reverse(compare.string)("abc", "xyz") > 0, "string comparison less-than");
  },

  comparestring_reverse_greaterthan: function() {
    this.assert(compare.reverse(compare.string)("xyz", "abc") < 0, "string comparison greater-than");
  }
};