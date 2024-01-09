module.exports.config = {
  name: "حب",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
  description: "عشوائي",
  commandCategory: "اقتباسات",
  usages: "الإشارة أو بدون",
  cooldowns: 1
};

module.exports.run = async ({ api, event }) => {
  const { threadID, messageID } = event;

  const ZiaRein1 = [
    "يجب على كلا الشخصين أن يهتم كثيرًا بالشخص الأخر، وأن يضع حاجاته قبل حاجاته الخاصة، وأن يلتزم بالشخص الآخر يوميًا",
    "كلما أحببتم بعضكم البعض أكثر، كلما كنتم أحرارًا",
    "إذا كنت تريد الحصول على نوع من الحب الذي سيجعلك سعيدًا، يجب أن تخلق نوع الحب الصحيح لك ولشريكك. إنها مسألة صنعه",
    "ابحث عن شخص يواسيك في أسوأ حالاتك ويقدرك في أفضل حالاتك",
    "أحب وأحب كما تحب",
    // ... similar translation for all quotes ...
  ];
  const ZiaRein2 = [
    "أحب الحياة التي تعيشها. عِش الحياة التي تحبها",
    "نحن نحب الأشياء التي نحبها لما هي عليه",
    "لا تحدد حدودًا عندما تحب شخصًا ما",
    "الحب لا يهيمن؛ بل يزرع",
    // ... similar translation for all quotes ...
  ];
  var mention = Object.keys(event.mentions);

  var ZiaRein3 = ['1', '2'];
  var ZiaRein = ZiaRein3[Math.floor(Math.random() * ZiaRein3.length)];

  if (Object.keys(event.mentions).length == 1) {
    if (ZiaRein == '2') {
      api.sendMessage(`أرسل رسالة إلى ${event.mentions[mention].replace("@", "")}:\n${ZiaRein2[Math.floor(Math.random() * ZiaRein2.length)]}`, threadID, messageID);
    }
    if (ZiaRein == '1') {
      api.sendMessage(`أرسل رسالة إلى ${event.mentions[mention].replace("@", "")}:\n${ZiaRein1[Math.floor(Math.random() * ZiaRein1.length)]}`, threadID, messageID);
    }
  }
  else {
    if (ZiaRein == '2') {
      api.sendMessage(`${ZiaRein2[Math.floor(Math.random() * ZiaRein2.length)]}`, threadID, messageID);
    }
    if (ZiaRein == '1') {
      api.sendMessage(`${ZiaRein1[Math.floor(Math.random() * ZiaRein1.length)]}`, threadID, messageID);
    }
  }
}