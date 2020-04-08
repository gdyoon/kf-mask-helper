"use strict";

const cheerio = require("cheerio");
const request = require("request-promise");
const _ = require("lodash");
const BaseSite = require("./base-site");

class NaverSmartstoreSite extends BaseSite {
  constructor(id, name, url) {
    super(id, name, url);
  }
  
  async browse() {
    try {
      const $ = await request({
        url: this._url,
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Safari/605.1.15",
        },
        transform: (body) => cheerio.load(body)
      });

      const clues = [
        !$(".buy .mask2").hasClass("mask2"),
        $(".buy ._productPreLaunch").hasClass("_productPreLaunch")
      ];
      
      this._hasProduct = _.includes(_.map(clues, clue => clue), true);

      console.log(`Succeed to browse site. name=${this._name}\tcan_buy=${this._hasProduct}\turl=${this._url} `);
    } catch(err) {
      console.log(`${err}`);
    }
  }
}

module.exports = NaverSmartstoreSite;