"use strict"

// $ ffmpeg -framerate 25 -thread_queue_size 512 -f gdigrab -i title="binaries" -fmt flv -s 1920x1080 -pix_fmt uyvy422 pipe:1

const { exec } = require("pegg")
const dargs = require("dargs")
const mergeOptions = require("merge-options")
const forRange = require("for-range")

function ffdargs(options) {
    const opts = dargs(options, { useEquals: false })
    forRange({ min: 0, max: opts.length, step: 2 }, (i) => {
        if (opts[i] && opts[i].startsWith("--")) opts[i] = opts[i].slice(1)
    })
    return opts
}

module.exports = ({ target, format = "flv", ffmpeg } = {}) => {
    const opts = [
        ...ffdargs(mergeOptions({
            framerate: 60,
            thread_queue_size: 512,
            f: "gdigrab",
            i: target ? `title="${target}"` : "desktop",
            s: "1920x1080",
        }, ffmpeg)),
        ...ffdargs({ f: format }),
        "pipe:1"
    ]
    return exec(...opts).stdout
}
