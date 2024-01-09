module.exports.config = {
	name: "طقس",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
	description: "أخبار الطقس",
	commandCategory: "متفرقات",
	usages: "[الموقع]",
	cooldowns: 5,
	dependencies: {
		"moment-timezone": "",
		"request": ""
	},
	envConfig: {
		"OPEN_WEATHER": "c4ef85b93982d6627681b056e24bd438"
	}
};
module.exports.languages = {
	"en": {
		"locationNotExist": "لا يمكن العثور على %1.",
"returnResult": "🌡 درجة الحرارة: %1℃\n🌡 الإحساس بها: %2℃\n☁️ السماء: %3\n💦 الرطوبة: %4%\n💨 سرعة الرياح: %5كم/ساعة\n🌅 شروق الشمس: %6\n🌄 غروب الشمس: %7"

module.exports.run = async ({ api, event, args, getText }) => {
	const request = global.nodemodule["request"];
	const moment = global.nodemodule["moment-timezone"];
	const { throwError } = global.utils;
	const { threadID, messageID } = event;
	
	var city = args.join(" ");
	if (city.length == 0) return throwError(this.config.name, threadID, messageID);
	return request(encodeURI("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + global.configModule[this.config.name].OPEN_WEATHER + "&units=metric&lang=" + global.config.language), (err, response, body) => {
		if (err) throw err;
		var weatherData = JSON.parse(body);
		if (weatherData.cod !== 200) return api.sendMessage(getText("locationNotExist", city), threadID, messageID);
		var sunrise_date = moment.unix(weatherData.sys.sunrise).tz("Asia/Dhaka");
		var sunset_date = moment.unix(weatherData.sys.sunset).tz("Asia/Dhaka");
		api.sendMessage({
			body: getText("returnResult", weatherData.main.temp, weatherData.main.feels_like, weatherData.weather[0].description, weatherData.main.humidity, weatherData.wind.speed, sunrise_date.format('HH:mm:ss'), sunset_date.format('HH:mm:ss')),
			location: {
				latitude: weatherData.coord.lat,
				longitude: weatherData.coord.lon,
				current: true
			},
		}, threadID, messageID);
	});
    }