"use strict";
const BaseSite = require("./base-site");
const NaverSmartstoreSite = require("./naver-smartstore-site");
const Constants = require("../constants");

class SiteFactory {

  getSite(site) {
    let store;

    switch(site.store) {
      case Constants.STORE_NAVER:
        store = new NaverSmartstoreSite(site.id, site.name, site.url);
      break;

      default:
      break;
    }

    return store;
  }

}


module.exports = SiteFactory;