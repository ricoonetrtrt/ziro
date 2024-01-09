module.exports.config = {
	name: "تغييرالإيموجي",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
	description: "تغيير الإيموجي في المجموعة",
	commandCategory: "المجموعة",
	usages: "تغييرالإيموجي [إيموجي]",
	cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
	const emoji = args.join(" ")
	api.changeThreadEmoji(`${emoji}`, event.threadID, event.messagaID);
}