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


const hash = require('./hash');


module.exports = {
  swap: function(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  },

  copy: function(array) {
    const fresh = [];

    for (const value of array) {
      fresh.push(value);
    }

    return fresh;
  },

  append: function(first, second) {
    for (const value of second) {
      first.push(value);
    }

    return first;
  },

  merge: function(... arrays) {
    let merged = [];
    for (const array of arrays) {
      merged = this.append(merged, array);
    }

    return merged;
  },

  max: function(a, b) {
    a = a || 0;
    b = b || a;
    return (a > b) ? a : b;
  },

  min: function(a, b) {
    a = a || 0;
    b = b || a;
    return (a < b) ? a : b;
  },

  random: function(min, max) {
    const range = max - min;
    return Math.round((Math.random() * range + min));
  },

  randomiser: function(min, max) {
    min = this.min(min, max);
    max = this.max(min, max);
    const range = max - min;

    return () => {
      return Math.round((Math.random() * range + min));
    };
  }
};