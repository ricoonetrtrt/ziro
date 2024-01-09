module.exports.config = {
	name: "مساء",
  version: "7.3.1",
	hasPermssion: 0,
	credits: "𝐊𝐈𝐓𝐄 凧", 
	description: "Just Respond",
	commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = async function({ api, event, client, Users, __GLOBAL }) {
	var { threadID, messageID } = event;
	var name = await Users.getNameUser(event.senderID);
	if (event.body.indexOf("good eve")==0 || event.body.indexOf("Good eve")==0 || event.body.indexOf("good Eve")==0 || event.body.indexOf("Good Eve")==0 || event.body.indexOf("eve")==0 || event.body.indexOf("Eve")==0 || event.body.indexOf("مساء الخير")==0 || event.body.indexOf("مساؤو")==0 || event.body.indexOf("مساء")==0 || event.body.indexOf("عشية")==0 ) { 
		var msg = {
				body: `مساء الخير عزيزي ${name} ❤️`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("❤️", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
