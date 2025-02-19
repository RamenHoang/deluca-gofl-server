const path = require("path");
const DataUriParser = require("datauri/parser");
const parser = new DataUriParser();

function formatBufferToBase64(file) {
  let format = parser.format(
    path.extname(file.originalname).toString(),
    file.buffer
  );
  //   console.log(format);
  return format;
}

module.exports = formatBufferToBase64;
