const { prefix, token } = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const readyArray = ["rdy", "ready"];
const unreadyArray = ["unready", "letmegobro"];
const jabronisArray = [];

client.once("ready", () => {
	console.log("Ready!");
});

client.on("message", message => {

	//	message.channel.send(`<${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
	const messageContent = message.content.toLowerCase();
	const messageChannel = message.channel;
	const messageUsername = message.author.username;

	console.log(messageChannel + " | " + messageUsername + ": " + messageContent);


	commands(messageContent, messageChannel, message.author);
});


function commands(content, channel, username) {
	if (content.startsWith(`${prefix}jabronis`)) {
		listJabronis(channel);
	}
	else if (readyArray.includes(content) && !jabronisArray.includes(username)) {
		jabronisArray.push(username);
		listJabronis(channel);
		channel.send("Who in the blue hell are you?")
	}
	else if (unreadyArray.includes(content) && jabronisArray.includes(username)) {
		jabronisArray.pop(username);
		listJabronis(channel);
		channel.send("It doesn't matter what your name is!")
	}
	else if (content.startsWith(`${prefix}shufflejabronis`)) {
		shuffleJabronis(channel);
	}
}

function shuffleJabronis(channel) {
	if (jabronisArray.length > 2) {
		let blueTeamArray = [];
		let redTeamArray = [];

		jabronisArray.forEach((element, index) => {
			let team = Math.floor(Math.random() * 2)
			if (team == 0) {
				if (blueTeamArray.length < Math.floor(jabronisArray.length / 2)) {
					blueTeamArray.push(jabronisArray[index]);
				}
				else {
					redTeamArray.push(jabronisArray[index]);
				}
			}
			else {
				if (redTeamArray.length < Math.floor(jabronisArray.length / 2)) {
					redTeamArray.push(jabronisArray[index]);
				}
				else {
					blueTeamArray.push(jabronisArray[index]);
				}
			}
		});

		channel.send("blue: \n" + blueTeamArray);
		channel.send("red: \n" + redTeamArray);
	}
}

function listJabronis(channel) {
	//let completeListMarkDown = "\n >>>  	__**Jabronis**__ \n";

	
	jabronisArray.forEach(element => {
		//completeListMarkDown += `${element.displayAvatarURL()}  ${element} :white_check_mark: \n`;
		//channel.send(` \n  ${element.username} :white_check_mark: \n ${element.displayAvatarURL()}`);
		var embed = new Discord.MessageEmbed()
                    .setColor(0x00a5ff)
					.setAuthor(`${element.username}`, `${element.displayAvatarURL({ dynamic:true })}`);
		channel.send(embed);
	});
	//channel.send(completeListMarkDown);
}

client.login(token);