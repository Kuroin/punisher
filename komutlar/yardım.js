const Discord = require('discord.js');

exports.run = async (client, message) => {
  const embed = new Discord.MessageEmbed()
        .setTimestamp()
        .setAuthor("Punisher",client.user.displayAvatarURL())
        .setColor("RANDOM")
        .setTitle("Punisher Bot")
        .setURL("https://discord.com/api/oauth2/authorize?client_id=801042657769816092&permissions=8&scope=bot")
        .setDescription(`**p!yardım**, ile komutları görebilirsiniz.`)
        .addField("p!afk","```Afk olduğunuzu belirtir.```")
        .addField("p!e ya da p!erkek","```Lord olarak kayıt eder.```")
        .addField("p!k ya da p!kadın"," ```Leydi olarak kayıt eder.```")
        .addField("p!tk"," ```Yetkilinin kayıt sayısını gösterir.```")
        .addField("p!say"," ```Üye sayısını gösterir.```")
        .addField('p!itiraf' ," ```Bot size özelden mesaj atar.İtirafınızı yazarsanız #itiraf kanalına isimsiz olarak itirafınızı yazar. ``` ")
        .addField("Destek Sunucusu",'[Link Tıkla](https://discord.gg/ahZxkZUCZw)')
        .setFooter("Punisher Sunucumuza Hoşgeldiniz!!!", client.user.displayAvatarURL())
        message.channel.send(embed)
  };
      
  
  exports.conf = {
    enabled: true,

    aliases: ['y','h','help'],
    permLevel: 0,
  };
  
  exports.help = {
    name: "yardım",
    description: " ",
    usage: "yardım",

  };