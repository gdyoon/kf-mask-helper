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
    const $ = await request({
      url: this._url,
      transform: (body) => cheerio.load(body),
      encoding: null
    });

    const clues = [
      !$(".buy .mask2").hasClass("mask2"),
      $(".buy ._productPreLaunch").hasClass("_productPreLaunch")
    ];
    
    this._hasProduct = _.includes(_.map(clues, clue => clue), true);

    console.log(`Succeed to browse site. name=${this._name}\tcan_buy=${this._hasProduct}\turl=${this._url} `);
  }
}

module.exports = NaverSmartstoreSite;