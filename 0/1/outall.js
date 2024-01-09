module.exports.config = {
	name: "خروج_الجميع",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
	description: "أرسل رسائل إلى المجموعات!",
	commandCategory: "الإدارة",
	usages: "sendnoti [النص]",
	cooldowns: 5,
	info: [
		{
			key: "النص",
			prompt: "النص الذي تريد إرساله إلى الجميع",
			type: 'وثيقة',
			example: 'مرحبا إم'
		}
	]
};

module.exports.run = async ({ api, event, args }) => {
    const permission = ["100075085058816"];
             if (!permission.includes(event.senderID))
             return api.sendMessage("فقط ريكو يمكنه استخدام هذا الأمر", event.threadID, event.messageID);
	return api.getThreadList(100, null, ["INBOX"], (err, list) => {
		if (err) throw err;
		list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ? api.removeUserFromGroup(api.getCurrentUserID(), item.threadID) : '');
		api.sendMessage(' خروج من جميع المجموعات بنجاح', event.threadID);
	});
}