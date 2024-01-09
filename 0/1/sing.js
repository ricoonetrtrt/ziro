module.exports.config = {
  name: "موسيقى",
  version: "2.0.4",
  hasPermssion: 0,
  credits: "غراي",
  description: "تشغيل أغنية",
  commandCategory: "مساعدة",
  usages: "[العنوان]",
  prefix: true,
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "request": "",
    "axios": "",
    "ytdl-core": "",
    "yt-search": ""
  }
};

module.exports.run = async ({ api, event }) => {
  const axios = require("axios");
  const fs = require("fs-extra");
  const ytdl = require("ytdl-core");
  const request = require("request");
  const yts = require("yt-search");

  const input = event.body;
  const text = input.substring(12);
  const data = input.split(" ");

  if (data.length < 2) {
    return api.sendMessage("يرجى وضع أغنية", event.threadID);
  }

  data.shift();
  const song = data.join(" ");

  try {
    api.sendMessage(`جاري البحث عن "${song}". الرجاء الانتظار...`, event.threadID);

    const searchResults = await yts(song);
    if (!searchResults.videos.length) {
      return api.sendMessage("خطأ: طلب غير صالح.", event.threadID, event.messageID);
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;

    const stream = ytdl(videoUrl, { filter: "audioonly" });

    const fileName = `${event.senderID}.mp3`;
    const filePath = __dirname + `/cache/${fileName}`;

    stream.pipe(fs.createWriteStream(filePath));

    stream.on('response', () => {
      console.info('[المحمل]', 'بدأ التحميل الآن!');
    });

    stream.on('info', (info) => {
      console.info('[المحمل]', `جاري تحميل ${info.videoDetails.title} بواسطة ${info.videoDetails.author.name}`);
    });

    stream.on('end', () => {
      console.info('[المحمل] تم التحميل');

      if (fs.statSync(filePath).size > 26214400) {
        fs.unlinkSync(filePath);
        return api.sendMessage('[خطأ] لا يمكن إرسال الملف لأن حجمه يزيد عن 25 ميغابايت.', event.threadID);
      }

      const message = {
        body: `إليك موسيقاك، استمتع!🥰\n\nالعنوان: ${video.title}\nالفنان: ${video.author.name}`,
        attachment: fs.createReadStream(filePath)
      };

      api.sendMessage(message, event.threadID, () => {
        fs.unlinkSync(filePath);
      });
    });
  } catch (error) {
    console.error('[خطأ]', error);
    api.sendMessage('حدث خطأ أثناء معالجة الأمر.', event.threadID);
  }
};