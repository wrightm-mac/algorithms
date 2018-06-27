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


const peddle = require('./lib/peddle');

const coreCompare = require('./core/compare');
const coreStandard = require('./core/standard');
const coreUtility = require('./core/utility');
const coreHash = require('./core/hash');

const sortInsertion = require('./sort/insertion');
const sortSelection = require('./sort/selection');
const sortHeap = require('./sort/heap');
const sortQuick = require('./sort/quick');
const sortMerge = require('./sort/merge');

const collectionSimpleLinkedList = require('./collection/simplelinkedlist');
const collectionHashMapSize = require('./collection/hashmap_size');
const collectionHashMapContent = require('./collection/hashmap_content');

const searchSequential = require('./search/sequential');
const searchBinary = require('./search/binary');


peddle.run(coreCompare);
peddle.run(coreStandard);
peddle.run(coreUtility);
peddle.run(coreHash);

peddle.run(sortInsertion);
peddle.run(sortSelection);
peddle.run(sortHeap);
peddle.run(sortQuick);
peddle.run(sortMerge);

peddle.run(collectionSimpleLinkedList);
peddle.run(collectionHashMapSize);
peddle.run(collectionHashMapContent);

peddle.run(searchSequential);
peddle.run(searchBinary);
