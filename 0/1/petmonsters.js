module.exports.config = {
    name: "وحوش",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
    description: "الدببة الشمسية وحدها معًا :))",
    commandCategory: "لعبة",
    usages: "-r/-s/-l/-p",
    cooldowns: 0,
    dependencies: {
        "request":"",
        "fs-extra":""
    }
};
/*==================== رسالة ======================*/
module.exports.run = ({ event, api, args, client, utils }) => {
    if (!args[0]) {
        api.sendMessage(`الرجاء إدخال علامات: -r/-s/-l/-p`, event.threadID);
    } else {
        switch(args[0]) {
            case "-r": {
            return api.sendMessage(
                "نجاح التسجيل !!!\nأخي أصبح رسميًا مدرب"
            , event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "-r"
                });
            }, event.messageID);
        }
        case "-s": {
            return api.sendMessage(
                "==== متجر PETMONSTERS ====\n1.طعام\n2.أسلحة\n3.درع\n4.حيوان"
            , event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "-s"
                });
            }, event.messageID);
        }
        case "-l": {
            return api.sendMessage(
                "1.حيوان نظام النار\n2.حيوان نظام الماء\n3.حيوان نظام الأرض\n4.نظام حيوان\n5.حيوان نظام الضوء\n6.نظام حيوان الدش"
            , event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "-l"
                });
            }, event.messageID);
        }
        case "-p": {
            return api.sendMessage(
                "قريبا..."
            , event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "-p"
                });
            }, event.messageID);
        }
            default:
            return utils.throwError("petmonsters", event.threadID, event.messageID);
        }
    }
};
/*====================== الرد =========================*/
module.exports.handleReply = async function({ api, event, handleReply, client }) {
  switch(handleReply.type) {
    case "-s":
      switch(event.body) {
        case "1":
        return api.sendMessage(
                "===[طعام]===\n1.سمك (100$)\nأسقط <3 للشراء!!!\n2.بلد (100$)\nأسقط 👍 للشراء!!!\n3.فاكهة (100$)\nأسقط 😢 للشراء!!!"
            , event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "طعام"
                });
            }, event.messageID);
        case "2":
          return api.sendMessage(
                "===[أسلحة]===\n1.سيف\n2.بنادق\n3.درع"
            , event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "أسلحة"
                });
            }, event.messageID);
          case "3":
          return api.sendMessage(
                "===[درع]===\n1.درع جلدي\n2.قريبًا..."
            , event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "درع"
                });
            }, event.messageID);
          case "4":
          return api.sendMessage("قريبًا...",  event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "حيوان"
                });
            }, event.messageID);
                  }
      case "-l":
      switch(event.body) {
        case "1":
        return api.sendMessage("الإسم: كلب ثلاثة قمم\nالنسل: نار\nالدم: 120\nالهجوم: 120\nالمهارة الخاصة: يتنفس النار", event.threadID); break;
        case "2":
          return api.sendMessage("الإسم: تمساح ذو ثلاث ذيول\nالنسل: ماء\nالدم: 120\nالهجوم: 120\nالمهارة الخاصة: يبصق الماء", event.threadID); break;
          case "3":
          return api.sendMessage("الإسم: كلب دب\nالنسل: تراب\nالدم: 120\nالهجوم: 120\nالمهارة الخاصة: زلزال", event.threadID); break;
          case "4":
          return api.sendMessage("الإسم: ثعبان عملاق\nالنسل: عشب\nالدم: 120\nالهجوم: 120\nالمهارة الخاصة: ربط الضحية", event.threadID); break;
          case "5":
          return api.sendMessage("الإسم: تنين ذو ثلاث رؤوس\nالنسل: ضوء\nالدم: 120\nالهجوم: 120\nالمهارة الخاصة: يظهر شئ ابيض بياض", event.threadID); break;
          case "6":
          return api.sendMessage("الإسم: شيطان\nالنوع: ظلام\nالدم: 120\nالهجوم: 120\nالمهارة الخاصة: يغطي الظلام, يعمي أعين المنافس", event.threadID); break;
      }
  }
}