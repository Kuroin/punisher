const Discord = require("discord.js");
const db = require('wio.db');
const ayarlar = require('../ayarlar.json')


exports.run = async (client, message, args) => {

    let erkekROL = ayarlar.erkekROL 
    let kayıtsızROL = ayarlar.kayıtsızROL
    let yetkili = ayarlar.yetkiliROL
    let kayıtLOG = ayarlar.kayıtLOG

    if(!message.member.roles.cache.has(yetkili)) return message.channel.send('Bu işlemi sadece yetkililer yapabilir')


if(!args[0]) return message.channel.send(`Bir kişiyi etiketlemelisin.`)
  
let kullanıcı = message.mentions.users.first()
if(!kullanıcı) return message.channel.send(`${args[0]}, kullanıcısını sunucuda bulamıyorum.`)
if(kullanıcı.bot) return;
  
  
  
  const kurulus = new Date().getTime() - kullanıcı.createdAt.getTime();  
   var kontrol;
if (kurulus < 1296000000) kontrol = 'Şüpheli'
if (kurulus > 1296000000) kontrol = 'Güvenli'
  
  
const emb = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setThumbnail(client.user.avatarURL)
.setTimestamp()
.setColor(`#fffff0`)
.setFooter(`Kayıt Başarılı`)
let kız = db.fetch(`kız_${message.author.id}_${message.guild.id}`) 
let erkek = db.fetch(`erkek_${message.author.id}_${message.guild.id}`) 
let toplam = erkek+kız 
message.guild.members.cache.get(kullanıcı.id).roles.add(erkekROL)
message.guild.members.cache.get(kullanıcı.id).roles.remove(kayıtsızROL)
message.guild.members.cache.get(kullanıcı.id).send(emb.setDescription(`• Kaydın başarıyla ${message.author} tarafından yapıldı. \n • Kurallar kanalımızı okumayı unutma!`))
  db.set(`erkek_${message.author.id}_${message.guild.id}`, `1`)
  
let embed2 = new Discord.MessageEmbed()
.setTitle(`• Bir Kullanıcı Kayıt Oldu.`)
.setDescription(`
• **Kayıt Olan Kullanıcı:** ${kullanıcı}   
• **Verilen Rol:** <@&${erkekROL}>  
• **Bu Hesap:**    ${kontrol}   
• **Sunucumuz şu an**  ${message.guild.members.cache.size} ** kişi **
• **Kayıt eden:** ${message.author}  
• **{ ${message.author} } Toplam kayıt sayısı =**   ${toplam} 

• **    __Toplam Erkek Kaydı =   ${erkek}  Toplam Kız Kaydı=  ${kız} __  **  
`)
.setImage('https://i.pinimg.com/originals/af/80/39/af8039261a387be71514bb4c2e5e54b5.gif')



client.channels.cache.get(ayarlar.kayıtLOG).send(embed2)
let embed3 = new Discord.MessageEmbed()
.setTitle(`• Kayıt Başarıyla Tamamlandı!.`)
.setDescription(`
• **Kayıt Olan Kullanıcı:** ${kullanıcı} 
• **Verilen Rol:** <@&${erkekROL}>   
• **Bu Hesap:** \`   ${kontrol}   \` 
• **Sunucumuz şu an**  \` ${message.guild.members.cache.size} \`** kişi **
• **Kayıt eden:** ${message.author} \` 
`)
.setImage('https://i.pinimg.com/originals/af/80/39/af8039261a387be71514bb4c2e5e54b5.gif')
message.channel.send(embed3)


}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e'],
  permLevel: 0
};

exports.help = {
  name: 'erkek'
}