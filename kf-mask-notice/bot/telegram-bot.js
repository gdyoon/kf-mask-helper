"use strict";

const TelegramBot = require("node-telegram-bot-api");

class Telegram {
  constructor() {
    this._token = "1250928951:AAFjl9ECrE2EQq1YbnOwcFbxOd9VSXHStJI";
    this._bot = new TelegramBot(this._token);
    this._channelId = "@mask_saja";
  }

  async notice() {
      const description = 
            "마스크 알리미를 이용해주셔서 고맙습니다!\n"
          + "마스크를 구매할 수 있을 때, 알려드릴게요.\n\n"
          + "현재 모니터링 중인 마스크 구매 사이트\n"
          + "1. 상공양행 (https://smartstore.naver.com/sangkong/products/4762917002)\n"
          + "2. 아에르 (https://smartstore.naver.com/aer-shop/products/4722827602)\n"
          + "3. 공감아이 (https://smartstore.naver.com/gonggami/products/4705579501)\n"
          + "4. 닥터퓨리 (https://smartstore.naver.com/mfbshop/products/4735164530)\n"
          + "5. 미마몰<소형> (https://smartstore.naver.com/aseado/products/4837266971)\n"
          + "6. 미마몰<대형> (https://smartstore.naver.com/aseado/products/4837257765)\n"
          + "7. 크린에어텍 (https://smartstore.naver.com/cleanairtech/products/4818777369)\n"
          + "8. 걸리버인쇄 (https://smartstore.naver.com/soommask/products/4828127993)\n"
          + "9. 샤인웰 (https://smartstore.naver.com/shinewell_healthcare/products/4861603330)\n"
          + "10. 엔에이웰 (https://smartstore.naver.com/pyeongpyoen/products/4690028600)\n"
          + "11. 에스인텍 (https://smartstore.naver.com/sintech/products/598573259)\n"
          + "12. 다마요 (https://smartstore.naver.com/mdamayo/products/3803685971)\n"
          + "13. 마스크팜 (https://smartstore.naver.com/cucofarm/products/4818644134)\n"
          + "14. 마스크팜 (https://smartstore.naver.com/cucofarm/products/4818677202)\n"
          + "\n(앞으로도 계속 추가 할 예정이에요)\n"
          + "developed by. yoongoo\n";
      await this._bot.sendMessage(this._channelId, description, {
        disable_web_page_preview: true,
        disable_notification: true
        // parse_mode: "",
      });
  }

}

module.exports = Telegram;