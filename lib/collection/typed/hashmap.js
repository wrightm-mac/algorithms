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


const list = require('./linkedlist');
const standard = require('../../core/standard');


module.exports = function HashMap(slots = 59) {

  this.table = [];

  this.add = function(hashable) {
    const hash = hashable.hash();
    let bucket = this.table[hash];
    if (bucket) {
      bucket.update(hashable);
    } else {
      bucket = new list();
      this.table[hash] = bucket;
      bucket.add(hashable);
    }

    return hashable;
  }

  this.remove = function(hashable) {
    const bucket = this.table[hashable.hash()];
    if (bucket) {
      bucket.remove(hashable);
    }
  }

  this.find = function(hashable) {
    const bucket = this.table[hashable.hash()];
    if (bucket) {
      return bucket.find(hashable);
    }
  }

  this.iterate = function* () {
    for (const hash in this.table) {
      const bucket = this.table[hash];
      if (bucket) {
        for (const value of bucket.iterate()) {
          yield value;
        }
      }
    }
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

  this.statistics = function() {
    const stats = {
      bucketcount: this.table.length,
      buckets: [],
      emptycount: 0,
      maxsize: 0,
      minsize: 999999,
      itemcount: 0,
    };

    for (const bucket of this.table) {
      const size = bucket.size();
      stats.buckets.push(size);
      stats.itemcount += size;
      if (! size) {
        stats.emptycount++;
      }
      stats.maxsize = standard.max(stats.maxsize, size);
      stats.minsize = standard.min(stats.minsize, size);
    }

    stats.avgbucket = standard.average(stats.buckets);

    return stats;
  }
};