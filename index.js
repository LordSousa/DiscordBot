const { prefix, token } = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const readyArray = ["rdy", "ready"];
const unreadyArray = ["unready", "unrdy"];
const jabronisArray = [];

client.once("ready", () => {
	console.log("Ready!");
});

client.on("message", message => {

	jabronisArray.push(message.author);	
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
	}
	else if (unreadyArray.includes(content) && jabronisArray.includes(username)) {
		jabronisArray.pop(username);
		listJabronis(channel);		
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

		blueTeamArray.forEach(element => {
			let jabronisEmbed = new Discord.MessageEmbed()
				.setTitle(`${element.username}`)
				.setColor(0x00a5ff)									
				.setImage(`${element.displayAvatarURL({ dynamic: true })}`)			
			channel.send(jabronisEmbed);
		});

		redTeamArray.forEach(element => {
			let jabronisEmbed = new Discord.MessageEmbed()
				.setTitle(`${element.username}`)
				.setColor(0xda4f4f)									
				.setImage(`${element.displayAvatarURL({ dynamic: true })}`)			
			channel.send(jabronisEmbed);
		});		
	}
}

function listJabronis(channel) {

	jabronisArray.forEach(element => {
		let jabronisEmbed = new Discord.MessageEmbed()
			.setTitle(`${element.username}`)
			.setColor(0x00a5ff)									
			.setImage(`${element.displayAvatarURL({ dynamic: true })}`)			
		channel.send(jabronisEmbed);
	});

}

client.login(token);