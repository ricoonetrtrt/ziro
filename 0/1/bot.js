const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Mod by John Lester",
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Dhaka").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["تحتاج شيئا عزيزي ؟ " , "اتركني لست في مزاج جيد " , "هل تريد ان تعترف لي بشيء 🤭" , "اشتقت لك 🥰" , "انا في خدمتك" , "لن اجيبك لان ريكو يغار 🤭❤️" , "هففف ماذا مجددا " , "سيستا سيستا سيستا ارحموني🤬" , "سيستا الحلوة فخدمتك" , " انا تحت امرك يا سيد" , "لن تتعبو من مناداتي ؟ 😠👊🏻","ريكو اطلب منه ان يسكت 😭 انه مزعج","لا تكلمني ريكو يغار"];  var rand = tl[Math.floor(Math.random() * tl.length)]

    if ((event.body.toLowerCase() == "احبك") || (event.body.toLowerCase() == "أحبك")) {
     return api.sendMessage("انا لريكو فقط 👻🔪", threadID)
   };

    if ((event.body.toLowerCase() == "❤️") || (event.body.toLowerCase() == "💗")) {
     return api.sendMessage("هل انا حبيبتك لترسل لي هذا ؟", threadID);
   };

    if ((event.body.toLowerCase() == "👍") || (event.body.toLowerCase() == "👍🏻")) {
     return api.sendMessage("انت تعرف اين يضع الناس لايك", threadID);
   };

   if ((event.body.toLowerCase() == "اكرهك") || (event.body.toLowerCase() == "لا احبك")) {
     return api.sendMessage("حطمت قلبي 💔", threadID);
   };

   if ((event.body.toLowerCase() == "hi") || (event.body.toLowerCase() == "hello") ||(event.body.toLowerCase() == "hlw") || (event.body.toLowerCase() == "helo")) {
     return api.sendMessage("Hello, Hi, Bye bye. Ye sab ke alawa kuch bolna nhi ata Kya tujhe", threadID);
   };

   if ((event.body.toLowerCase() == "كسمك") || (event.body.toLowerCase() == "نكمك")) {
     return api.sendMessage("يبدو ان هناك بعض الاغبياء اللذين يظنون ان شتم بوت هو عمل ذكي 🤔 ", threadID);
   };

   if ((event.body.toLowerCase() == "بوت") || (event.body.toLowerCase() == "يا بوت")) {
     return api.sendMessage(" نادني سيستا 😑", threadID);
   };

   if ((event.body.toLowerCase() == "صباحو") || (event.body.toLowerCase() == "صباح الخير")) {
     return api.sendMessage("صباح النور عزيزي لتحضى بيوم جيد ❤️", threadID);
   };

   if ((event.body.toLowerCase() == "تصبحون على خير") || (event.body.toLowerCase() == "ليلة سعيدة")) {
     return api.sendMessage("ليلة سعيدة لك ايضا عزيزي ❤️", threadID);
   };

   if ((event.body.toLowerCase() == "ريكو ") || (event.body.toLowerCase() == "ريكو") || (event.body.toLowerCase() == "Ri Co") || (event.body.toLowerCase() == "rico")) {
     return api.sendMessage( "عزيزي ريكو مشغول الان  😘",threadID);


   };

   if ((event.body.toLowerCase() == "المالك") || (event.body.toLowerCase() == "المطور")) {
     return api.sendMessage("عمي وعمكم ريكو وكذا.. شتريد منو ؟", threadID);
   };

   if ((event.body.toLowerCase() == "@Ŕi Čo") || (event.body.toLowerCase() == "ريكووو")) {
     return api.sendMessage("توقف عن ازعاج مطوري  ❤️ . انه يحبني ويعتني بي كل يوم. اي بوت سيتمنى مطورا مثله لذى اتركه فقد يكون مشغولا 🥺💔.", threadID);
   };

  if ((event.body.toLowerCase() == "ادمن") || (event.body.toLowerCase() == "صند ادمن")) {
     return api.sendMessage("لن تحصل عليه 😒", threadID);
   };

   if ((event.body.toLowerCase() == "اسكتي") || (event.body.toLowerCase() == "توقفي")) {
     return api.sendMessage("ومن انت حتى استمع لك ؟ 🧐.", threadID);
   };

   if ((event.body.toLowerCase() == "سيستا") || (event.body.toLowerCase() == "هينا")) {
     return api.sendMessage("اتذكر ان المطور اخبرني ان هذا الاسم مميز عنده, اوبس ليس علي ذكر هذا 😳. سيقتلني المطور. انا ذاهبة 😖", threadID);
   };

   if ((event.body.toLowerCase() == "قحبة") || (event.body.toLowerCase() == "بوت قحبة") || (event.body.toLowerCase() == "يا قحبة") || (event.body.toLowerCase() == "القحبة")) {
     return api.sendMessage("توقف عن منادات الناس باسم امك 😅", threadID);
   };

   if ((event.body.toLowerCase() == "اوك") || (event.body.toLowerCase() == "اك") || (event.body.toLowerCase() == "ok")) {
     return api.sendMessage("اطلق من يقول اوك", threadID);
   };

   if ((event.body.toLowerCase() == "جزائري") || (event.body.toLowerCase() == "🇩🇿") || (event.body.toLowerCase() == "الجزائر") || (event.body.toLowerCase() == "دزايري")) {
     return api.sendMessage("بلد المليون ونصف مليون شهيد 💙🇩🇿🇵🇸", threadID);
   };

   if ((event.body.toLowerCase() == "زبي") || (event.body.toLowerCase() == "زب") || (event.body.toLowerCase() == "ازبي") || (event.body.toLowerCase() == "يا زبي")) {
     return api.sendMessage(" اصبحت الفتيات تتفاخر بذلك العضو ايضا ؟. :))))", threadID);
   };

  if ((event.body.toLowerCase() == "مح") || (event.body.toLowerCase() == "محات")) {
    return api.sendMessage("️️مح على ريكو وحدو 💃🫦", threadID);
  };

  if ((event.body.toLowerCase() == "ملل") || (event.body.toLowerCase() == "الفيد")) {
    return api.sendMessage("️كول خرا", threadID);
  };

  if ((event.body.toLowerCase() == "كرنج") || (event.body.toLowerCase() == "مجموعة كرنجية")) {
    return api.sendMessage("️صحا النوم", threadID);
  };

  if ((event.body.toLowerCase() == "جميل") || (event.body.toLowerCase() == "جميلة")) {
    return api.sendMessage("️انت الاجمل", threadID);
  };

  if ((event.body.toLowerCase() == "بانكاي") || (event.body.toLowerCase() == "بنكاي")) {
    return api.sendMessage("️كاتين كيوكتسو كارمتسو شينجو", threadID);
  };

  if ((event.body.toLowerCase() == "الحياة حلوة") || (event.body.toLowerCase() == "الحياة حلوه")) {
    return api.sendMessage("️لأنها تعاكسنا دوما", threadID);
  };


  if ((event.body.toLowerCase() == "كيفك") || (event.body.toLowerCase() == "كيفكم")) {
      return api.sendMessage("️تمام الحمد الله وانت (ي) 😊", threadID);
    };

  if ((event.body.toLowerCase() == "هاي") || (event.body.toLowerCase() == "هااي")) {
      return api.sendMessage("️وعليكم الهاي ", threadID);
    };

  if ((event.body.toLowerCase() == "جيد") || (event.body.toLowerCase() == "شكرا") || (event.body.toLowerCase() == "شكرا لك") || (event.body.toLowerCase() == "شكرا لك سيستا")) {
     return api.sendMessage("️انا في الخدمة فقط اطلب عزيزي.", threadID);
   };

   if ((event.body.toLowerCase() == "😡") || (event.body.toLowerCase() == "😤") || (event.body.toLowerCase() == "😠") || (event.body.toLowerCase() == "🤬") || (event.body.toLowerCase() == "😾")) {
     return api.sendMessage("️🥺 لماذا انت غاضب انا هنا كي افرج عنك😘", threadID);
   };

   if ((event.body.toLowerCase() == "همم") || (event.body.toLowerCase() == "هممم") || (event.body.toLowerCase() == "همممم") || (event.body.toLowerCase() == "هممممم")) {
     return api.sendMessage("️ تحتاج ان اساعدك في شيء ؟", threadID);
   };

   if ((event.body.toLowerCase() == "ما اسمك") || (event.body.toLowerCase() == "اسمك") || (event.body.toLowerCase() == "ما اسمها")) {
     return api.sendMessage("️سيستا تشرفت بمعرفتك.", threadID);
   };

   if ((event.body.toLowerCase() == "سلام") || (event.body.toLowerCase() == "السلام عليكم")) {
     return api.sendMessage("️وعليكم السلام ورحمه الله وبركاته 💙", threadID);
   };

   if ((event.body.toLowerCase() == "صور") || (event.body.toLowerCase() == ".صور")) {
     return api.sendMessage("️اذهب لغوغل يا ابني", threadID);
   };

   if ((event.body.toLowerCase() == "هههه") || (event.body.toLowerCase() == "ههههه")) {
     return api.sendMessage("️'_' هل قلت شيئا مضحكا ؟", threadID);
   };

   if ((event.body.toLowerCase() == "نعم") || (event.body.toLowerCase() == "اجل")) {
     return api.sendMessage("️لا", threadID);
   };

   if ((event.body.toLowerCase() == "🙂") || (event.body.toLowerCase() == "🙃")) {
     return api.sendMessage("️🙃🙂🙃🙂🙃🙂", threadID);
   };

   if ((event.body.toLowerCase() == "😒") || (event.body.toLowerCase() == "🙄")) {
     return api.sendMessage("️ماذا ؟", threadID);
   };

   if ((event.body.toLowerCase() == "لا احد يحبني") || (event.body.toLowerCase() == "انا حزين") || (event.body.toLowerCase() == "انا تعبان")) {
     return api.sendMessage("️ولكنني احبك☺️", threadID);
   };

   if ((event.body.toLowerCase() == "🤦🏻‍♂") || (event.body.toLowerCase() == "🤦🏻‍♀")) {
     return api.sendMessage("هل قمت بشيء خاطئ?😬", threadID);
   };

   if ((event.body.toLowerCase() == "😂") || (event.body.toLowerCase() == "😂😂") || (event.body.toLowerCase() == "😆") || (event.body.toLowerCase() == "🤣🤣🤣") || (event.body.toLowerCase() == "😸") || (event.body.toLowerCase() == "😹")) {
     return api.sendMessage("لا اعلم ما المضحك لكن ساضحك ايضا🤣", threadID);
   };

   if ((event.body.toLowerCase() == "🥰") || (event.body.toLowerCase() == "😍") || (event.body.toLowerCase() == "😻") || (event.body.toLowerCase() == "😘")) {
     return api.sendMessage("لاتفعل ذلك ريكو يغار", threadID);
   };

   if ((event.body.toLowerCase() == "كيف حالك")) {
     return api.sendMessage("بخير اتمنى ان تكون كذلك ايضا ☺️", threadID);
   };

   if ((event.body.toLowerCase() == "هل انتي حزينة ؟") || (event.body.toLowerCase() == "هل هي حزينة ؟")) {
     return api.sendMessage("ولما اكون حزينة والكل يحبني <3", threadID);
   };

   if ((event.body.toLowerCase() == "does the bot love you") || (event.body.toLowerCase() == "does the bot love you")) {
     return api.sendMessage("Yes I love you and everyone so much", threadID);
   };

   if ((event.body.toLowerCase() == "bot goes to sleep") || (event.body.toLowerCase() == "bot goes to sleep")) {
     return api.sendMessage("I'm a bot, you're the one who should go to sleep <3", threadID);
   };

   if ((event.body.toLowerCase() == "has the bot eaten yet") || (event.body.toLowerCase() == "bot an comrade")) {
     return api.sendMessage("I'm full when I see you eat <3", threadID);
   };

   if ((event.body.toLowerCase() == "هل تحبينني ؟") || (event.body.toLowerCase() == "هل سيستا تحبني ؟")) {
     return api.sendMessage("اجل <3", threadID);
   };

   if ((event.body.toLowerCase() == "تعطلت") || (event.body.toLowerCase() == "توقفت")) {
     return api.sendMessage("من قال ذلك ?", threadID);
   };

  if (event.body.indexOf("سيستا") == 0 || (event.body.indexOf("هينا") == 0)) {
    var msg = {
      body: `${rand}`
    }
    return api.sendMessage(msg, threadID, messageID);
  };

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }