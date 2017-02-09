const discord = require('discord.js');
const Cleverbot = require('cleverbot');
const client = new discord.Client();
const http = require('http');

function botLog(msg) {
    console.log(`Bot: ${msg}`)
}

function userLog(server, nick, msg) {
    console.log(`[${server}] User ${nick}: ${msg}`);
}

function stringToEmojis(string) {
    let result = [];
    string.toLowerCase().split('').forEach(function (c) {
        let code = c.charCodeAt(0);
        let aCode = 97; //https://unicode-table.com/en/0061/
        let zCode = 122; //https://unicode-table.com/en/007A/
        if (code >= aCode && code <= zCode) {
            let regionalIndicatorACode = 127462; //https://unicode-table.com/en/1F1E6/
            let emojiCode = regionalIndicatorACode + code - aCode;
            result.push(String.fromCodePoint(emojiCode));
        }
    });
    return result;
}

client.on('ready', () => {
    botLog('Ready!');
    client.user.setGame('.pomoc');
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
            const ping = new discord.RichEmbed()
                .setTitle('kuvuBot')
                .setColor('#00FF00')
                .setFooter('© 2016-2017 kuvuBot Team')
                .setThumbnail('https://cdn.discordapp.com/app-icons/205965155282976768/ea38f145269800017987c7252fd2b21a.png')
                .setURL('https://bot.kuvus.pl')
                .addField('Pong!', '\u200b')
                message.channel.sendEmbed(
                ping,
                    '',
                { disableEveryone: true }
            );
            break;
        case '.pong':
            userLog(server, nick, 'command PONG');
            const pong = new discord.RichEmbed()
                .setTitle('kuvuBot')
                .setColor('#00FF00')
                .setFooter('© 2016-2017 kuvuBot Team')
                .setThumbnail('https://cdn.discordapp.com/app-icons/205965155282976768/ea38f145269800017987c7252fd2b21a.png')
                .setURL('https://bot.kuvus.pl')
                .addField('Ping!!', '\u200b')
                message.channel.sendEmbed(
                pong,
                    '',
                { disableEveryone: true }
            );
            break;
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
            const embed = new discord.RichEmbed()
                .setTitle('kuvuBot')
                .setColor('#2196f3')
                .setFooter('© 2016-2017 kuvuBot Team')
                .setThumbnail('https://cdn.discordapp.com/app-icons/205965155282976768/ea38f145269800017987c7252fd2b21a.png')
                .setURL('https://bot.kuvus.pl')
                .addField('ℹ️  Komendy', "[.pomoc](javascript:;) - wyświetla pomoc dotyczącą bota")
                .addField('\u200b', '[.ping](javascript:;) - wysyła \"ping\"')
                .addField('\u200b', '[.text](javascript:;) <tekst> - generuje tekst w postaci emoji')
                .addField('\u200b', '[.rawtext](javascript:;) <tekst> - generuje tekst w postaci kodu emoji')
                .addField('\u200b', '[.avatar](javascript:;) [wzmianka] - wysyła link avatara konkretnego użytkownika')
                .addField('\u200b', '[.serwery](javascript:;) - wyświetla serwery na których jest kuvuBot')
                .addField('\u200b', '[.react](javascript:;) <tekst> - bot reaguje tekstem na wiadomość')
                .addField('\u200b', '[.clever](javascript:;) <tekst> - cleverbot')
                .addField('\u200b', '[.cat](javascript:;) - wysyła zdjęcie kotka :3')
                .addField('\u200b', '\u200b')
                .addField('🔗  Linki', 'WWW: [bot.kuvus.pl](https://bot.kuvus.pl)\nGitHub: https://github.com/kuvus/kuvuBot\n\n[Dodaj kuvuBota na swój serwer!](https://discordapp.com/oauth2/authorize?&client_id=205965155282976768&scope=bot&permissions=268561430)')
                message.author.sendEmbed(
                embed,
                'Oto podstawowe infomacje o bocie:',
                { disableEveryone: true }
            );
            message.reply('lista komend została wysłana na PW!');
            break;
        case '.servers':
        case '.serwery':
            userLog(server, nick, 'command SERVERS');
            let serversMessage = 'serwery, które używają kuvuBota: \n' + '```' + client.guilds.map(r => '\n' + r.name.replace(/["`"]/g, "").replace(/^\s*/g, "") + ' (#' + r.id + ')' + ', ' + r.owner.displayName + '') + '```';
            message.reply(serversMessage);
            break;
        case '.cat':
        case '.kiciusie':
        case '.kot':
        case '.kotek':
            userLog(server, nick, 'command RANDOMCAT');
            let options = {
              host: 'api.kiciusie.pl',
              port: 80,
              path: '/index.php?type=get&mode=random'
            };

            http.get(options).on('response', function (response) {
                let cat1 = '';
                response.on('data', function (chunk) {
                    cat += chunk;
                });
                response.on('end', function () {
                    let obj = JSON.parse(cat);
                    const cat1 = new discord.RichEmbed()
                        .setTitle('kuvuBot')
                        .setColor('#CC0066')
                        .setDescription('Random cat picture.')
                        .setFooter('© 2016-2017 kuvuBot Team')
                        .setThumbnail('https://cdn.discordapp.com/app-icons/205965155282976768/ea38f145269800017987c7252fd2b21a.png')
                        .setURL('https://bot.kuvus.pl')
                        .setImage(obj.url)
                        .addField('\u200b', '\u200b')
                        message.channel.sendEmbed(
                        cat1,
                        '',
                        { disableEveryone: true }
                    );
                });
            });

            break;
        case '.randombolek':
        case '.bolek':
            userLog(server, nick, 'command RANDOMBOLEK');
            let options1 = {
              host: 'api.kuvus.pl',
              port: 80,
              path: '/?t=img&c=bolek'
            };

            http.get(options1).on('response', function (response1) {
                let bolek = '';
                response1.on('data', function (chunk1) {
                    bolek += chunk1;
                });
                response1.on('end', function () {
                    let obj1 = JSON.parse(bolek);
                    const bolek1 = new discord.RichEmbed()
                        .setTitle('kuvuBot')
                        .setColor('#3399FF')
                        .setDescription('Random bolek picture.')
                        .setFooter('© 2016-2017 kuvuBot Team')
                        .setThumbnail('https://cdn.discordapp.com/app-icons/205965155282976768/ea38f145269800017987c7252fd2b21a.png')
                        .setURL('https://bot.kuvus.pl')
                        .setImage(obj1.url)
                        .addField('\u200b', '\u200b')
                        message.channel.sendEmbed(
                        bolek1,
                        '',
                        { disableEveryone: true }
                    );
                });
            });
            break;
        default:
            if (command.startsWith('.avatar')) {
                userLog(server, nick, 'command AVATAR');
                let users = message.mentions.users;
                if (users.first()) {
                    let result = '';
                    users.forEach(function (user) {
                        let avatar = user.avatarURL;
                        result += (avatar == null ? '<brak awatara>' : avatar) + '\n';
                    });
                    message.reply(result);
                } else {
                    let avatar = message.author.avatarURL;
                    message.reply(avatar == null ? 'nie ustawiłeś jeszcze awatara!' : avatar);
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
            } else if (command.startsWith('.clever')) {
                userLog(server, nick, 'command CLEVER');
                command.replace(".clever ", '');

                let clev = new Cleverbot({
                    key: '<apiKey>' // from https://www.cleverbot.com/api/
                });
                     
                clev.query(command)
                .then(function (response) {
                    message.reply(response.output); 
                     
                });
            }
    }
});

client.login('<TOKEN>');
