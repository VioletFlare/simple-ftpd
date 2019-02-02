'use strict'
/*
---
SYST:
  rfc: 'https://tools.ietf.org/html/rfc3659#section-4.1'
  help: SIZE [<SP> path-name](get size)
  auth: false
  data: false
  responses:
    - '213 128'
*/

const path = require('path')
const posix = path.posix
const mode = require('stat-mode')

function SIZE (pathName) {
    const localPathName = posix.resolve(this.cwd, pathName)
    pathName = path.join(this.root, localPathName)
  
    return this.emitAsync('stat', pathName)
    .then((stat) => {
      return this.respond(550, "Not implemented");
      //return this.respond(213, stat.size.toString())
    }, (err) => {
      this.respond(550, err.message)
    })
  

}

exports.handler = SIZE
exports.help = 'SIZE (get size)'