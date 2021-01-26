const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(`7/24 Kodu Aktif Hale Getirildi!`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);

const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const db = require('wio.db');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  return permlvl;
};

client.login(process.env.token);


client.on("ready", () => {
  client.user.setPresence({
    game: { name: `Aniverse Galaxy`, type: "LISTENING" },
    status: "online"
  });
});

//BOT ROLÜ

client.on(`guildMemberAdd`, async member => {
  let botrol = ayarlar.botROL;
if(!member.bot) return;
member.addRole(botrol)
})

// BOT ROLÜ SON




// kayıtsız rolü

client.on(`guildMemberAdd`, async member => {
  let kayıtsızROL = ayarlar.kayıtsızROL;
if(member.bot) return;
member.addRole(kayıtsızROL)
})

/// kayıtsız rolü son



// TAG LOG
client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    let tag = ayarlar.tag
  
    let rol = ayarlar.tagROL;
    
    
    let embed1 = new Discord.MessageEmbed()
    .setDescription(`${newUser} ${tag} tagını aldığı için <@&${rol}> rolünü kazandı!`)
    .setImage('https://cdn.discordapp.com/attachments/620989964104237077/766391664163029012/RDF_Barrinha-1-2-1-1-1-1-1-1.gif')
    
    let embed2 = new Discord.MessageEmbed()
    .setDescription(`${newUser} ${tag} tagını çıkardığı için <@&${rol}> rolünü kaybetti!`)
    .setImage('https://cdn.discordapp.com/attachments/620989964104237077/766391664163029012/RDF_Barrinha-1-2-1-1-1-1-1-1.gif')
    
    if (newUser.username.includes(tag) && !client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).roles.has(rol)) {
      client.channels.get(ayarlar.tagLOG).send(embed1)
      client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).addRole(rol)
    } if (!newUser.username.includes(tag) && client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).roles.has(rol)) {
      client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).removeRole(rol)
      client.channels.get(ayarlar.tagLOG).send(embed2)
    }

  }
})




client.on('guildMemberAdd', async member => {
if(member.user.bot)
member.setRoles(['751193803691393084'])
})
 
  client.on("guildMemberAdd", member => { 
    const moment = require('moment');
  const kanal = ayarlar.giriskanal;
  let user = client.users.get(member.id);
  require("moment-duration-format");
    const tarih = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.MessageEmbed()
  let rol = ayarlar.kayıtsızROL
 member.addRole(rol)

  var kontrol;
if (tarih < 1296000000) kontrol = '<a:no1:756946138342621295> __**Bu Kullanıcı Şüpheli**__'
if (tarih > 1296000000) kontrol = '<a:tik3:756946140825649214> __**Bu Kullanıcı Güvenli**__'
  moment.locale("tr");
  let kanal1 = client.channels.get(kanal);
    let giris = new Discord.MessageEmbed()
   .setTitle(`<a:kraltac:740610303628279808> | \`Sunucuya Bir Üye Katıldı!\` | <a:kraltac:740610303628279808>`)
    .setDescription(`
• ** __Hoşgeldin! ${member}__ **

•  <a:pembeh:751553654561046619> **__Seninle Birlikte ${member.guild.memberCount} Kişiyiz.__ **

• \`{ ${ayarlar.tag} }\`** __Tagımızı alarak ekibimize katılabilirsin.__ **

• <a:alarm1:756946152938799225> ** <@&${ayarlar.yetkiliROL}> __seninle ilgilenicektir.__ **

• <a:sari3:751558669585612830> ** __Hesabın Oluşturulma Tarihi:__** \n • \` ${moment(member.user.createdAt).format("YYYY DD MMMM dddd (hh:mm:ss)")} \`

•  ${kontrol} 

• <a:duyur:766652129678721074> ** __ Ses teyit odasında kaydınızı yaptırabilirsiniz. __ ** 

`)
    .setThumbnail(member.user.avatarURL || 'https://cdn.discordapp.com/attachments/766342468576608318/766343451994226778/af8039261a387be71514bb4c2e5e54b5.gif')
    .setImage('https://cdn.discordapp.com/attachments/766342468576608318/766343451994226778/af8039261a387be71514bb4c2e5e54b5.gif')
    .setTimestamp()
kanal1.send(giris)
  });

client.on('message', async message => {
  
  let prefix = ayarlar.prefix
  let ann = await db.fetch(`afkAd_${message.author.id}`)
  let kullanıcı = message.mentions.users.first() || message.author
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
  let sebep = afkkullanıcı
  
 
  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;
  
  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`\`${message.author.tag}\` adlı kullanıcı artık AFK değil.`).then(message => message.delete({ timeout: 5000}))
      db.delete(`afk_${message.author.id}`)
      db.delete(`afkAd_${message.author.id}`)
      message.member.setNickname(ann)
    }
    if (afkkullanıcı) return message.channel.send(`${message.author}\`${kullanıcı.tag}\` şu anda AFK. Sebep : \`${sebep}\``).then(message => message.delete({ timeout: 15000}))
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`\`${message.author.tag}\` adlı kullanıcı artık AFK değil.`).then(message => message.delete({ timeout: 5000}))
      db.delete(`afk_${message.author.id}`)
      db.delete(`afkAd_${message.author.id}`)
      message.member.setNickname(ann)
    }
  }
});


client.on("message", message => {
  const chann = client.channels.cache.find(chann => chann.id === '801068004409999375')
  const log = client.channels.cache.find(ch => ch.id === '801068051864092674')
    if(message.channel.type === 'dm'){
       if(message.author.bot) return;
      setTimeout(function(){
        chann.send("Bir itiraf geldi!!!")
        chann.send(message.content)
      }, 2000)
      log.send(`**${message.author.username}** = ${message.content}
      `)
    
    }
    
});

client.on("message", msg => {
  if (msg.content.includes("p!itiraf")) {
    msg.delete();
  }
});

client.on("message", msg => {
          if(msg.author.bot) return;
          if(msg.mentions.has('EVERYONE')) return;
          if(msg.mentions.has(ayarlar.sahip)){
            msg.channel.send("**Nijerya l.Başbakanı**")
          }
          });

client.on("message", msg => {
          if(msg.author.bot) return;
          if(msg.mentions.has('525189546716037120')){
            msg.channel.send("**Eküri king is here...**")
          }
          });

client.on("message", msg => {
          if(msg.author.bot) return;
          if(msg.mentions.has('649076041012477963')){
            msg.channel.send("**İsveç kraliçesi leydi l.Berfin giriş yaptı.**")
          }
          });

client.on("message", msg => {
          if(msg.author.bot) return;
          if(msg.mentions.has('368816284944826378')){
            msg.channel.send("**Nijerya başbakanı EL Miko de Suoh.**")
          }
          });


client.login(process.env.token);