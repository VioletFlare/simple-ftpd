'use strict'
/*
---
SYST:
  help: QUIT
  auth: false
  data: false
  responses:
    - '221 Goodbye.'
*/

function QUIT () {
  return this.respond(221, "Goodbye.")
}

exports.handler = QUIT
exports.help = 'QUIT'
