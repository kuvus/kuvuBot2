const Discord = require('discord.js');
const http = require('http');

var cat = {};

cat.msg = function (message, cfnc) {
    let args = message.content.split(" ").slice(1);
    let category1 = args[0];
    var category;
    if (category1 != undefined) {
        category = category1.toLowerCase();
    }
    switch (category) {
        case 'gif':
            cfnc(message.guild, message.author.username, 'command CAT_GIF');
            let optionsG = {
                host: 'api.kiciusie.pl',
                port: 80,
                path: '/index.php?type=get&mode=gif'
            };

            http.get(optionsG).on('response', function (response) {
                let cgif = '';
                response.on('data', function (chunk) {
                    cgif += chunk;
                });
                response.on('end', function () {
                    let obj_cgif = JSON.parse(cgif);
                    const embedG = new Discord.RichEmbed()
                        .setTitle('kuvuBot')
                        .setColor('#CC0066')
                        .setDescription('Random cat picture.')
                        .setFooter('© 2016-2017 kuvuBot Team')
                        .setThumbnail('https://cdn.discordapp.com/app-icons/205965155282976768/ea38f145269800017987c7252fd2b21a.png')
                        .setURL('https://bot.kuvus.pl')
                        .setImage(obj_cgif.url)
                        .addField('\u200b', '\u200b')
                    message.channel.sendEmbed(
                        embedG,
                        '',
                        { disableEveryone: true }
                    );
                });
            });
            break;
        case 'img':
            cfnc(message.guild, message.author.username, 'command CAT_IMG');
            let optionsI = {
                host: 'api.kiciusie.pl',
                port: 80,
                path: '/index.php?type=get&mode=image'
            };

            http.get(optionsI).on('response', function (response) {
                let cimg = '';
                response.on('data', function (chunk) {
                    cimg += chunk;
                });
                response.on('end', function () {
                    let obj_cimg = JSON.parse(cimg);
                    const embedI = new Discord.RichEmbed()
                        .setTitle('kuvuBot')
                        .setColor('#CC0066')
                        .setDescription('Random cat picture.')
                        .setFooter('© 2016-2017 kuvuBot Team')
                        .setThumbnail('https://cdn.discordapp.com/app-icons/205965155282976768/ea38f145269800017987c7252fd2b21a.png')
                        .setURL('https://bot.kuvus.pl')
                        .setImage(obj_cimg.url)
                        .addField('\u200b', '\u200b')
                    message.channel.sendEmbed(
                        embedI,
                        '',
                        { disableEveryone: true }
                    );
                });
            });
            break;
        default:
            message.channel.sendMessage(`<@${message.author.id}> ⚠️ **Poprawne użycie**: \`.kot (.cat, .kotek, .kiciusie) <gif/img>\``);
    }
}
module.exports = cat;