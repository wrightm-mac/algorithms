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


const hash = require('../../lib/core/hash');


module.exports = {
  name: "core/hash",

  hash_string: function() {
    const value = "hello, world!";
    const hashed = hash(value);
    this.assertIsNumber(hashed, "hash string");
  },

  hash_string_range: function() {
    const value = "hello, world!";
    const hashed = hash(value, 256);
    this.assert((hashed >= 0) && (hashed < 256), "hash string range");
  },

  hash_number: function() {
    const value = 2108;
    const hashed = hash(value);
    this.assertIsNumber(hashed, "hash number");
  },

  hash_number_range: function() {
    const value = 2108;
    const hashed = hash(value, 256);
    this.assert((hashed >= 0) && (hashed < 256), "hash number range");
  },

  hash_date: function() {
    const value = Date.now();
    const hashed = hash(value);
    this.assertIsNumber(hashed, "hash date");
  },

  hash_date_range: function() {
    const value = Date.now();
    const hashed = hash(value, 256);
    this.assert((hashed >= 0) && (hashed < 256), "hash date range");
  },

  hash_object: function() {
    const value = {first: "one", second: "two"};
    const hashed = hash(value);
    this.assertIsNumber(hashed, "hash object");
  },

  hash_object_range: function() {
    const value = {first: "one", second: "two"};
    const hashed = hash(value, 256);
    this.assert((hashed >= 0) && (hashed < 256), "hash object range");
  },
};