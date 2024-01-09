module.exports.config = {
  name: "تخيلي",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Arjhil",
  description: "( وصف ثم يتم توليد ما قمت بتخيله )",
  usePrefix: true,
  commandCategory: "الذكاء الإصطناعي",
  usages: "( قم بتوليد صور إنطلاقا من مخيلتك )",
  cooldowns: 2,
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const fs = require('fs-extra');

  let { threadID, messageID } = event;
  let query = args.join(" ");

  if (!query) return api.sendMessage("🐰 أرحوك قم بإدخال وصف.", threadID, messageID);

  let path = __dirname + `/cache/polination.png`;

  try {
    const response = await axios.get(`https://arjhil-midjourney.arjhilbard.repl.co/generate-image?prompt=${encodeURIComponent(query)}`);
    const images = response.data.result;

    api.sendMessage("🕟 | جاري توليد ماتخيلته ، المرجو الإنتظار...", threadID, messageID);

    if (images.length > 0) {
      const randomIndex = Math.floor(Math.random() * images.length);
      const imageUrl = images[randomIndex];

      const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
      const imageBuffer = Buffer.from(imageResponse.data, "binary");

      fs.writeFileSync(path, imageBuffer);

      api.sendMessage({
        body: " تم التوليد بنجاح ✅",
        attachment: fs.createReadStream(path)
      }, threadID, () => fs.unlinkSync(path), messageID);
    } else {
      await api.sendMessage("😿 لم يتم إيجاد أي صورة", threadID, messageID);
    }
  } catch (error) {
    await api.sendMessage("😿 حدث خطأ أثماء توليد الصورة.", threadID, messageID);
  }
};
