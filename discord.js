const discord = require('discord.js');
const client = new discord.Client();

function botLog(msg) {
    console.log(`Bot: ${msg}`)
}

function userLog(server, nick, msg) {
    console.log(`[${server}] User ${nick}: ${msg}`);
}

client.on('ready', () => {
	botLog('Ready!');
	client.user.setGame('służę pomocą!');
	client.user.setAvatar('./avatar3.png');
});

client.on('message', message => {
	if(message.author.bot) return;

    let content = message.content;
    let command = message.content.toLowerCase();
    let nick = message.author.username;
    let channel = message.channel;
    let server = message.guild.name;
    
    switch (command) {
        case '.ping':
            userLog(server, nick, 'command PING');
            message.reply('pong!');
            break;
        case '.pong':
            userLog(server, nick, 'command PONG');
            message.reply('ping!');
            break;
        case 'hi kuvu!':
            userLog(server, nick, 'command HI_KUVU');
            channel.sendMessage('Hi ' + message.author.username + '!');
            break;
        case '#reklama':
            userLog(server, nick, 'command REKLAMA');
            message.delete();
            channel.sendMessage('Zapraszam do zapoznania się z innymi projektami mojego stwórcy!\nStrona www: https://kuvus.pl');
            break;
        case '.pomoc':
        case '.help':
            userLog(server, nick, 'command HELP');
            message.author.sendMessage('Oto lista komend:\n```.pomoc - wyświetla pomoc\n.ping - wysyła wiadomość o treści ping\n.avatar - wysyła adres URL do twojego avatara\n.servers - Lista serwerów używających kuvuBota```');
            message.reply('lista komend została wysłana na PW!');
            break;
        case '.servers':
            userLog(server, nick, 'command SERVERS');
            message.reply('serwery, które używają kuvuBota: \n' + '```' + client.guilds.map(r => '\n' + r.name + ' (#' + r.id + ')') + '```');
            break;
        default:
            if (command.startsWith('.avatar')) {
                userLog(server, nick, 'command AVATAR');
                let users = message.mentions.users;
                if (users.first()) {
                    let result = '';
                    users.forEach(function (user) {
                        result += user.avatarURL + '\n';
                    });
                    message.reply(result);
                } else {
                    message.reply(message.author.avatarURL);
                }
            }
    }
});

client.login('<TOKEN>');
