"use strict";
const AWS = require("aws-sdk");
const process = require("process");
const _ = require("lodash");

AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY
});

class DynamodbClient {

  constructor() {
    this._doc = new AWS.DynamoDB.DocumentClient();
  }

  async select({tableName, siteId}) {
    try {
      const data = await this._doc.get({
        TableName: tableName,
        Key: { siteId }
      }).promise();

      return data.Items;
    } catch(err) {
      throw err;
    }
  }

  async update({tableName, siteId}) {
    try {
      await this._doc.update({
        TableName: tableName,
        Key: { siteId },
        UpdateExpression: `set isNotified = :r`,
        ExpressionAttributeValues: { ":r": true },
        ReturnValues: "UPDATED_NEW"
      }).promise();
    } catch(err) {
      throw err;
    }
  }
}

module.exports = DynamodbClient;