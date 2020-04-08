"use strict";
const BaseSite = require("./base-site");
const NaverSmartstoreSite = require("./naver-smartstore-site");
const KakaoStoreSite = require("./kakao-store-site");
const Constants = require("../constants");

class SiteFactory {

  getSite(site) {
    let store;

    switch(site.store) {
      case Constants.STORE_NAVER:
        store = new NaverSmartstoreSite(site.id, site.name, site.url);
      break;
      
      case Constants.STORE_KAKAO:
        store = new KakaoStoreSite(site.id, site.name, site.url);
      default:
        
      break;
    }

    return store;
  }

}


module.exports = SiteFactory;