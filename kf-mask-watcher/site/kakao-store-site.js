"use strict";
const cheerio = require("cheerio");
const request = require("request-promise");
const _ = require("lodash");
const config = require("config");
const BaseSite = require("./base-site");

class KakaoStoreSite extends BaseSite {
  constructor(id, name, url) {
    super(id, name, url);
  }
  
  async browse() {
    try {
      const $ = await request({
        url: this._url,
        headers: {
          "User-Agent": config.userAgent,
        },
        transform: (body) => cheerio.load(body)
      });

      const clues = [
        !_.isEqual($("._purchase_button").attr("disabled"), "disabled")
      ];
      
      console.log(clues[0]);
      this._hasProduct = _.includes(_.map(clues, clue => clue), true);

      console.log(`Succeed to browse site. name=${this._name}\tcan_buy=${this._hasProduct}\turl=${this._url} `);
    } catch(err) {
      console.log(`${err}`);
    }
  }
}

module.exports = KakaoStoreSite;