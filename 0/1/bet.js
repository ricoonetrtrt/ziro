module.exports.config = {
	name: "قمر",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Gry 凧",
	description: "coin trowing",
	commandCategory: "game-sp",
	usages: `Missing input\n\nHow to use?\n${global.config.PREFIX}bet <money>\n\nExample:\n${global.config.PREFIX}bet 50\n`,
	cooldowns: 5,
};

module.exports.run = async function({ api, event, args, Currencies }) {
            let { threadID, messageID, senderID } = event;
            const slotItems = ["🐙","🦀","🐠"];
			let money = (await Currencies.getData(event.senderID)).money;
			var coin = args.join(" ");
			if (!coin) return api.sendMessage(`ادخال خاطئ\n\nكيف تستعمله \n${global.config.PREFIX}رهان <مبلغ من المال>\n\nمثال:\n${global.config.PREFIX}رهان 50\n\nصنع بواسطة: Gry 凧`, threadID, messageID);
			let win = false;
			if (isNaN(coin)|| coin.indexOf("-") !== -1) return api.sendMessage(`ادخال خاطئ\n\nكيف تستعمله \n${global.config.PREFIX}رهان <مبلغ من المال>\n\nمثال:\n${global.config.PREFIX}رهان 50\n\nصنع بواسطة: Gry 凧`, threadID, messageID);
			if (!coin) return api.sendMessage(`ادخال خاطئ\n\nكيف تستعمله \n${global.config.PREFIX}رهان <مبلغ من المال>\n\nمثال:\n${global.config.PREFIX}رهان 50\n\nصنع بواسطة: Gry 凧`, threadID, messageID);
			if (coin > money) return api.sendMessage(`لا تملك مالا كافيا من فضلك استخدم ${global.config.PREFIX}daily`, threadID, messageID);
			if (coin < 50) return api.sendMessage(`مبلغ رهانك صغير,  اقل مبلغ هو 50$\n`, threadID, messageID);
			let number = [];
			for (i = 0; i < 3; i++) number[i] = Math.floor(Math.random() * slotItems.length);
			if (number[0] == number[1] && number[1] == number[2]) {
				money *= 9;
				win = true;
			}
				else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
					money *= 2;
					win = true;
				}
				(win) ? api.sendMessage(`🎰${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}🎰\nلقد ربحت ${coin} دولار.`, threadID, () => Currencies.increaseMoney(senderID, parseInt(coin)), messageID) : api.sendMessage(`🎰${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}🎰\nلقد خسرت نقودك\n`, threadID, () => Currencies.decreaseMoney(senderID, parseInt(coin)), messageID);
}
