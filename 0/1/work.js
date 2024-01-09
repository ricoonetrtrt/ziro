module.exports.config = {
	name: "عمل",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
	description: "إذا عملت، يمكنك أن تأكل!",
	commandCategory: "كسب المال",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 1200000
    }
};

module.exports.languages = {
    "vi": {
        "cooldown": "Bạn đã làm công việc hôm nay, để tránh kiệt sức hãy quay lại sau: %1 phút %2 giây.",
        "rewarded": "Bạn đã làm công việc %1 và kiếm ra được %2$",
        "job1": "bán vé số",
        "job2": "sửa xe",
        "job3": "lập trình",
        "job4": "hack facebook",
        "job5": "đầu bếp",
        "job6": "thợ hồ",
        "job7": "fake taxi",
        "job8": "gangbang người nào đó",
        "job9": "thợ sửa ống nước may mắn  ( ͡° ͜ʖ ͡°)",
        "job10": "streamer",
        "job11": "bán hàng trực tuyến",
        "job12": "nội trợ",
        "job13": 'bán "hoa"',
        "job14": "tìm jav/hentai code cho SpermLord",
        "job15": "chơi Yasuo và gánh đội của bạn"
    },
    "en": {
        "cooldown": "لقد قمت بعملك اليوم, لتجنب الحظر قم بالعودة بعد: %1 دقيقة و %2 ثانية.",
        "rewarded": "لقد قمت بعملك: %1 وحصلت على: %2$.",
        "job1": "بائع حشيش",
        "job2": "مصلح سيارات",
        "job3": "مبرمج",
        "job4": "مخترق حساب",
        "job5": "طباخ",
        "job6": "مصاص عير",
        "job7": "سائق تاكسي",
        "job8": "تفجير منطقة",
        "job9": "نياك ( ͡° ͜ʖ ͡°)",
        "job10": "ستريمر",
        "job11": "بائع جوارب",
        "job12": "ربة بيت",
        "job13": 'بائع زهور"',
        "job14": "وجدت كود هنتاي نادر",
        "job15": "مخترق بنوك"
    }
}

module.exports.run = async ({ event, api, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.workTime) > 0) {
        var time = cooldown - (Date.now() - data.workTime),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 60000) / 1000).toFixed(0);
        
		return api.sendMessage(getText("cooldown", minutes, (seconds < 10 ? "0" + seconds : seconds)), event.threadID, event.messageID);
    }
    else {
        const job = [
            getText("job1"),
            getText("job2"),
            getText("job3"),
            getText("job4"),
            getText("job5"),
            getText("job6"),
            getText("job7"),
            getText("job8"),
            getText("job9"),
            getText("job10"),
            getText("job11"),
            getText("job12"),
            getText("job13"),
            getText("job14"),
            getText("job15")
        ];
        const amount = Math.floor(Math.random() * 600);
        return api.sendMessage(getText("rewarded", job[Math.floor(Math.random() * job.length)], amount), threadID, async () => {
            await Currencies.increaseMoney(senderID, parseInt(amount));
            data.workTime = Date.now();
            await Currencies.setData(event.senderID, { data });
            return;
        }, messageID);
    }     
}