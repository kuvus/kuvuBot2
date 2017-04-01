const discord = require('discord.js');
const Cleverbot = require('cleverbot');
const config = require('./config.js');
const fs = require("fs");
const client = new discord.Client();
const http = require('http');

/* Function implementations */
const avatar = require('./Functions/avatar.js');
const cat = require('./Functions/cat.js');
/* End of function implementations */
function botLog(msg) {
    console.log(`Bot: ${msg}`);
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
                .addField('\u200b', '[.status](javascript:;) <mojang/mc> (<IP>)- wyświetla status serwerów Mojang')
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
                avatar.msg(message, userLog);
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
                let commandC = command.replace(".clever ", '');

                let clev = new Cleverbot({
                    key: config.apikeys.cleverbot_api_key
                });
                     
                clev.query(commandC)
                .then(function (response) {
                    message.reply(response.output); 
                     
                });
            }
            else if (command.startsWith('.status')) { 
                let args = message.content.split(" ").slice(1);
                let status = args[0];
                let srv = args[1];
                if (status != undefined) {
                    var status1 = status.toLowerCase();
                }
                if (status1 == 'mojang') {
                    userLog(server, nick, 'command MOJANG');
                    let options2 = {
                      host: 'api.kuvus.pl',
                      port: 80,
                      path: '/?t=status&s=mojang'
                    };

                    http.get(options2).on('response', function (response2) {
                        let mjg = '';
                        response2.on('data', function (chunk2) {
                            mjg += chunk2;
                        });
                        response2.on('end', function () {
                            const mjg1 = new discord.RichEmbed()
                                .setTitle('kuvuBot')
                                .setColor('#2196f3')
                                .setFooter('© 2016-2017 kuvuBot Team')
                                .setThumbnail('https://cdn.discordapp.com/app-icons/205965155282976768/ea38f145269800017987c7252fd2b21a.png')
                                .setURL('https://bot.kuvus.pl')
                                .addField('Oto status serwerów Mojang: \n', mjg)
                                message.channel.sendEmbed(
                                mjg1,
                                '',
                                { disableEveryone: true }
                            );
                        });
                    });
                } else if (status1 == 'mc') {
                    if (srv != undefined) {
                        userLog(server, nick, 'command MC');
                        let options3 = {
                          host: 'api.kuvus.pl',
                          port: 80,
                          path: '/srv.php?s=' + srv
                        };

                        http.get(options3).on('response', function (response3) {
                            let srv1 = '';
                            response3.on('data', function (chunk3) {
                                srv1 += chunk3;
                            });
                            response3.on('end', function () {
                                let obj3 = JSON.parse(srv1);
                                if (obj3.online == true) {
                                    var stat = '💚 Włączony';
                                }
                                else {
                                    var stat = '❤ Wyłączony';
                                }
                                if (obj3.online != false) {
                                    const srv2 = new discord.RichEmbed()
                                        .setTitle('kuvuBot')
                                        .setColor('#2196f3')
                                        .setFooter('© 2016-2017 kuvuBot Team, status powered by api.kuvus.pl')
                                        .setURL('https://bot.kuvus.pl')
                                        .addField('Oto status serwera:', obj3.address)
                                        .addField('➭ IP: ', obj3.address)
                                        .addField('➭ Online: ', stat)
                                        .addField('➭ Ping: ', obj3.latency)
                                        .addField('➭ Gracze: ', obj3.players.online + '/' + obj3.players.max)
                                        .addField('➭ Wersja: ', obj3.version.name)
                                        .addField('➭ Opis: ', obj3.description)
                                        message.channel.sendEmbed(
                                        srv2,
                                        '',
                                        { disableEveryone: true }
                                    );
                                }
                                else {
                                    const srv2 = new discord.RichEmbed()
                                        .setTitle('kuvuBot')
                                        .setColor('#CC0033')
                                        .setFooter('© 2016-2017 kuvuBot Team, status powered by api.skript.pl')
                                        .setURL('https://bot.kuvus.pl')
                                        .addField('Oto status serwera:', obj3.address)
                                        .addField('➭ IP: ', obj3.address)
                                        .addField('➭ Online: ', stat)
                                        message.channel.sendEmbed(
                                        srv2,
                                        '',
                                        { disableEveryone: true }
                                    );
                                }
                            });
                        });
                    }
                    else {
                        message.reply('poprawne użycie: `.status mc <IP serwera>`')

                    }
                }
                else if (status !== 'mojang' || status1 !== 'mc') {
                    message.reply('poprawne użycie: `.status <mojang/mc>`');
                }

            }
            else if (command.startsWith('.cat') || command.startsWith(".kot") || command.startsWith(".kiciusie") || command.startsWith(".kotek")) { 
                cat.msg(message, userLog);
            }
    }
});

client.login(config.apikeys.discord_token);
