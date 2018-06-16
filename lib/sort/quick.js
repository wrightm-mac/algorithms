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


const standard = require('../core/standard');


function sort(values, comparer) {
  quicksort(0, values.length - 1);

  return values;

  function quicksort(left, right) {
    let pivotIndex = selectPivotIndex(left, right);
    if (left < right) {
      pivotIndex = partition(left, right, pivotIndex);
      quicksort(left, pivotIndex - 1, pivotIndex);
      quicksort(pivotIndex + 1, right, pivotIndex);
    }
  }

  function partition(left, right, pivotIndex) {
    const pivot = values[pivotIndex];

    standard.swap(values, right, pivotIndex);

    let store = left;
    for (let index = left; index < right; ++index) {
      if (comparer(values[index], pivot) <= 0) {
        standard.swap(values, index, store);
        ++store;
      }
    }

    standard.swap(values, right, store);

    return store;
  }

  function selectPivotIndex(left, right) {
    return Math.round(left + ((right - left) / 2));
  }
}

module.exports = sort;
