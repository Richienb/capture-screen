const dargs = require("dargs")
const forRange = require("for-range")

module.exports = (options) => {
    const opts = dargs(options, { useEquals: false })
    forRange({ min: 0, max: opts.length, step: 2 }, (i) => {
        if (opts[i] && opts[i].startsWith("--")) opts[i] = opts[i].slice(1)
    })
    console.log(opts)
    return opts
}
