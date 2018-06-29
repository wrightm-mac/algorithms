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
  name: "collection/hashmap-content",

  $setup: function() {
    this.collection = new hashmap(compare.number, 197);

    for (let count = 1; count <= 1000; ++count) {
      this.collection.add(count);
    }

    this.assert(this.collection.size() === 1000, "hashmap content - created size");
  },

  list_content_find_good: function() {
    this.assertDefined(this.collection.find(8), "hashmap - content good");
    this.assertDefined(this.collection.find(21), "hashmap - content good");
    this.assertDefined(this.collection.find(407), "hashmap - content good");
    this.assertDefined(this.collection.find(923), "hashmap - content good");
  },

  list_content_find_bad: function() {
    this.assertUndefined(this.collection.find(-31), "hashmap - content bad");
    this.assertUndefined(this.collection.find(99000), "hashmap - content bad");
    this.assertUndefined(this.collection.find(1001), "hashmap - content bad");
  },

  list_content_add_duplicate_size: function() {
    this.collection.add(210);
    this.assert(this.collection.size() === 1000, "hashmap - content add duplicate size");
  },

  list_content_add_duplicate_find: function() {
    this.collection.add(800);
    this.assertDefined(this.collection.find(800), "hashmap - content add duplicate find");
  },

  list_content_add_duplicate_not_find: function() {
    this.collection.add(800);
    this.assertUndefined(this.collection.find(1031), "hashmap - content add duplicate not find");
  }
};