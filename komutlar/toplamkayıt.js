const Discord = require("discord.js");
const db = require('wio.db');


exports.run = async (client, message, args) => {
  let yetkili = message.author
  let kisi = message.mentions.users.first()
let erkek = db.fetch(`erkek_${message.author.id}_${message.guild.id}`) 
let kız = db.fetch(`kız_${message.author.id}_${message.guild.id}`) 
let toplam = erkek+kız 
if(!kisi){
  let erkek = db.fetch(`erkek_${message.author.id}_${message.guild.id}`)
let kız = db.fetch(`kız_${message.author.id}_${message.guild.id}`)
var embed = new Discord.MessageEmbed()

.setTitle(`• \`Kayıt Bilgileri\``)

.setDescription(`

•  **Yetkili :** ${yetkili} 

• **Toplam üye kayıt sayısı :** \` ${toplam} \`

• **Toplam kız kayıt sayısı :** \` ${kız} \`

• **Toplam erkek kayıt sayısı :** \` ${erkek} \`



`)
.setThumbnail(yetkili.avatarURL)
.setImage('https://cdn.discordapp.com/attachments/620989964104237077/766391664163029012/RDF_Barrinha-1-2-1-1-1-1-1-1.gif')
message.reply(embed)
}
  
  else{
      let erkek = db.fetch(`erkek_${kisi.id}_${message.guild.id}`)
let kız = db.fetch(`kız_${kisi.id}_${message.guild.id}`)
var embed = new Discord.MessageEmbed()

.setTitle(`• \`Kayıt Bilgileri\``)

.setDescription(`

•  **Yetkili :** ${kisi} 

• **Toplam üye kayıt sayısı :** \` ${toplam} \`

• **Toplam kız kayıt sayısı :** \` ${kız} \`

• **Toplam erkek kayıt sayısı :** \` ${erkek} \`



`)
.setThumbnail(yetkili.avatarURL)
.setImage('https://cdn.discordapp.com/attachments/620989964104237077/766391664163029012/RDF_Barrinha-1-2-1-1-1-1-1-1.gif')
message.reply(embed)
}
    
}



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['tk'],
  permLevel: 0
};

exports.help = {
  name: 'toplamkayıt'
};