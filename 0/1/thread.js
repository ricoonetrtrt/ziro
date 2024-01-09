module.exports.config = {
	name: "موضوع",
	version: "0.0.3",
	hasPermssion: 2,
	credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
	description: "حظر أو فك حظر مجموعة",
	commandCategory: "النظام",
	usages: "[رفع الحظر/حظر/بحث] [المعرف أو النص]",
	cooldowns: 5
};

module.exports.handleReaction = async ({ event, api, Threads, handleReaction }) => {
	if (parseInt(event.userID) !== parseInt(handleReaction.author)) return;
	switch (handleReaction.type) {
		case "ban": {
			const data = (await Threads.getData(handleReaction.target)).data || {};
			data.banned = 1;
			await Threads.setData(handleReaction.target, { data });
			global.data.threadBanned.set(parseInt(handleReaction.target), 1);
			api.sendMessage(`[${handleReaction.target}] تم التفعيل بنجاح!`, event.threadID, () => api.unsendMessage(handleReaction.messageID));
			break;
		}
		case "unban": {
			const data = (await Threads.getData(handleReaction.target)).data || {};
			data.banned = 0;
			await Threads.setData(handleReaction.target, { data });
			global.data.threadBanned.delete(parseInt(handleReaction.target), 1);
			api.sendMessage(`[${handleReaction.target}] تم فك الحظر بنجاح`, event.threadID, () => api.unsendMessage(handleReaction.messageID));
			break;
		}
		default:
			break;
	}
}

module.exports.run = async ({ event, api, args, Threads }) => {
    let content = args.slice(1, args.length);
	switch (args[0]) {
		case "ban": {
			if (content.length == 0) return api.sendMessage("يجب عليك إدخال معرف الموضوع الذي تريد حظره!", event.threadID);
			for (let idThread of content) {
				idThread = parseInt(idThread);
				if (isNaN(idThread)) return api.sendMessage(`[${idThread}] ليس معرفًا صحيحًا!`, event.threadID);
				let dataThread = (await Threads.getData(idThread.toString()));
				if (!dataThread) return api.sendMessage(`[${idThread}] الموضوع غير موجود في قاعدة البيانات!`, event.threadID);
				if (dataThread.banned) return api.sendMessage(`[${idThread}] تم حظره بالفعل`, event.threadID);
				return api.sendMessage(`[${idThread}] هل تريد حظر هذا الموضوع؟\n\nيرجى الرد على هذه الرسالة للحظر!`, event.threadID, (error, info) => {
					global.client.handleReaction.push({
						name: this.config.name,
						messageID: info.messageID,
						author: event.senderID,
						type: "ban",
						target: idThread
					});
				})
			}
			break;
		}
		case "unban": {
			if (content.length == 0) return api.sendMessage("يجب عليك إدخال معرف الموضوع الذي تريد رفع الحظر عنه!", event.threadID);
			for (let idThread of content) {
				idThread = parseInt(idThread);
				if (isNaN(idThread)) return api.sendMessage(`[${idThread}] ليس معرفًا صحيحًا!`, event.threadID);
				let dataThread = (await Threads.getData(idThread)).data;
				if (!dataThread) return api.sendMessage(`[${idThread}] الموضوع غير موجود في قاعدة البيانات!`, event.threadID);
				if (dataThread.banned != 1) return api.sendMessage(`[${idThread}] لم يتم حظره مسبقًا`, event.threadID);
				return api.sendMessage(`[${idThread}] هل تريد رفع الحظر عن هذا الموضوع؟\n\nيرجى الرد على هذه الرسالة لرفع الحظر!`, event.threadID, (error, info) => {
					global.client.handleReaction.push({
						name: this.config.name,
						messageID: info.messageID,
						author: event.senderID,
						type: "unban",
						target: idThread
					});
				})
			}
			break;
		}
		case "search": {
			let contentJoin = content.join(" ");
			let getThreads =  (await Threads.getAll(['threadID', 'name'])).filter(item => !!item.name);
			let matchThreads = [], a = '', b = 0;
			getThreads.forEach(i => {
				if (i.name.toLowerCase().includes(contentJoin.toLowerCase())) {
					matchThreads.push({
						name: i.name,
						id: i.threadID
					});
				}
			});
			matchThreads.forEach(i => a += `\n${b += 1}. ${i.name} - ${i.id}`);
			(matchThreads.length > 0) ? api.sendMessage(`إليك الموضوعات المطابقة: \n${a}`, event.threadID) : api.sendMessage("لم يتم العثور على نتائج بناءً على بحثك!", event.threadID);
			break;
		}
		default: {
			return global.utils.throwError(this.config.name, event.threadID, event.messageID)
		}
	}
}