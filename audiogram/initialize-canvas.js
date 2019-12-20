var fs = require("fs"),
  path = require("path"),
  Canvas = require("canvas"),
  getRenderer = require("../renderer/"),
  axios = require("axios");

async function initializeCanvas(theme, cb) {
  // Fonts pre-registered in bin/worker
  var renderer = getRenderer(theme);

  if (!theme.backgroundImage) {
    return cb(null, renderer);
  }

  const res = await axios.get(theme.backgroundImage, {
    responseType: "arraybuffer"
  });
  let imgFile = Buffer.from(res.data);
  var bg = new Canvas.Image();
  bg.src = imgFile;
  renderer.backgroundImage(bg);

  return cb(null, renderer);
  // Load background image from file (done separately so renderer code can work in browser too)
  // fs.readFile(path.join(__dirname, "..", "settings", "backgrounds", theme.backgroundImage), function(err, raw){

  //   if (err) {
  //     return cb(err);
  //   }

  // });
}

module.exports = initializeCanvas;