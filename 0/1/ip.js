module.exports.config = {
	name: "أيبي",	
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙭",
	description: "عرض معلومات الأي بي الخاصة بك أو أي بي آخر", 
	commandCategory: "أخرى",
	usages: "",
	cooldowns: 5, 
	dependencies: "",
};

module.exports.run = async function({ api, args, event, __GLOBAL }) {
  const timeStart = Date.now();
  
    const axios = require("axios");
  if (!args[0]) {api.sendMessage("الرجاء إدخال الأي بي الذي تريد التحقق منه",event.threadID, event.messageID);}
  else {
var infoip = (await axios.get(`http://ip-api.com/json/${args.join(' ')}?fields=66846719`)).data;
       if (infoip.status == 'fail')
         {api.sendMessage(`خطأ! حدث خطأ. الرجاء المحاولة لاحقا: ${infoip.message}`, event.threadID, event.messageID)}
          else {
 api.sendMessage({body:`======${(Date.now()) - timeStart}ms=====
🗺️القارة: ${infoip.continent}
🏳️الأمة: ${infoip.country}
🎊الرمز الدولي: ${infoip.countryCode}
🕋المنطقة: ${infoip.region}
⛱️المنطقة/الولاية: ${infoip.regionName}
🏙️المدينة: ${infoip.city}
🛣️المنطقة: ${infoip.district}
📮رمز ZIP: ${infoip.zip}
🧭خط العرض: ${infoip.lat}
🧭خط الطول: ${infoip.lon}
⏱️المنطقة الزمنية: ${infoip.timezone}
👨‍✈️اسم المنظمة: ${infoip.org}
💵وحدة العملة: ${infoip.currency}
`,location: {
				latitude: infoip.lat,
				longitude: infoip.lon,
				current: true
			}}
,event.threadID, event.messageID);}
        }
    
                  }