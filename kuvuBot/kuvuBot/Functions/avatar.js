const discord = require('discord.js');

var avatar = {};
avatar.msg = function (message, cfnc) {
    cfnc(message.guild, message.author.username, 'command AVATAR');
    let users = message.mentions.users;
    if (users.first()) {
        var isfirstembed = true;
        users.forEach(function (user) {
            let avatarf = user.avatarURL;
            const avatar_embed = new discord.RichEmbed()
                .setTitle('kuvuBot')
                .setColor('#00FF00')
                .setDescription(avatarf != null ? `Awatar użytkownika <@${user.id}>` : `Awatar użytkownika <@${user.id}> nie został ustawiony`)
                .addField("Link", avatarf == null ? 'Awatar tego użytkownika nie został ustawiony.' : avatarf)
                .setFooter('© 2016-2017 kuvuBot Team')
                .setThumbnail('https://cdn.discordapp.com/app-icons/205965155282976768/ea38f145269800017987c7252fd2b21a.png')
                .setURL('https://bot.kuvus.pl')
                .setImage(avatarf)
            message.channel.sendEmbed(
                avatar_embed,
                isfirstembed == true ? `<@${message.author.id}>` : '',
                { disableEveryone: true }
            );
            isfirstembed = false;
        });
    } else {
        let avatarf = message.author.avatarURL;
        const avatar_embed = new discord.RichEmbed()
            .setTitle('kuvuBot')
            .setColor('#00FF00')
            .setDescription(avatarf != null ? `Twój avatar` : `Nie ustawiłeś jeszcze avatara.`)
            .addField("Link", avatarf == null ? 'Twój avatar nie został jeszcze ustawiony.' : avatarf)
            .setFooter('© 2016-2017 kuvuBot Team')
            .setThumbnail('https://cdn.discordapp.com/app-icons/205965155282976768/ea38f145269800017987c7252fd2b21a.png')
            .setURL('https://bot.kuvus.pl')
            .setImage(avatarf)
            .addField('\u200b', '\u200b')
        message.channel.sendEmbed(
            avatar_embed,
            `<@${message.author.id}>`,
            { disableEveryone: true }
        );
    }
}
module.exports = avatar;