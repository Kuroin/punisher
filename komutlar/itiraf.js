const Discord = require('discord.js');

exports.run = async (client, message) => {

    
  message.author.send("İtirafınızı giriniz:")
  

  };
  
  exports.conf = {
    enabled: true,

    aliases: ['itiraf'],
    permLevel: 0,
  };
  
  exports.help = {
    name: "conf",
    description: "Kişi sayısını söyler.",
    usage: "conf",

  };