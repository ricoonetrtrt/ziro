module.exports.config = {
    name: "ان_هنتاي",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
    description: "أكواد عشوائية",
    commandCategory: "nhentai",
    usages: "إرسال ملاحظة",
    cooldowns: 5,
    dependencies: {
        "request": ""
    }
};

module.exports.languages = { 
    "ar": {
        "genarateCode": "الرمز المثالي لك: %1",
        "notFound": "لا يمكن العثور على مانجا الهنتاي الخاصة بك!",
        "returnResult": "» الاسم: %1\n» المؤلف: %2\n» الشخصيات: %3\n» الوسوم: %4\n» الرابط: https://nhentai.net/g/%5"
    }
}

module.exports.run = ({ api, event, args, getText }) => {
    const request = global.nodemodule["request"];
    const { threadID, messageID } = event;

    if (!args[0] || typeof parseInt(args[0]) !== "number") return api.sendMessage(getText("genarateCode", Math.floor(Math.random() * 99999)), threadID, messageID);
    return request(`https://nhentai.net/api/gallery/${parseInt(args[0])}`, (error, response, body) => {
        try {
           var codeData = JSON.parse(body);
           if (codeData.error == true) throw new Error();
        }
        catch { return api.sendMessage(getText("notFound"), threadID, messageID) }

        const title = codeData.title.pretty;
        var tagList = [],
            artistList = [],
            characterList = [];
        codeData.tags.forEach(item => (item.type == "tag") ? tagList.push(item.name) : (item.type == "artist") ? artistList.push(item.name) : (item.type == "character") ? characterList.push(item.name) : '');
        var tags = tagList.join(', ');
        var artists = artistList.join(', ');
        var characters = characterList.join(', ');
        if (characters == '') characters = 'أصلي';
        return api.sendMessage(getText("returnResult", title, artists, characters, tags, args[0]), threadID, messageID);
    });
};