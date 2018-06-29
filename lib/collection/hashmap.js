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


const hashfunc = require('../core/hash');
const list = require('./simplelinkedlist');


module.exports = function HashMap(comparer, slots = 59) {

  this.table = [];

  this.add = function(hashable) {
    const hash = hashfunc(hashable, slots);
    let bucket = this.table[hash];
    if (bucket) {
      bucket.update(hashable, item => comparer(item, hashable) === 0);
    } else {
      bucket = new list();
      this.table[hash] = bucket;
      bucket.add(hashable);
    }

    return hashable;
  }

  this.remove = function(hashable) {
    const bucket = this.table[hashfunc(hashable, slots)];
    if (bucket) {
      bucket.remove(item => comparer(item, hashable) === 0);
    }
  }

  this.find = function(hashable, hash = hashfunc(hashable, slots)) {
    const bucket = this.table[hash];
    if (! bucket) {
      return;
    }

    return bucket.find(item => comparer(item, hashable) === 0);
  }

  this.size = function() {
    let count = 0;
    for (const hash in this.table) {
      const bucket = this.table[hash];
      if (bucket) {
        count += bucket.size();
      }
    }

    return count;
  }

  this.debug = function() {
    for (const hash in this.table) {
      if (this.table[hash]) {
        console.log("hashmap.debug(hash=%d, size=%d)", hash, this.table[hash].size());
      }
    }
  }
};