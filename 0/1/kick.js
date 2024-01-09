module.exports.config = {
	name: "طرد",
	version: "1.0.2", 
	hasPermssion: 1,
	credits: "Mirai Team",
	description: "قم بإزالة الشخص الذي تريد إزالته من المجموعة عن طريق وضع علامة عليه أو الرد على رسالته",
	commandCategory: "ادمنية الكروبات", 
	usages: "[tag]", 
	cooldowns: 0,
};

module.exports.languages = {
	"vi": {
		"error": "حدث خطاء !",
		"needPermssion": "شدا سوي دصعدني ادمن اول !",
		"missingTag": "سوي تاك لواحد خلسحله"
	},
	"en": {
		"error": "خطأ! حدث خطأ. الرجاء معاودة المحاولة في وقت لاحق!",
		"needPermssion": "شدا سوي دصعدني ادمن اول !",
		"missingTag": "سوي تاك لواحد خلسحله"
	}
}

module.exports.run = async function({ api, event, getText, Threads }) {
  var mention;
  if (event.type === 'message_reply') {
    mention = [event.messageReply.senderID];
  } else {
    mention = Object.keys(event.mentions);
  }
  try {
    let dataThread = (await Threads.getData(event.threadID)).threadInfo;
    if (!dataThread.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage(getText("needPermssion"), event.threadID, event.messageID);
    if(!mention[0]) return api.sendMessage(getText("missingTag"), event.threadID, event.messageID);
    if (dataThread.adminIDs.some(item => item.id == event.senderID)) {
      for (const o in mention) {
        setTimeout(() => {
          api.removeUserFromGroup(mention[o],event.threadID) 
        },3000)
      }
    }
  } catch { return api.sendMessage(getText("error"),event.threadID) }
}
