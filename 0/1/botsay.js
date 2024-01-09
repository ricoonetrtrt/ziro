module.exports.config = {
	name: "قول",
	version: "1.1.1",
	hasPermssion: 0,
	credits: "𝐊𝐈𝐓𝐄 凧",
	description: "Bot Saying",
	commandCategory: "ai",
	usages: "[text/message/chat]",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
var say = args.join(" ")
	if (!say) api.sendMessage("من فضلك ادخل رسالة بعد الامر", event.threadID, event.messageID)
	else api.sendMessage(`${say}`, event.threadID, event.messageID);
}
