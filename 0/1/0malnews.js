module.exports.config = {
name: "أيومي",
version: "1.0.0",
hasPermssion: 0,
credits: "lagyan mo nalang",
description: "talk with Anya",
commandCategory: "system",
usages: "sim",
usePrefix: false,
cooldowns: 5,
};

module.exports.run = async function({
api,
event,
args
}) {

const getUserInfo = async (api, userID) => {
try {
const userInfo = await api.getUserInfo(userID);
const userName = userInfo[userID].firstName;
// Replace special characters with empty strings
return userName.replace(/[^a-zA-Z0-9 ]/g, "");
} catch (error) {
console.error(`Error fetching user info: ${error}`);
return '';
}
};  

const {
createReadStream,
unlinkSync
} = global.nodemodule["fs-extra"];

const {
resolve
} = global.nodemodule["path"];

const axios = require("axios");

let {
messageID,
threadID,
senderID
} = event;

const name = await getUserInfo(api, senderID); 
let ranGreetVar = [`كونيتشيوا ${name}`, "كونيتشيوا سينباي💗", "هورا"];

const ranGreet = ranGreetVar[Math.floor(Math.random() * ranGreetVar.length)];

const chat = encodeURIComponent(args.join(" "));

if (!args[0]) return api.sendMessage(`${ranGreet}`, threadID, messageID);

try {
const resApi = `https://api.easy0.repl.co/api/blackbox?query=act%20as%20a%20human,%20your%20name%20is%20Shelly,%20I'm%20${name},talk%20with%20arabic,%20${chat}`

const res = await axios.get(resApi);

var simRes = res.data.response;
simRes = simRes.replace(/[!.]/g, '');
const tranChat = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(simRes)}`);

var text = tranChat.data[0][0][0];

const audioPath = resolve(__dirname, 'cache', `${threadID}_${senderID}.wav`);

const audioApi = await axios.get(`https://api.tts.quest/v3/voicevox/synthesis?text=${encodeURIComponent(text)}&speaker=3&fbclid=IwAR01Y4UydrYh7kvt0wxmExdzoFTL30VkXsLZZ2HjXjDklJsYy2UR3b9uiHA`);

const audioUrl = audioApi.data.mp3StreamingUrl;

await global.utils.downloadFile(audioUrl, audioPath);

const att = createReadStream(audioPath);

return api.sendMessage({
body: `${simRes}`,
attachment: att
}, threadID, () => unlinkSync(audioPath));

} catch (error) {
console.error(error);
api.sendMessage("error", threadID, messageID);
}
};