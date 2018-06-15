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


const chalk = require('chalk');
const assert = require('./assert');


module.exports = {
  log: function(color, message, name, elapsed) {
    let out = `${chalk[color](chalk.bold(message))}('${chalk.bold(name)}')`;
    if (elapsed) {
      out += ` in ${elapsed}ms`;
    }

    console.log(out);
  },

  run: function(tests, config) {
    this.log("blue", "suite", tests.name);

    const count = {
      tests: 0,
      success: 0,
      failure: 0
    };

    for (const name in tests) {
      const func = tests[name];

      if ((! name.startsWith("$")) && (typeof(func) === "function")) {
        this.log("yellow", "starting", `${tests.name}:${name}`);

        const assertions = new assert(name);

        let starttime;
        try {
          ++count.tests;

          starttime = new Date();
          if (tests.$setup) {
            tests.$setup.call(assertions, config);
          }

          starttime = new Date();
          func.call(assertions, config);

          if (tests.$teardown) {
            tests.$teardown.call(assertions, config);
          }

          const elapsed = new Date() - starttime;
          this.log("green", "success", `${tests.name}:${name}`, elapsed);

          ++count.success;
        }
        catch(error) {
          const elapsed = new Date() - starttime;
          this.log("red", "failure", error, elapsed);

          ++count.failure;
        }

      }
    }

    this.log("blue", "tests", count.tests);
    this.log("blue", "success", count.success);
    this.log("blue", "failure", count.failure);

    console.log();

    return count;
  }
};