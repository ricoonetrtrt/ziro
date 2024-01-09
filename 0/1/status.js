module.exports.config = {
  name: "الحالة",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
  description: "تسجيل الدخول",
  commandCategory: "نظام",
  usages: "",
  cooldowns: 3,
  dependencies: {}
};

module.exports.run = async function ({ api, event, Threads, getText }) {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, senderID } = event;
  // إذا كان مرسل الرسالة هو البوت نفسه، لا تقم بأي شيء.

  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data;
  // استخرج البيانات اللازمة من بيانات الموضوع.
  var rankup = data.rankup;
  var resend = data.resend;
  var log = data.log;
  var tagadmin = data.tagadmin;
  var guard = data.guard;
  var antiout = data.antiout;
  
  // قم بتعيين القيم الافتراضية إذا لم يتم تحديدها في البيانات.
  log = log ?? `true`;
  rankup = rankup ?? `false`;
  resend = resend ?? `false`;
  tagadmin = tagadmin ?? `true`;
  guard = guard ?? `true`;
  antiout = antiout ?? `true`;
  
  return api.sendMessage(`ᅠᅠ☣️ حالة المجموعة ☣️\n\n🍄────•🦋•────🍄\n❯ 🍉 السجل: ${log}\n❯ 🍇 الترقية التلقائية: ${rankup}\n❯ 🍓 إعادة الإرسال: ${resend}\n❯ 🥕 إشارة المدير: ${tagadmin}\n❯ 🍑 الحماية من السرقة: ${guard}\n❯ 🍒 الحماية من الخروج: ${antiout}\n🍄────•🦋•────🍄`, threadID, messageID);
}