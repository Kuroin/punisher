const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
    let tag = ayarlar.tag
    const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let sesli = 0
    for (const [id, voiceChannel] of voiceChannels) sesli += voiceChannel.members.size;

    const embedsay = new Discord.MessageEmbed()
        .setTitle(`\`• ${message.guild.name} Sunucu İstatistikleri \` `)
        .setDescription(` 
         🦹‍♂️ • **__Sunucudaki üye sayısı__** \`${message.guild.memberCount}\`
         🦹‍♂️ • **__Çevrimiçi üye sayısı__** \`${message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status !== "offline").size}\`
         🦹‍♂️ • **__Seslideki üye sayısı__** \`${sesli}\`
         `)
        .setImage("https://i.pinimg.com/originals/af/80/39/af8039261a387be71514bb4c2e5e54b5.gif")
    message.channel.send(embedsay);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['total'],
    permLevel: 0
};

exports.help = {
    name: 'say'
}