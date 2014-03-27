var split = require('split')

module.exports = function (recordsep, fieldsep, keys, pos) {

  var splitter = split(recordsep, parser)

  function parser (record) {
    // console.log(record)
    if (record === '') return void 0
    var fields = record.split(fieldsep)
    if (!fields.length) return void 0
    var jobj = {}
    keys.forEach( function (k, i) {
      if (pos[i] === "NF") {
        pos[i] = fields.length-1
      }
      if (!isNaN(fields[pos[i]])) {
        fields[pos[i]] = Number(fields[pos[i]])
      }
      jobj[k] = fields[pos[i]]
    })
    return JSON.stringify(jobj) + "\n"
  }

  return splitter
}