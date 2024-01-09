module.exports.config = {
	name: "ضيفيني",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Gry KJ",
	description: "دخول الى مجموعة البوت",
	commandCategory: "مجموعة",
	usages: "",
	cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
	const threadID = '6885617361527192'; 
	const userID = event.senderID; 
	await api.addUserToGroup(userID, threadID, (error) => {
		if (error) return api.sendMessage(`هناك خطأ في اضافتك الى المجموعه: ${error}`, event.threadID, event.messageID);
		api.sendMessage("تم إضافتك إلى مجموعة البوت ✅\nتحقق من طلبات المراسلة ✅!", event.threadID, event.messageID);
	});
};