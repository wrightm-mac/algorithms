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


const stack = require('../../lib/collection/stack');


module.exports = {
  name: "collection/stack",

  $setup: function() {
    this.stack = new stack();
    this.stack.push(10);
    this.stack.push(20);
    this.stack.push(30);
  },

  stack_size_empty: function() {
    this.stack = new stack();
    this.assert(this.stack.size() === 0, "stack - size empty");
  },

  stack_size: function() {
    this.assert(this.stack.size() === 3, "stack - size");
  },

  stack_peek_value: function() {
    this.assert(this.stack.peek() === 30, "stack - peek value");
  },

  stack_peek_size: function() {
    this.stack.peek();
    this.assert(this.stack.size() === 3, "stack - peek size");
  },

  stack_pop_value: function() {
    this.assert(this.stack.pop() === 30, "stack - pop value");
  },

  stack_pop_size: function() {
    this.stack.pop();
    this.assert(this.stack.size() === 2, "stack - pop size");
  },

  stack_clear: function() {
    this.stack.clear();
    this.assert(this.stack.size() === 0, "stack - clear");
  }
};