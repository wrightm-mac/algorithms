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


const queue = require('../../lib/collection/queue');


module.exports = {
  name: "collection/queue",

  $setup: function() {
    this.queue = new queue();
    this.queue.put(10);
    this.queue.put(20);
    this.queue.put(30);
  },

  queue_size_empty: function() {
    this.queue = new queue();
    this.assert(this.queue.size() === 0, "queue - size empty");
  },

  queue_size: function() {
    this.assert(this.queue.size() === 3, "queue - size");
  },

  queue_peek_value: function() {
    this.assert(this.queue.peek() === 10, "queue - peek value");
  },

  stack_peek_size: function() {
    this.queue.peek();
    this.assert(this.queue.size() === 3, "queue - peek size");
  },

  queue_get_value: function() {
    this.assert(this.queue.get() === 10, "queue - get value");
  },

  queue_get_size: function() {
    this.queue.get();
    this.assert(this.queue.size() === 2, "queue - get size");
  },

  queue_clear: function() {
    this.queue.clear();
    this.assert(this.queue.size() === 0, "queue - clear");
  },

  queue_get_until_empty: function() {
    let count = this.queue.size();
    while (this.queue.get()) {
      --count;
    }
    this.assert(count === 0, "queue - get until empty");
  }
};