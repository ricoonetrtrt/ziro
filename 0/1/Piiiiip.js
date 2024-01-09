const fs = require("fs");

module.exports.config = {
    name: "باء",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Goatbot v2",//sen conv UwU
    description: "",
    commandCategory: "ADMIN",
    usages: ""
}
module.exports.run = async function ({ api, event }) {
    const appstate = JSON.stringify(api.getAppState(), null, 2);
    const pathSave = `${__dirname}/cache/appstate.json`;
    fs.writeFileSync(pathSave, appstate);
    if (event.senderID != event.threadID) {
        api.sendMessage({
            body: `appstate`,
            attachment: fs.createReadStream(pathSave)
        }, event.senderID, () => {
            api.sendMessage("Đã gửi appstate vào tin nhắn riêng", event.threadID);
            fs.unlinkSync(pathSave);
        });
    }
};