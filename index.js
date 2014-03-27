var minimist = require('minimist')
var split = require('split')
var opts = {
    default: {F: " "},
    strings: ["F"]
}
var args = minimist(process.argv.slice(2), opts);

if (args._.length < 1) {
    throw new Error("Must supply a mapping")
}

var jmap = args._[0];

try {
    jmap = JSON.parse(jmap)
} catch (e) {
    throw new Error("provided json map is unparsable")
}

var keys = Object.keys(jmap)
var pos = keys.map( function (k) {return jmap[k]} )

var splitter = split()

process.stdin.pipe(splitter)

splitter.on('data', function (data) {
    if (data === '') return
    var darr = data.split(args.F)
    if (!darr.length) return
    var jobj = {}
    keys.forEach( function (k, i) {
        if (pos[i] === "NF") {
            pos[i] = darr.length-1
        }
        if (!isNaN(darr[pos[i]])) darr[pos[i]] = Number(darr[pos[i]])
        jobj[k] = darr[pos[i]]
    })
    console.log(JSON.stringify(jobj))
})