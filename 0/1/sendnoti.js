const fs = require('fs');
const request = require('request');

module.exports.config = {
    name: "م",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
    description: "",
    commandCategory: "الإدارة",
    usages: "[رسالة]",
    cooldowns: 5,
}

let atmDir = [];

const getAtm = (atm, body) => new Promise(async (resolve) => {
    let msg = {}, attachment = [];
    msg.body = body;
    for(let eachAtm of atm) {
        await new Promise(async (resolve) => {
            try {
                let response =  await request.get(eachAtm.url),
                    pathName = response.uri.pathname,
                    ext = pathName.substring(pathName.lastIndexOf(".") + 1),
                    path = __dirname + `/cache/${eachAtm.filename}.${ext}`
                response
                    .pipe(fs.createWriteStream(path))
                    .on("close", () => {
                        attachment.push(fs.createReadStream(path));
                        atmDir.push(path);
                        resolve();
                    })
            } catch(e) { console.log(e); }
        })
    }
    msg.attachment = attachment;
    resolve(msg);
})

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Casablanca/Africa").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, body } = event;
    let name = await Users.getNameUser(senderID);
    switch (handleReply.type) {
        case "إرسالnoti": {
            let text = `====== [ رد العضو ] ======\n--------------\n『الوقت』: ${gio}\n\n--------------\n『الرد』 : ${body}\n\n--------------\nاسم المستخدم ${name}  من المجموعة ${(await Threads.getInfo(threadID)).threadName || "غير معروف"}`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `====== [ رد العضو ] ======\n--------------\n『الوقت』: ${gio}\n\n--------------\n『الرد』 : ${body}\n\n--------------\nاسم المستخدم: ${name} من المجموعة ${(await Threads.getInfo(threadID)).threadName || "غير معروف"}`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "reply",
                    messageID: info.messageID,
                    messID: messageID,
                    threadID
                })
            });
            break;
        }
        case "reply": {
            let text = `==== [رسالة من الإدارة] ====\n--------------\n『الوقت』: ${gio}\n\n--------------\n『الرسالة』 : ${body}\n\n--------------\n『اسم الإداري』 ${name}\n--------------\nيرجى الرد على هذه الرسالة إذا كنت ترغب في الرد على هذا الإعلان`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `${body}==== [رسالة من الإدارة] ====\n--------------\n『الوقت』: ${gio}\n\n--------------\n『اسم الإداري』 ${name}\n--------------\nيرجى الرد على هذه الرسالة إذا كنت ترغب في الرد على هذا الإعلان.`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "إرسالnoti",
                    messageID: info.messageID,
                    threadID
                })
            }, handleReply.messID);
            break;
        }
    }
}

module.exports.run = async function ({ api, event, args, Users }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Africa/Morocco").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, messageReply } = event;
    if (!args[0]) return api.sendMessage("يرجى إدخال الرسالة", threadID);
    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `====== [رسالة من الإدارة] ======\n--------------\n『الوقت』: ${gio}\n\n--------------\n『الرسالة』 : ${args.join(" ")}\n\n--------------\n『اسم الإداري』 ${await Users.getNameUser(senderID)} \n--------------\nيرجى الرد على هذه الرسالة إذا كنت ترغب في الرد على هذا الإعلان`;
    if(event.type == "message_reply") text = await getAtm(messageReply.attachments, `====== [رسالة من الإدارة] ======\n--------------\n『الوقت』: ${gio}\n\n--------------\n『الرسالة』 : ${args.join(" ")}\n\n--------------\n『اسم الإداري』 ${await Users.getNameUser(senderID)}\n--------------\nيرجى الرد على هذه الرسالة إذا كنت ترغب في الرد على هذا الإعلان`);
    await new Promise(resolve => {
        allThread.forEach((each) => {
            try {
                api.sendMessage(text, each, (err, info) => {
                    if(err) { canNot++; }
                    else {
                        can++;
                        atmDir.forEach(each => fs.unlinkSync(each))
                        atmDir = [];
                        global.client.handleReply.push({
                            name: this.config.name,
                            type: "إرسالnoti",
                            messageID: info.messageID,
                            messID: messageID,
                            threadID
                        })
                        resolve();
                    }
                })
            } catch(e) { console.log(e) }
        })
    })
    api.sendMessage(`تم الإرسال إلى ${can} محادثة، لم يتم الإرسال إلى ${canNot} محادثة`, threadID);
}