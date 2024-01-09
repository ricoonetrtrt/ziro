const fs = require("fs");
const axios = require("axios")
module.exports.config = {
	name: "صورالمجموعة",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
	description: "غير صورة المجموعة الخاصة بك",
	commandCategory: "Box",
	usages: "صورالمجموعة",
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async ({ api, event }) => {
	if (event.type !== "message_reply") return api.sendMessage("❌ عليك الرد على صورة", event.threadID, event.messageID);
	if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("❌ عليك الرد على صورة", event.threadID, event.messageID);
	if (event.messageReply.attachments.length > 1) return api.sendMessage("❌ الرجاء الرد على صورة واحدة فقط!", event.threadID, event.messageID);
	var abc = event.messageReply.attachments[0].url
	let pathImg = __dirname + '/cache/loz.png';
    let getdata = (await axios.get(`${abc}`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(pathImg, Buffer.from(getdata, 'utf-8'));
    return api.changeGroupImage(fs.createReadStream(__dirname + '/cache/loz.png'), event.threadID, () => fs.unlinkSync(pathImg), event.messageID);
}