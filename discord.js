const discord = require('discord.js');
const client = new discord.Client();

function botLog(msg) {
    console.log(`Bot: ${msg}`)
}

function userLog(server, nick, msg) {
    console.log(`[${server}] User ${nick}: ${msg}`);
}

function stringToEmojis(string) {
    let result = [];
    string.split('').forEach(function (c) {
        if (c.search(/a-z/)) {
            let aCode = 97; //https://unicode-table.com/en/0061/
            let regionalIndicatorACode = 127462; //https://unicode-table.com/en/1F1E6/
            let emojiCode = regionalIndicatorACode + c.charCodeAt(0) - aCode;
            result.push(String.fromCodePoint(emojiCode));
        }
    });
    return result;
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
    var server;
    if (channel.type == "text") {
        server = message.guild.name;
    }
    else {
        server = "Private Message";
    }
    
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
		case 'cześć kuvu!':
		case '.hi':
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
        case '.serwery':
            userLog(server, nick, 'command SERVERS');
			let serversMessage = 'serwery, które używają kuvuBota: \n' + '```' + client.guilds.map(r => '\n' + r.name.replace(/["`"]/g, "").replace(/^\s*/g, "") + ' (#' + r.id + ')') + '```';
            message.reply(serversMessage);
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
            } else if (command.startsWith('.text')) {
                userLog(server, nick, 'command TEXT');
                
                let reply = '';
                let splitted = command.split(' ');
                if (splitted.length == 1) {
                    message.reply('użycie: .text <tekst>');
                } else {
                    for (let i = 1; i < splitted.length; i++) {
                        reply += stringToEmojis(splitted[i]).join(' ') + '   ';
                    }
                }
                channel.sendMessage(reply);
            } else if (command.startsWith('.rawtext')) {
                userLog(server, nick, 'command RAWTEXT');
                
                let reply = '```';
                let splitted = command.split(' ');
                if (splitted.length == 1) {
                    message.reply('użycie: .rawtext <tekst>');
                } else {
                    for (let i = 1; i < splitted.length; i++) {
                        splitted[i].split('').forEach(function (c) {
                            if (c.search(/a-z/)) {
                                reply += `:regional_indicator_${c}: `;
                            }
                        });
                        reply += '   ';
                    }
                    reply += '```';
                    message.reply(reply);
                }
            } else if (command.startsWith('.react')) {
                userLog(server, nick, 'command REACT');
                
                let splitted = command.split(' ');
                let emojis = [];
                if (splitted.length == 1) {
                    message.reply('użycie: .react <tekst>');
                } else {
                    for (let i = 1; i < splitted.length; i++) {
                        emojis = emojis.concat(stringToEmojis(splitted[i]));
                    }
                }
                
                let react = function(i) {
                    if (i < emojis.length) {
                        message.react(emojis[i]).then(function() { react(i + 1); });
                    }
                }
                react(0);
            }
    }
});

client.login('<TOKEN>');
