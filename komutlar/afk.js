const Discord = require('discord.js');
const db = require('wio.db')

exports.run = async (client, message, args) => {
  let kullanıcı = message.guild.members.cache.get(message.author.id);
  let user = message.author
  let sebep = args.join(" ")
  const b = kullanıcı.displayName;
  if (!sebep) return message.channel.send(`:x: Bir sebep yazmalısın.`)
 
  db.set(`afk_${user.id}`, sebep)
  db.set(`afkAd_${user.id}` , b)
  message.channel.send(`:white_check_mark: Artık \`${sebep}\` sebebiyle AFK'sın.`).then(message => message.delete({ timeout: 5000}))
  message.member.setNickname(`[AFK]` +" "+ b)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'afk',
  description: "AFK olmanızı sağlar.",
  usage: 'afk <sebep>'
}
