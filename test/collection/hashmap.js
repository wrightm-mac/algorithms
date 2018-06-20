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


const hashmap = require('../../lib/collection/hashmap');
const compare = require('../../lib/core/compare');


module.exports = {
  name: "collection/hashmap",

  $setup: function() {
    this.collection = new hashmap(compare.string);

  },

  list_size_empty: function() {
    this.assert(this.collection.size() === 0, "hashmap - size 0");
  },

  list_size_1: function() {
    this.collection.add("hello");
    this.assert(this.collection.size() === 1, "hashmap - size 1");
  },

  list_size_2: function() {
    this.collection.add("abc");
    this.collection.add("def");
    this.assert(this.collection.size() === 2, "hashmap - size 2");
  },

  list_size: function() {
    this.collection.add("abc");
    this.collection.add("def");
    this.collection.add("pqr");
    this.assert(this.collection.size() === 3, "hashmap - size 3");
  },

  list_add_single_added: function() {
    this.collection.add("hello");
    this.assertDefined(this.collection.find("hello"), "hashmap - add");
  }
};