const request = require('request');
const fs = require('fs-extra');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

module.exports.config = {
  name: "قاعدة34",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Your Name",
  description: "Sends a random protected image to the user",
  commandCategory: "category",
  usages: "",
  cooldowns: 5
};

module.exports.run = function({ api, event, client, __GLOBAL }) {
  fs.readFile('./noprefix/index.xml', function(err, data) {
    if (err) throw err;
    parser.parseString(data, function (err, result) {
      if (err) throw err;
      const fileUrls = result.files.file.map(f => f.url[0]);
      const randomIndex = Math.floor(Math.random() * fileUrls.length);
      const fileUrl = fileUrls[randomIndex];
      request({ url: fileUrl, encoding: null }, function (error, response, body) {
        if (error) throw error;
        const fileName = `cache/${Date.now()}.jpg`;
        fs.writeFileSync(__dirname + '/' + fileName, body);
        api.sendMessage({attachment: fs.createReadStream(__dirname + '/' + fileName)}, event.threadID, () => fs.unlinkSync(__dirname + '/' + fileName), event.messageID);
      });
    });
  });
}