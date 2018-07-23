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


/**
 * Implementation of a linked list.
 *
 * Objects added to the LinkedList must implement the 'compare' method.
 */
module.exports = function LinkedList() {

  this.add = function(item) {
    this.first = {
      value: item,
      next: this.first
    };
  }

  this.update = function(item) {
    for (let link = this.first; link; link = link.next) {
      if (item.compare(link.value) === 0) {
        link.value = item;
        return;
      }
    }

    this.add(item);
  }

  this.remove = function(item) {
    if (! this.first) {
      return
    }
    else if (item.compare(this.first.value) === 0) {
      this.first = this.first.next;
    }
    else {
      for (let link = this.first; link; link = link.next) {
        if ((link.next) && (item.compare(link.next.value) === 0)) {
          link.next = link.next.next;
          break;
        }
      }
    }
  }

  this.size = function() {
    let count = 0;
    for (let link = this.first; link; link = link.next) {
      ++count;
    }

    return count;
  }

  this.find = function(item) {
    for (let link = this.first; link; link = link.next) {
      if (item.compare(link.value) === 0) {
        return item;
      }
    }
  }

  this.each = function(func) {
    for (let item = this.first; item; item = item.next) {
      func(item.value);
    }
  }

  this.iterate = function* () {
    for (let item = this.first; item; item = item.next) {
      yield item.value;
    }
  }

  this.debug = function() {
    for (let link = this.first; link; link = link.next) {
      console.log("simplelinkedlist.debug(%d)", link.value);
    }
  }
};