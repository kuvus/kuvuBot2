const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log('I am ready!');
	client.user.setGame('służę pomocą!');
	client.user.setAvatar('./avatar3.png');
});

client.on('message', message => {
	if(message.author.bot) return;

	if (message.content.toLowerCase() == '.ping') {
		message.reply('pong!');
	}
	else if (message.content.toLowerCase() == '.pong') {
		message.reply('ping!');
	}
	else if (message.content.toLowerCase() == 'hi kuvu!') {
		message.channel.sendMessage('Hi ' + message.author.username + '!');
	}
	else if (message.content.toLowerCase() === '#reklama') {
		console.log(`User ${message.author.username} use ad command.`);
		message.delete();
		message.channel.sendMessage('Zapraszam do zapoznania się z innymi projektami mojego stwórcy!\nStrona www: https://kuvus.pl');
	}
	else if (message.content.toLowerCase() == '.pomoc' || message.content.toLowerCase() == '.help') {
		message.author.sendMessage('Oto lista komend:\n```.pomoc - wyświetla pomoc\n.ping - wysyła wiadomość o treści ping\n.avatar - wysyła adres URL do twojego avatara\n.servers - Lista serwerów używających kuvuBota```');
		message.reply('lista komend została wysłana na PW!');
		
	}
	else if (message.content.toLowerCase().includes(".avatar")) {
		
		let args = message.content.split(" ", 2);
		let cmd = args[0];
		let ment = args[1];
		if (ment === undefined) {
			message.reply(message.author.avatarURL);
		}
		else {
			message.reply(ment.avatarURL);
		}
		
	}
	else if (message.content.toLowerCase() == '.servers') {
		message.reply('serwery, które używają kuvuBota: \n' + '```' + client.guilds.map(r => '\n' + r.name + ' (#' + r.id + ')') + '```');
	}
});


// client.on("guildMemberAdd", (member) => {
// 	console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
// 	member.guild.defaultChannel.sendMessage(`${member.user.username} dołączył na ten serwer!`);
// 	member.user.sendMessage(`Witaj na serwerze ${member.guild.name}!\nZanim cokolwiek napiszesz zapoznaj się z regulaminem tego serwera!`);
// });

client.login('YOUR-BOT-TOKEN');