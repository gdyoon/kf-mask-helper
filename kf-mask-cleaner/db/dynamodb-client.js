"use strict";
const AWS = require("aws-sdk");
const process = require("process");

AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY
});

class DynamodbClient {

  constructor() {
    this._doc = new AWS.DynamoDB.DocumentClient();
  }

  async clear(siteId) {
    try {
      await this._doc.update({
        TableName: "tbl_notification_prod",
        Key: { siteId },
        UpdateExpression: `set isNotified = :r`,
        ExpressionAttributeValues: { ":r": false },
        ReturnValues: "UPDATED_NEW"
      }).promise();
    } catch(err) {
      throw err;
    }
  }

  async scan() {
    try {
      const data = await this._doc.scan({
        TableName: "tbl_notification_prod",
        FilterExpression: "#nt = :notified",
        ExpressionAttributeNames: {
          "#nt": "isNotified",
        },
        ExpressionAttributeValues: {
          ":notified": true
        }
      }).promise();
      
      return data.Items;
    } catch(err) {
      throw err;
    }
  }
}

module.exports = DynamodbClient;