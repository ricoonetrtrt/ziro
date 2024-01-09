module.exports.config = {
	name: "تغييراسم_المجموعة",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
	description: "تغيير اسم المجموعة الخاصة بك",
	commandCategory: "Box", 
	usages: "تغييراسمالمجموعة [اسم]", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args }) {
	var name = args.join(" ")
	if (!name) api.sendMessage("❌ لم تدخل اسم المجموعة الذي تريد تغييره", event.threadID, event.messageID)
	else api.setTitle(name, event.threadID, () => api.sendMessage(`🔨 قام البوت بتغيير اسم المجموعة إلى: ${name}`, event.threadID, event.messageID));
}