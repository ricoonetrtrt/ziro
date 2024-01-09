module.exports.config = {
	name: "سرقة",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
	description: "thief",
	commandCategory: "economy",
	usages: "send message",
	cooldowns: 5
};

module.exports.run = async function({ api, event, Users, Currencies }) {
	var alluser = global.data.allUserID
    let victim = alluser[Math.floor(Math.random() * alluser.length)];
    let nameVictim = (await Users.getData(victim)).name
    if (victim == api.getCurrentUserID() && event.senderID == victim) return api.sendMessage('اسف, لا يمكنك السرقة من هذا الشخص. ارجوك حاول مجددا.', event.threadID, event.messageID);
    var route = Math.floor(Math.random() * 2);
    if (route > 1 || route == 0) {
    const moneydb = (await Currencies.getData(victim)).money;
       var money = Math.floor(Math.random() * 1000) + 1;
        if (moneydb <= 0 || moneydb == undefined) return api.sendMessage(`لقد قمت بسرقة ${nameVictim} لسوء حظك هو شخص فقير. لذى لم تحصل على شيء. `, event.threadID, event.messageID);
        else if (moneydb >= money) return api.sendMessage(`لقد قمت لتوك بسرقة ${money}$ من ${nameVictim} `, event.threadID, async () => {
            await Currencies.increaseMoney(victim, parseInt("-"+money))
            await Currencies.increaseMoney(event.senderID, parseInt(money))
        }, event.messageID);
        else if (moneydb < money) return api.sendMessage(`لقد قمت لتوك بسرقة مبلغ ${moneydb} من ${nameVictim} `, event.threadID, async () => {
            await Currencies.increaseMoney(victim, parseInt("-"+money))
            await Currencies.increaseMoney(event.senderID, parseInt(money))
        }, event.messageID);
    }
    else if (route == 1) {
        var name = (await Users.getData(event.senderID)).name
        var moneyuser = (await Currencies.getData(event.senderID)).money
            if (moneyuser <= 0) return api.sendMessage("توقف عن سرقة الاشخاص وقم بالاشتغال ايها الاحمق..", event.threadID, event.messageID);
            else if (moneyuser > 0) return api.sendMessage(` لقد تم القبض عليك وخسرت مبلغ ${moneyuser}$.`, event.threadID, () => api.sendMessage({ body: `مبارك  ${nameVictim}! لقد امسكت  ${name} وحصلت على ${Math.floor(moneyuser / 2)}$ كمكافئة!`, mentions: [{ tag: nameVictim, id: victim }, { tag: name, id: event.senderID }] }, event.threadID, async () => {
                await Currencies.increaseMoney(event.senderID, parseInt("-"+ moneyuser))
                await Currencies.increaseMoney(victim, parseInt(Math.floor(moneyuser / 2))) 
            }), event.messageID);
        
    }
          }