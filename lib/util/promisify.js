'use strict'

module.exports = function promisify (method, alwaysResolve) {
  return function (...args) {
    let called = false

    return new Promise((resolve, reject) => {
      method.call(this, ...args, (err, ...rest) => {
        if (called) return
        called = true
        if (alwaysResolve) resolve(err, ...rest)
        else if (err) reject(err)
        else resolve(...rest)
      })
    })
  }
}
