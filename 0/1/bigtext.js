module.exports.config = {
  name: "زخرفة",
version: "1.0.0",
hasPermssion: 0,
credits: "Gry KJ",
description: "",
commandCategory: "",
usages: "",
cooldowns: 5, 
};

module.exports.run = async function({ api, event }) {
  let { threadID, messageID } = event;
   const x = event.body.slice(5).trim()
 const replaceChars = {
  "a": "𝓐",
 "b": "𝓑",
 "c": "𝓒",
 "d": "𝓓",
 "e": "𝓔",
 "f": "𝓕",
 "g": "𝓖",
 "h": "𝓗",
 "i": "𝓘",
 "j": "𝓙",
 "k": "𝓚",
 "l": "𝓛",
 "m": "𝓜",
 "n": "𝓝",
 "o": "𝓞",
 "p": "𝓟",
 "q": "𝓠",
 "r": "𝓡",
 "s": "𝓢",
 "t": "𝓣",
 "u": "𝓤",
 "v": "𝓥",
 "w": "𝓦",
 "x": "𝓧",
 "y": "𝓨",
 "z": "𝓩",};

 let result = "";
 for (let i = 0; i < x.length; i++) {
  const char = x[i].toLowerCase(); 
  if (replaceChars[char]) { 
  result += replaceChars[char];
  } else {
  result += x[i];
  }
 }
  api.sendMessage(result , threadID , messageID);

  };