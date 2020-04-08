"use strict";
const { DynamodbClient } = require("./db");

exports.handler = async (event, context) => {
  try {
    const dynamodb = new DynamodbClient();
    const stores = await dynamodb.scan();
    await Promise.all(stores.map((store) => dynamodb.clear(store.siteId)));
    console.log("Succeed to clean notification table.");
  } catch(err) {
    console.error(`${err}`);
  }
}

(async () => {
  await this.handler();
})();