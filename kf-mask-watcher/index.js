const _ = require("lodash");
const process = require("process");
const config = require("config");
const { TelegramBot } = require("./bot");
const { SiteFactory } = require("./site");

const handler = async (event, context) => {
  try {
    const telegramBot = new TelegramBot();
    
    const siteFactory = new SiteFactory();
    const sites = _.map(config.site, (site) => siteFactory.getSite(site));

    await Promise.all(_.map(sites, (site) => site.browse()));
    
    for(const site of sites) {
      if (site.raiseHands() && !site.isSoldOutToday()) {
        await telegramBot.say(`[${site.getName()}] 지금 구매할 수 있습니다.\n${site.getUrl()}`);
      }
    }
  } catch(err) {
    console.log(err);
  }
}

(async () => {
  if (_.isEqual(process.NODE_ENV, "development") || _.isEmpty(process.NODE_ENV)) {
    await handler();
  }
})();

module.exports = {
  handler
}