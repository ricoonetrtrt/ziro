module.exports.config = {
  name: "hi",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
  description: "hi send sticker",
  commandCategory: "QTV BOX",
  usages: "[text]",
  cooldowns: 5
}

module.exports.handleEvent = async ({ event, api, Users }) => {
  let KEY = [ 
    let KEY = [ 
    "مرحبا",
    "أهلا",
    "هاي",
    "مرحباً بك",
    "مرحبًا",
    "هايي",
    "السلام عليكم",
    "مهلا",
    "هيه",
    "هيي",
    "يا هلا",
    "أهلين",
    "هلا والله",
    "هلا",
    "مرحبتين",
    "صباح الخير",
    "مساء الخير",
    "كيف الحال",
    "كيفك",
    "كيفكم",
    "كيف حالكم"
  ];
  ];
  let thread = global.data.threadData.get(event.threadID) || {};
  if (typeof thread["hi"] == "undefined", thread["hi"] == false) return
  else {
  if (KEY.includes(event.body.toLowerCase()) !== false) {
    let data = [
      "184002922217363", "184023658881956", "184003212217334", "184002655550723", "184003438883978", "2379545595403511", "1926234657415528", "4046655705381617", "4046877352026119", "4046884992025355", "4070816262965561"
    ];
    let sticker = data[Math.floor(Math.random() * data.length)];
let juswa = [let juswa = [
  "هل تناولت طعامك؟", "ماذا تفعل الآن؟", "كيف حالك يا سينباي؟", "أنا بوت دردشة سُعِدت بلقائك", "أقوم بتحديث أوامري، ماذا تفعل أنت؟", "هل يمكنك التفاعل معي باستخدام أمر شات؟", "أنت جميل/جميلة بنيبيني/جينو", "أحبك مواه؛ قبلة على جبينك", "هل أنت متضايق؟ تحدث إلى المدير الخاص بي", "كيف حالك يا عزيزي؟", "تناول بعض الحلويات", "هل أنت بخير؟", "كن بأمان", ""
];];
 let juswa1 = juswa[Math.floor(Math.random() * juswa.length)];

    let moment = require("moment-timezone");
    let hours = moment.tz('Casablanca/Africa').format('HHmm');
    let session = (
    hours > 0001 && hours <= 400 ?    hours > 0001 && hours <= 400 ? "صباح مشرق" : 
    hours > 401 && hours <= 700 ? "صباح" :
    hours > 701 && hours <= 1000 ? "صباح" :
    hours > 1001 && hours <= 1100 ? "صباح" : 
    hours > 1100 && hours <= 1500 ? "ظهيرة" : 
    hours > 1501 && hours <= 1800 ? "مساء" : 
    hours > 1801 && hours <= 2100 ? "مساء" : 
    hours > 2101 && hours <= 2400 ? "ليل متأخر ونوم هانئ" : 
    "خطأ");
    let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
    let msg = {body: `مرحبًا ${name}، أتمنى لك ${session} سعيد يا سينباي، ${juswa1}`, mentions}    api.sendMessage(msg, event.threadID, (e, info) => {
      setTimeout(() => {
        api.sendMessage({sticker: sticker}, event.threadID);
      }, 100)
    }, event.messageID)
  }
  }
}

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
		"successText": `${this.config.name} thành công`,
	},
	"en": {
		"on": "on",
		"off": "off",
		"successText": `${this.config.name} success!`,
	}
}

module.exports.run = async ({ event, api, Threads, getText }) => {
  let { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
	if (typeof data["hi"] == "undefined" || data["hi"] == true) data["hi"] = false;
	else data["hi"] = true;
	await Threads.setData(threadID, {
		data
	});
	global.data.threadData.set(threadID, data);
	return api.sendMessage(`${(data["hi"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
      }