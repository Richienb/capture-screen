"use strict"

// $ ffmpeg -framerate 25 -thread_queue_size 512 -f gdigrab -i title="binaries" -f flv -s 1920x1080 -pix_fmt uyvy422 pipe:1

// $ ffmpeg -video_size 1920x1080 -framerate 30 -f x11grab -i :0.0 -c:v libx264 -crf 0 -preset ultrafast output.mkv

const { exec } = require("pegg")
const mergeOptions = require("merge-options")

const ffdargs = require("./lib/ffdargs")

module.exports = ({ target, format = "flv", ffmpeg } = {}) => {
    const opts = [
        ...ffdargs(mergeOptions({
            framerate: 60,
            thread_queue_size: 512,
            f: "gdigrab",
            i: target ? `title=${target}` : "desktop",
            s: "1920x1080",
            crf: 0,
            preset: "ultrafast",
        }, ffmpeg)),
        ...ffdargs({ f: format }),
        "pipe:1",
    ]
    const proc = exec(...opts)
    proc.stderr.pipe(process.stderr)
    return proc.stdout
}
