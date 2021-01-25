const { prefix, token } = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const readyArray = ["rdy", "ready"];
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

	rdyJabronis(messageContent,messageChannel,messageUsername);
});

function rdyJabronis(content, channel, username) {
	if (content.startsWith(`${prefix}listjabronis`)) {
		listJabronis(channel);
	}
	else if (readyArray.includes(content) && !jabronisArray.includes(username)) {
		jabronisArray.push(username);
		listJabronis(channel);
	}
}

function listJabronis(channel) {
	let completeListMarkDown = "\n >>>  	__**Jabronis**__ \n";
	jabronisArray.forEach(element => {
		completeListMarkDown += `${element} :white_check_mark: \n`;
	});
	channel.send(completeListMarkDown);
}

client.login(token);