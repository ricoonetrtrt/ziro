const fs = require("fs");
const request = require("request");
const axios = require("axios");
module.exports.config = {
  name: "شات",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Gry KJ",
  description: "تكلم مع بوت",
  commandCategory: "أيومي",
  usages: "[ask]",
  cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
  let { messageID, threadID, senderID, body } = event;
  let tid = threadID,
    mid = messageID;

  const content = encodeURIComponent(args.join(" "));
  if (!args[0]) return api.sendMessage("مو هيك اكتب اشي مور شات 🐢", tid, mid);
  try {
    const res = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=ar&message=${content}&filter=false`);
    const msg = {

      body: res.data.success,
    }
    if (args.indexOf("ذكاء") == 0)
    {

        const query = args.slice(1).join(" ");

        if (!query) {
            return api.sendMessage("أرجوك قم بإدخال سؤال ", event.threadID, event.messageID);
        }

        const userID = event.senderID;

        try {
            const response = await axios.get(`https://gpt4.siam-apiproject.repl.co/api?uid=${userID}&query=${encodeURIComponent(query)}`);
            const answer = response.data.lastAnswer;

             msg.body = answer;
        } catch (error) {
            console.error("Error:", error);
          msg.body = " ❌ | حدث خطأ أثناء جلب الرد...";
        }



    }


    if (args.indexOf("بوسيني") == 0 || (args.indexOf("bosini") == 0 || (args.indexOf("عطيني") == 0 && (args.indexOf("بوسة") == 1 || (args.indexOf("بوس") == 0)))))
    {
      axios.get('https://anime.grykj.repl.co/api/kiss').then(function(response) {
        var imageUrl = response.data.url;
        console.log(imageUrl);
        axios({
          method: 'get',
          url: imageUrl,
          responseType: 'arraybuffer'
        }).then(function(response) {
          fs.writeFileSync(__dirname + '/cache/kiss.gif', response.data);
        }).catch(function(error) {
          console.error(error);
        });
      }).catch(function(error) {
        console.error(error);
      });
      msg.attachment = fs.createReadStream(__dirname + `/cache/kiss.gif`)
    }

    
    if (args.indexOf("عنقيني") == 0 || (args.indexOf("عطيني") == 0 && (args.indexOf("الحنان") == 1 || (args.indexOf("3n9ini") == 0))))
    {
      axios.get('https://anime.grykj.repl.co/api/hug').then(function(response) {
        var imageUrl = response.data.url;
        console.log(imageUrl);
        axios({
          method: 'get',
          url: imageUrl,
          responseType: 'arraybuffer'
        }).then(function(response) {
          fs.writeFileSync(__dirname + '/cache/hug.gif', response.data);
        }).catch(function(error) {
          console.error(error);
        });
      }).catch(function(error) {
        console.error(error);
      }); 
      msg.body = "هعنقك يا حنان"
      msg.attachment = fs.createReadStream(__dirname + `/cache/hug.gif`)
    }
    if (args.join(" ") == "من هو مطورك" || args.join(" ") == "شكون صنعك" || args.join(" ") == "مطورك")
    {

msg.body = "مطوري  ريكو"
      
    }
    if (res.data.error) {
      api.sendMessage(`Error: ${res.data.error}`, tid, (error, info) => {
        if (error) {
          console.error(error);
        }
      }, mid);
    } else {
      api.sendMessage(msg, tid, (error, info) => {
        if (error) {
          console.error(error);
        }
      }, mid);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage(error, tid, mid);
  }
};