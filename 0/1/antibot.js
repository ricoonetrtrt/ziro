module.exports.config = {
  name: "حظر-البوتات",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐊𝐈𝐓𝐄 凧",
  description: "ban bot",
  commandCategory: "admin",
  cooldowns: 0
};
module.exports.handleEvent = async ({
	event: o,
	api: t,
	Users: n
}) => {
	var {
		threadID: e,
		messageID: a,
		body: b,
		senderID: s,
		reason: d
	} = o;
	const i = require("moment-timezone").tz("Asia/Dhaka").format("HH:MM:ss L");
	if (s == t.getCurrentUserID()) return;
	let c = await n.getNameUser(o.senderID);
	var h = {
		body: `${c}\nلقد تم الكشف على انك بوت لذى سيتم حظرك تفاديا للسبام`
	};
    //Add curse words without capital letters
	["Other Bot"].forEach((a => { 
		
        const s = o.senderID;
    let haha = o.body;
	if (haha.includes("your keyboard level has reached level") || haha.includes("Command not found") || haha.includes("The command you used") || haha.includes("Uy may lumipad") || haha.includes("Unsend this message") || haha.includes("You are unable to use bot") || haha.includes("»» NOTICE «« Update user nicknames") || haha.includes("just removed 1 Attachments") || haha.includes("message removedcontent") || haha.includes("The current preset is") || haha.includes("Here Is My Prefix") || haha.includes("just removed 1 attachment.") || haha.includes("Unable to re-add members")) {
			modules = "[ BOT BAN ]", console.log(c, modules, a);
			const o = n .getData(s).data || {};
			n.setData(s, {
				data: o
			}), o.banned = 1, o.reason = a || null, o.dateAdded = i, global.data.userBanned.set(s, {
				reason: o.reason,
				dateAdded: o.dateAdded
			}), t.sendMessage(h, e, (() => {
				const o = global.config.ADMINBOT;
				var n = o;
				for (var n of o) t.sendMessage(`الاسم: ${c}\nالبوت UID: ${s}\n\nتم استشعار هذا المستخدم على انه بوت لذى سيتم حظره لتفادي السبام`, n)
			}))
		} 
	})) 
}, module.exports.run = async ({
	event: o,
	api: t
}) => t.sendMessage("يستخدم هذا الأمر لاكتشاف برامج الروبوت الأخرى وحظرها على الفور لتجنب السبام ", o.threadID);