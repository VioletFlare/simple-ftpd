'use strict'
/*
---
SYST:
  help: BYE
  auth: false
  data: false
  responses:
    - '221 Goodbye.'
*/

function BYE () {
  return this.respond(221, "Goodbye.")
}

exports.handler = BYE
exports.help = 'BYE'
