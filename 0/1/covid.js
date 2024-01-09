module.exports.config = {
  name: "كوفيد",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐊𝐈𝐓𝐄 凧",
  description: "update for covid",
  commandCategory: "news",
  usages: `Search cannot be left blank\n\nHow to use?\n${global.config.PREFIX}covid <country>\n\nExample:\n${global.config.PREFIX}covid japan\n`,
  cooldowns: 5
};

module.exports.run = async (
{
  api,
  event,
  args
}) =>
{
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  var tip = args.join(" ");
  if (!tip) return api.sendMessage(`لا يمكنك تركها فارغة\n\nكيف تستعمله?\n${global.config.PREFIX}كوفيد <دولة>\n\nمثال:\n${global.config.PREFIX}كوفيد japan\n\nصنع بواسطة: 𝐊𝐈𝐓𝐄 凧`, event.threadID, event.messageID);
  else
  {
    axios.get(`https://disease.sh/v3/covid-19/countries/${encodeURIComponent(tip)}`).then(res =>
    {
      let nhiem = res.data.cases,
        chet = res.data.deaths,
        dieutri = res.data.recovered,
        danso = res.data.population,
        chauluc = res.data.continent,
        quocgia = res.data.country
      var flag = res.data.countryInfo.flag;
      let callback = function ()
      {
        api.sendMessage(
        {
          body: `الدولة: ${quocgia}\n\nالمصابون: ${nhiem}\nالوفايات: ${chet} \nالمعالجون: ${dieutri}\nالسكان: ${danso}\nالقارة: ${chauluc}`,
          attachment: fs.createReadStream(__dirname + `/cache/covidtk.png`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/covidtk.png`), event.messageID);
      };
      request(encodeURI(flag)).pipe(fs.createWriteStream(__dirname + `/cache/covidtk.png`)).on("close", callback);
    })
  }
}