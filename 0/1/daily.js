module.exports.config = {
	name: "يومية",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "𝐊𝐈𝐓𝐄 凧",
	description: "earn botmoney",
	commandCategory: "economy",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 600,
        rewardCoin: 9999999999999999
    }
};

module.exports.languages = {
    "en": {
        "cooldown": "لقد اخدت مكافئتك اليوم من فضلك عد بعد: %1 ساعات و %2 دقيقة و %3 ثانية.",
        "rewarded": "لقد حصلت على %1$"
    }
}

module.exports.run = async ({ event, api, Currencies, getText }) => {
    const { daily } = global.configModule,
        cooldownTime = daily.cooldownTime,
        rewardCoin = daily.rewardCoin;

    var { senderID, threadID } = event;

    let data = (await Currencies.getData(senderID)).data || {};
    if (typeof data !== "undefined" && cooldownTime - (Date.now() - (data.dailyCoolDown || 0)) > 0) {
        var time = cooldownTime - (Date.now() - data.dailyCoolDown),
            seconds = Math.floor( (time/1000) % 60 ),
            minutes = Math.floor( (time/1000/60) % 60 ),
            hours = Math.floor( (time/(1000*60*60)) % 24 );

		return api.sendMessage(getText("cooldown", hours, minutes, (seconds < 10 ? "0" : "") + seconds), threadID);
    }

    else return api.sendMessage(getText("rewarded", rewardCoin), threadID, async () => {
        await Currencies.increaseMoney(senderID, rewardCoin);
        data.dailyCoolDown = Date.now();
        await Currencies.setData(senderID, { data });
        return;
    });
      }