const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log('I am ready!');
	client.user.setGame('służę pomocą!');
	client.user.setAvatar('./avatar3.png');
});

client.on('message', message => {
	if(message.author.bot) return;

    let command = message.content.toLowerCase();
    let nick = message.author.username;
    switch (command) {
        case '.ping':
            message.reply('pong!');
            break;
        case '.pong':
            message.reply('ping!');
            break;
        case 'hi kuvu!':
            channel.sendMessage('Hi ' + message.author.username + '!');
            break;
        case '#reklama':
            console.log(`User ${nick} use ad command.`);
            message.delete();
            channel.sendMessage('Zapraszam do zapoznania się z innymi projektami mojego stwórcy!\nStrona www: https://kuvus.pl');
            break;
        case '.pomoc':
        case '.help':
            message.author.sendMessage('Oto lista komend:\n```.pomoc - wyświetla pomoc\n.ping - wysyła wiadomość o treści ping\n.avatar - wysyła adres URL do twojego avatara\n.servers - Lista serwerów używających kuvuBota```');
            message.reply('lista komend została wysłana na PW!');
            break;
        case '.servers':
            message.reply('serwery, które używają kuvuBota: \n' + '```' + client.guilds.map(r => '\n' + r.name + ' (#' + r.id + ')') + '```');
        default:
            if (command.startsWith('.avatar')) {
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
    }
});

client.login('<TOKEN>');
