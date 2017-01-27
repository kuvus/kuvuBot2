const Discord = require('discord.js');
const client = new Discord.Client();

function botLog(msg) {
    console.log(`Bot: ${msg}`)
}

function userLog(nick, msg) {
    console.log(`User ${nick}: ${msg}`);
}

client.on('ready', () => {
	botLog('Ready!');
	client.user.setGame('służę pomocą!');
	client.user.setAvatar('./avatar3.png');
});

client.on('message', message => {
	if(message.author.bot) return;

    let command = message.content.toLowerCase();
    let nick = message.author.username;
    let channel = message.channel;
    switch (command) {
        case '.ping':
            userLog(nick, 'command PING');
            message.reply('pong!');
            break;
        case '.pong':
            userLog(nick, 'command PONG');
            message.reply('ping!');
            break;
        case 'hi kuvu!':
            userLog(nick, 'command HI_KUVU');
            channel.sendMessage('Hi ' + message.author.username + '!');
            break;
        case '#reklama':
            userLog(nick, 'command REKLAMA');
            message.delete();
            channel.sendMessage('Zapraszam do zapoznania się z innymi projektami mojego stwórcy!\nStrona www: https://kuvus.pl');
            break;
        case '.pomoc':
        case '.help':
            userLog(nick, 'command HELP');
            message.author.sendMessage('Oto lista komend:\n```.pomoc - wyświetla pomoc\n.ping - wysyła wiadomość o treści ping\n.avatar - wysyła adres URL do twojego avatara\n.servers - Lista serwerów używających kuvuBota```');
            message.reply('lista komend została wysłana na PW!');
            break;
        case '.servers':
            userLog(nick, 'command SERVERS');
            message.reply('serwery, które używają kuvuBota: \n' + '```' + client.guilds.map(r => '\n' + r.name + ' (#' + r.id + ')') + '```');
        default:
            if (command.startsWith('.avatar')) {
                userLog(nick, 'command AVATAR');
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
