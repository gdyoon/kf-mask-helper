"use strict";
const config = require("config");
const { DynamodbClient } = require("../db");

class BaseSite {
  constructor(id, name, url) {
    this._id = id;
    this._name = name;
    this._url = url;
    this._hasProduct = false;
    this._db = new DynamodbClient();
  }

  getName() {
    return this._name;
  }

  getUrl() {
    return this._url;
  }

  // NOTE: 웹 사이트에서 재고 정보를 파싱한다.
  async browse() {
    throw new Error("Not implemented error.");
  }

  // NOTE: 구매 가능 여부를 반환한다.
  raiseHands() {
    return this._hasProduct;
  }

  async isSoldOutToday() {
    const status = await this._db.select({
      tableName: config.db.table.notification,
      siteId: this._id
    });

    if (status.isNotified) {
      return true;
    }
    await this._stopNotification();

    return false;
  }

  async _stopNotification() {
    await this._db.update({
      tableName: config.db.table.notification,
      siteId: this._id
    });
  }
}

module.exports = BaseSite