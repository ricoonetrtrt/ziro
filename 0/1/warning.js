module.exports.config = {
	name: "تحذير",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
	description: "تنبيه المستخدم!",
	commandCategory: "النظام",
	usages: "[فعل جسدي/الكل]",
	cooldowns: 5,
	dependencies: {
		"fs-extra": "",
		"path": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];

    const path = resolve(__dirname, "cache", "listwarning.json");

	if (!existsSync(path)) writeFileSync(path, JSON.stringify({}), 'utf-8');
	return;
}

module.exports.run = async function ({ event, api, args, permssion, Users }) {
    const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const { threadID, messageID, mentions, senderID } = event;
    const mention = Object.keys(mentions);

    const path = resolve(__dirname, "cache", "listwarning.json");
    const dataFile = readFileSync(path, "utf-8");
    var warningData = JSON.parse(dataFile);

    switch (args[0]) {
        case "all": {
            if (permssion != 2) return api.sendMessage(`ليست لديك القدرة لاستخدام هذا الامر!`, threadID, messageID);
            var listUser = "";

            for (const IDUser in warningData) {
                const name = global.data.userName.get(IDUser) || await Users.getNameUser(IDUser);
                listUser += `- ${name}: بقي له ${warningData[IDUser].warningLeft} تحذيرات\n`;
            }
            if (listUser.length == 0) listUser = "حاليا لا مستخدمين محظورون";
            return api.sendMessage(listUser, threadID, messageID);
        }
        case "reset": {
            writeFileSync(path, JSON.stringify({}), 'utf-8');
            return api.sendMessage("تمت اعادة ضبط قائمة التحذيرات!", threadID, messageID);
        }
        default: {
            if (permssion != 2) {
                const data = warningData[args[0] || mention[0] || senderID];
                console.log(data);
                const name = global.data.userName.get(args[0] || mention[0] || senderID) || await Users.getNameUser(args[0] || mention[0] || senderID);
                if (!data) return api.sendMessage(`أقدم لكم ${name} بدون اي تحذيرات !`, threadID, messageID);
                else {
                    var reason = "";
                    for (const n of data.warningReason) reason += `- ${n}\n`;
                    return api.sendMessage(`أقدم ${name} التحذيرات المتبقية ${data.warningLeft} :\n\n${reason}`, threadID, messageID);
                }
            }
            else {
                try {
                    if (event.type != "message_reply") return api.sendMessage("لم ترد على الرسالة اللتي تريد عمل تحذير لها.", threadID, messageID);
                    if (event.messageReply.senderID == api.getCurrentUserID()) return api.sendMessage('لا يمكنك الابلاغ عني هل انت مجنون ؟.', threadID, messageID);
                    if (args.length == 0) return api.sendMessage("لم تدخل سبب التحذير!", threadID, messageID);
                    var data = warningData[event.messageReply.senderID] || { "warningLeft": 3, "warningReason": [], "banned": false };
                    if (data.banned) return api.sendMessage("لقد تم حظر الحساب بسبب وصوله ل3 تحذيرات!", threadID, messageID);
                    const name = global.data.userName.get(event.messageReply.senderID) || await Users.getNameUser(event.messageReply.senderID);
                    data.warningLeft -= 1;
                    data.warningReason.push(args.join(" "));
                    if (data.warningLeft == 0) data.banned = true;
                    warningData[event.messageReply.senderID] = data;
                    writeFileSync(path, JSON.stringify(warningData, null, 4), "utf-8");
                    if (data.banned) {
                        const data = (await Users.getData(event.messageReply.senderID)).data || {};
                        data.banned = 1;
                        await Users.setData(event.messageReply.senderID, { data });
                        global.data.userBanned.set(parseInt(event.messageReply.senderID), 1);
                    }
                    return api.sendMessage(`تم تحذير ${name} بسبب: ${args.join(" ")}, ${(data.banned) ? `لأنه تم تحذيري 3 مرات, تم حظر الحساب أعلاه` : `الحساب اعلاه يتبقى له ${data.warningLeft} تحذيرات `}`, threadID, messageID);
                } catch (e) { return console.log(e) };
            }
        }
    }
}
