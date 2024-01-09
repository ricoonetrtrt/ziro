module.exports.config = {
  name: "اعادة-تشغيل",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝐊𝐈𝐓𝐄 凧",
  description: "AUTO RESTART",
  commandCategory: "System",
  cooldowns: 5,
};

module.exports.handleEvent = async function ({ api, event, args, Users, Threads }) {
  const moment = require("moment-timezone");
  var timeNow = moment.tz("Asia/Dhaka").format("HH:mm:ss");
  var idad = global.config.ADMINBOT;
  console.log(timeNow);
  var seconds = moment.tz("Asia/Dhaka").format("ss");

  var restartHours = [
    "00:00",
    "00:30",  // إضافة نصف ساعة
    "01:00",
    "01:30",  // إضافة نصف ساعة
    "02:00",
    "02:30",  // إضافة نصف ساعة
    "03:00",
    "03:30",  // إضافة نصف ساعة
    "04:00",
    "04:30",  // إضافة نصف ساعة
    "05:00",
    "05:30",  // إضافة نصف ساعة
    "06:00",
    "06:30",  // إضافة نصف ساعة
    "07:00",
    "07:30",  // إضافة نصف ساعة
    "08:00",
    "08:30",  // إضافة نصف ساعة
    "09:00",
    "09:30",  // إضافة نصف ساعة
    "10:00",
    "10:30",  // إضافة نصف ساعة
    "11:00",
    "11:30",  // إضافة نصف ساعة
    "12:00",
    "12:30",  // إضافة نصف ساعة
    "13:00",
    "13:30",  // إضافة نصف ساعة
    "14:00",
    "14:30",  // إضافة نصف ساعة
    "15:00",
    "15:30",  // إضافة نصف ساعة
    "16:00",
    "16:30",  // إضافة نصف ساعة
    "17:00",
    "17:30",  // إضافة نصف ساعة
    "18:00",
    "18:30",  // إضافة نصف ساعة
    "19:00",
    "19:30",  // إضافة نصف ساعة
    "20:00",
    "20:30",  // إضافة نصف ساعة
    "21:00",
    "21:30",  // إضافة نصف ساعة
    "22:00",
    "22:30",  // إضافة نصف ساعة
    "23:00",
    "23:30",  // إضافة نصف ساعة
  ];

  if (restartHours.includes(timeNow) && seconds < 6) {
    for (let ad of idad) {
      setTimeout(() => api.sendMessage(`⚡️الساعة الان: ${timeNow}\nسيتم اعادة تشغيلي!!!`, ad, () => process.exit(1)), 1000);
    }
  }
};

module.exports.run = async ({ api, event, args }) => {
  const moment = require("moment-timezone");
  var timeNow = moment.tz("Asia/Dhaka").format("HH:mm:ss");
  api.sendMessage(`${timeNow}`, event.threadID);
};
