// const markdown = require('markdown-it')({
//   html: true,
//   breaks: true,
//   linkify: true,
//   typographer: true,
// }).use(require('markdown-it-anchor'), {
//   level: [2],
//   permalink: false,
// })

// const slugify = require('slugify')
const path = require('path')
const asset_map = require('./asset_map')
require('dotenv-flow').config()

const site = require('./site/_data/site.js');


module.exports = {
  PanelRadioButtons: function({ panel_id, locale }) {
    return `<div class="hs-radio-wrapper uw-padding-top-2">
  <label class="hs-radio-button" for="yes_panel_${panel_id}">
    <input type="radio" name="symptoms_${panel_id}" value="yes" id="yes_panel_${panel_id}" aria-describedby="panel_${panel_id}_heading panel_${panel_id}_body" />
    <svg width="32" height="32" viewBox="-4 -4 39 39" aria-hidden="true" focusable="false">
      <!-- The background -->
      <circle class="hs-bg" cx="16" cy="16" r="16" stroke="black" stroke-width="3" fill="#ffffff" />
      <!-- The checkmark-->
      <circle class="hs-cm" cx="16" cy="16" r="10" stroke="#ffffff" stroke-width="3" fill="#ffffff" />
    </svg>

    <span>${site.locales[locale].label_yes}</span>
  </label>

  <label class="hs-radio-button" for="no_panel_${panel_id}">
    <input type="radio" name="symptoms_${panel_id}" value="no" id="no_panel_${panel_id}" aria-describedby="panel_${panel_id}_heading panel_${panel_id}_body" />
    <svg width="32" height="32" viewBox="-4 -4 39 39" aria-hidden="true" focusable="false">
      <!-- The background -->
      <circle class="hs-bg" cx="16" cy="16" r="16" stroke="black" stroke-width="3" fill="#ffffff" />
      <!-- The checkmark-->
      <circle class="hs-cm" cx="16" cy="16" r="10" stroke="#ffffff" stroke-width="3" fill="#ffffff" />
    </svg>

    <span>${site.locales[locale].label_no}</span>
  </label>
</div>`
  },

  AssetPath: function(asset_path) {
    if (process.env.ELEVENTY_ENV != "production")
      return asset_path
    let dir = path.dirname(asset_path)
    let extension = path.extname(asset_path).replace('.', '')
    let file_name = path.basename(asset_path, extension).slice(0,-1)
    return dir + '/' + asset_map[extension][file_name]
  },
}
