const fs = require('fs-extra');
const md5File = require('md5-file');
const ncp = require('ncp');
const path = require('path');

// output dir
const output_dir = 'public/'

// List of asset files to md5 fingerprint
const asset_files = [
  "public/dist/style.css",
  "public/dist/main.js"
]

// Object with keys for each file type
let asset_map = {}

asset_files.forEach(function(asset_file) {

  let md5 = md5File.sync(asset_file)
  let extension = path.extname(asset_file).replace('.', '')
  let filename = path.basename(asset_file, extension).slice(0,-1)
  let dir = path.dirname(asset_file)
  let asset_dir = path.basename(dir)

  if (!asset_map.hasOwnProperty(extension)) {
    asset_map[extension] = {}
  }
  asset_map[extension][filename] = filename + '.' + md5 + '.' + extension

  // Copy the file to its fingerprinted name
  fs.copySync(asset_file, output_dir + asset_dir + '/' + asset_map[extension][filename])
})

module.exports = asset_map

