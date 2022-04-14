const fs=require('fs');
const Discord=require("discord.js");
const client = new Discord.Client({
  fetchAllMembers: true,
  partials: ["MESSAGE", "USER", "REACTION"]
});
const db = require('quick.db')
const chalk = require("chalk");
const moment = require("moment");
const ayarlar=require("./ayarlar.json");
const express = require('express');
require('./util/eventloader')(client)
require('discord-buttons')(client)
const disbut = require('discord-buttons');
const Topgg = require('@top-gg/sdk')
const newUsers = [];

const api = new Topgg.Api(ayarlar.topgg);


const { GiveawaysManager } = require('discord-giveaways');
const ms = require("parse-ms");
const queue = new Map();
const canvacord = require("canvacord");
const Canvas = require("canvas");
const fetch = require('node-fetch')
/////


/////


//////////////////
client.on("message",async  message => {
  if (message.channel.type === "dm")
     { let prefix = ayarlar.prefix
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length)
  let params = message.content.split(' ').slice(1);
  let perms = client.yetkiler(message);
  let cmd;
   
  if (!client.commands.has(command)) {
    if (client.aliases.has(command)) {
    
    } else {
        
           let Crewembed = new Discord.MessageEmbed()
                .setDescription(`Komutlarımda **${command}** adında bir komut bulamadım! Komut listesine bakmak için:          
   **${prefix}yardım**`)
    message.channel.send(Crewembed).then(msg => {
    msg.delete({ timeout: 5000 })
  })
    }
  }
  
  
if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
           
    cmd = client.commands.get(client.aliases.get(command));
  }
     

  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
     cmd.run(client, message, params, perms,);
  
  }}
  else{   let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length)
  let params = message.content.split(' ').slice(1);
  let perms = client.yetkiler(message);
  let cmd;
   
  if (!client.commands.has(command)) {
    if (client.aliases.has(command)) {
    
    } 
      else {
         if(db.has(`yasakK_${message.guild.id}`) === true) {
  if(db.fetch(`yasakK_${message.guild.id}`).includes(command)) return message.channel.send('Bu komut bu sunucuda **yasaklanmıştır!**')}
            if(db.has(`komuti_${message.guild.id}`) === false) return;
          let Crewembed = new Discord.MessageEmbed()
                .setDescription(`Komutlarımda **${command}** adında bir komut bulamadım! Komut listesine bakmak için:          
   **${prefix}yardım**`)
    message.channel.send(Crewembed).then(msg => {
    msg.delete({ timeout: 5000 })
  })
    }
      
  }
  
  
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
           
    cmd = client.commands.get(client.aliases.get(command));
  }
      

  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
     cmd.run(client, message, params, perms,);
  }
       }
})


client.on("ready", () => {
  client.user.setPresence({
    status: "idle",
    activity: {
        name: `F⁉️ |!yardım |f-bot.cf`,
        type: "WATCHING"
    }
}); //PLAYING: WATCHING: LISTENING: STREAMING:// Can be 'available', 'idle', 'dnd', or 'invisible'
  console.log(`Bütün komutlar başarıyla yüklendi Developt by Emsalsiz!`);
 console.log(`${client.user.username} Aktif!`);
   console.log(`${client.user.username} şu an ${client.guilds.cache.size} adet servere ve  ${client.users.cache.size} adet kullanıcıya hizmet vermekte.`);
/*setInterval(() => {
          api.postStats({
            serverCount: client.guilds.cache.size
            })  
            
            }, 2400000)*/ //Bu KISIM TOP.GG YE SUNUCUNUN KAÇ SERVERDA OLDUĞUNU GÖNDERMEK İÇİN
    


});






const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yüklemeye hazırlanılıyor.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut ismi: ${props.help.name.toUpperCase()}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
fs.readdir("./events/", (err, files) => {
  if (err) console.log(err);

  let jsfile1 = files.filter(f => f.split(".").pop() === "js");
  if (jsfile1.length <= 0) {
    console.log("Could not find any events");
    return;
  }
  jsfile1.forEach(f => {
    const eventName = f.split(".")[0];
    console.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${f}`);

    client.on(eventName, event.bind(null, client));
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

  
client.yetkiler = message => {
  if(!message.guild) {
	return; }
  let permlvl = -ayarlar.varsayilanperm  ;
  if(message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
  if(message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if(message.member.hasPermission("MANAGE_GUILD")) permlvl = 4;
  if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 5;
  if(message.author.id === message.guild.ownerID) permlvl = 6;
  if(message.author.id === ayarlar.sahip) permlvl = 7;
  return permlvl;
};

///////////////////////////////KOMUTLAR//////////////////////////////
client.on('clickButton', async (button,message,guild) => {
  const { MessageEmbed } = require('discord.js'); //Define the discord.js module

const { MessageButton } = require('discord-buttons');
   
    
    
  if(button.id === "ev")
  {
    
       
  
await button.reply.defer(true); 
  var embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setTitle("Yardım Menüsü")
  .setDescription(`<@${button.clicker.id}> Yardım menüsüne hoş geldiniz . Umarım F-Bot'tan memnun kalmışsınızdır. 

• Sunucuma nasıl eklerim?
[Buraya tıklayarak](https://discord.com/oauth2/authorize?client_id=848551626780573716&scope=bot&permissions=4259314903) F-Bot'!'u sunucunuza ekleyebilirsin.

• Destek Sunucumuz
[Destek Sunucusuna](https://discord.gg/nnpAvPz) katılarak sizde güzel sohbetlere katılabilirsiniz!

• İnternet Sitesi
[İnternet Sitesine](https://f-bot.cf) bakabilirsiniz.

**Botun prefixini değiştirmek için -prefix**\n\n 🏠 > Ana Menü\n 🔧 > Moderasyon\n 🎈 > Eğlence\n 💠 > Logo\n ⚙️ > Ayarlar`)
  .setFooter(`F-Bot`,"https://cdn.discordapp.com/attachments/836533918760042508/871411306878615593/presF.png")
  .setThumbnail("https://cdn.discordapp.com/attachments/836533918760042508/871411604015677450/3t8ik7.gif")
  .setTimestamp();
    let button6 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('💠') 
  .setID('logo') 
      let button5 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('📑') 
  .setID('log') 
  let button4 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('🎈') 
  .setID('eğlence') 
let button3 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('🔧') 
  .setID('moderasyon') 
let button2 = new disbut.MessageButton()
  .setStyle('red')
  .setLabel('⚙️') 
  .setID('ayarlar') 
let button1 = new disbut.MessageButton()
  .setStyle('blurple')
  .setLabel('🏠') 
  .setID('ev') 
    


 button.message.edit(
{
buttons: [button1,button3,button4,button6,button2],
  embed: embed
})

    
  
    
  }
    if(button.id === "moderasyon")
  {
     
await button.reply.defer(true);
  var embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setTitle("Moderasyon Komutları")
  .setDescription(`
> [-mute](https://discord.gg/evnWJBzwsc) →  Etiketlediğin kişiye mute atar!
> [-unmute](https://discord.gg/evnWJBzwsc) →  Etiketlediğin kişinin mutesini açar!
> [-hgmesaj](https://discord.gg/evnWJBzwsc) →  Hoş geldin mesajını ayarlamanızı sağlar.
> [-hgdmmesaj](https://discord.gg/evnWJBzwsc) →  Hoş geldin mesajını ayarlamanızı sağlar.
> [-taç](https://discord.gg/evnWJBzwsc) → Sunucunun sahibini gösterir.
> [-sil](https://discord.gg/evnWJBzwsc) → Yazdığınız miktarda mesajı siler.
> [-ban](https://discord.gg/evnWJBzwsc) → Etiketlediğiniz kişiyi sunucudan banlarsınız.
> [-duyuru](https://discord.gg/evnWJBzwsc) → Bot yazdıgının mesajı duyuru yapar.
> [-otorol-aç](https://discord.gg/evnWJBzwsc) → Otorolü açar.
> [-otorol](https://discord.gg/evnWJBzwsc) → Otorol ayarlar.
> [-antispam](https://discord.gg/evnWJBzwsc) → Spam engelleyici.
> [-kilit](https://discord.gg/evnWJBzwsc) → Kanalı kitler.
> [-rr](https://discord.gg/evnWJBzwsc) → Tepki rolü ayarlar.
> [-rrdelete](https://discord.gg/evnWJBzwsc) → Ayarlanmış tepki rolünü siler.
 \n1️⃣🔧 > Moderasyon Sayfa 1
 2️⃣🔧 > Moderasyon Sayfa 2
📑 > Log Komutları`)
    .setFooter(`F-Bot | Moderasyon`,"https://cdn.discordapp.com/attachments/836533918760042508/871411306878615593/presF.png")
  .setThumbnail("https://cdn.discordapp.com/attachments/836533918760042508/871411604015677450/3t8ik7.gif")
  .setTimestamp();
    let button6 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('💠') 
  .setID('logo') 
      let button5 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('📑') 
  .setID('log') 
let button4 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('2️⃣🔧') 
  .setID('moderasyon2') 
let button3 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('1️⃣🔧') 
  .setID('moderasyon') 
let button2 = new disbut.MessageButton()
  .setStyle('red')
  .setLabel('⚙️') 
  .setID('ayarlar') 
let button1 = new disbut.MessageButton()
  .setStyle('blurple')
  .setLabel('🏠') 
  .setID('ev') 
    


 button.message.edit(
{
buttons: [button1,button3,button4,button5,button2],
  embed: embed
})

    
  

    
  }
      if(button.id === "moderasyon2")
  {
     
await button.reply.defer(true); 
  var embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setTitle("Moderasyon Komutları")
  .setDescription(`
> [-küfür](https://discord.gg/evnWJBzwsc) → Küfür engel sistemini açarsınız.
> [-reklam](https://discord.gg/evnWJBzwsc) → Reklam engel sistemi açarsınız.
> [-slowmode](https://discord.gg/evnWJBzwsc) → Yavaş modu ayarlarsınız. 
> [-unban](https://discord.gg/evnWJBzwsc) → Birisinin banını açarsınız.
> [-sa-as](https://discord.gg/evnWJBzwsc) →  Sa-As sistemini aktif eder.
> [-sunucubilgi](https://discord.gg/evnWJBzwsc) →  Sunucu hakkında bilgi verir.
> [-üyedurum](https://discord.gg/evnWJBzwsc) →  Sunucu üyeleri hakkında bilgi verir.
> [-kanalkoruma](https://discord.gg/evnWJBzwsc) →  Kanal koruma sistemini açar.
> [-rolkoruma](https://discord.gg/evnWJBzwsc) →  Rol koruma sistemini açar.
> [-çekiliş](https://discord.gg/evnWJBzwsc) →  Çekiliş yapar.
> [-etkitepki](https://discord.gg/evnWJBzwsc) →  Nasılsın,İyi geceler,günaydın gibi mesajlara cevap verir.
> [-nuke](https://discord.gg/evnWJBzwsc) → Kanala bomba atar.
> [-ticket-yardım](https://discord.gg/evnWJBzwsc) → Ticket sistemi yardım menüsünü açar.

 \n1️⃣🔧 > Moderasyon Sayfa 1
 2️⃣🔧 > Moderasyon Sayfa 2
📑 > Log Komutları`)
    .setFooter(`F-Bot | Moderasyon`,"https://cdn.discordapp.com/attachments/836533918760042508/871411306878615593/presF.png")
  .setThumbnail("https://cdn.discordapp.com/attachments/836533918760042508/871411604015677450/3t8ik7.gif")
  .setTimestamp();
    let button6 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('💠') 
  .setID('logo') 
      let button5 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('📑') 
  .setID('log') 
let button4 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('2️⃣🔧') 
  .setID('moderasyon2') 
let button3 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('1️⃣🔧') 
  .setID('moderasyon') 
let button2 = new disbut.MessageButton()
  .setStyle('red')
  .setLabel('⚙️') 
  .setID('ayarlar') 
let button1 = new disbut.MessageButton()
  .setStyle('blurple')
  .setLabel('🏠') 
  .setID('ev') 
    


 button.message.edit(
{
buttons: [button1,button3,button4,button5,button2],
  embed: embed
})

    
  

    
  }
        if(button.id === "log")
  {
     
await button.reply.defer(true);
  var embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setTitle("Log Komutları")
  .setDescription(`
> [-banlog](https://discord.gg/evnWJBzwsc) → Banlama logunu ayarlar.
> [-banaçmalog](https://discord.gg/evnWJBzwsc) → Ban açma logunu ayarlar.
> [-buglog](https://discord.gg/evnWJBzwsc) → Bug logunu ayarlar.
> [-emojiaçmalog](https://discord.gg/evnWJBzwsc) → Emoji Açma logunu ayarlar. 
> [-emojisilmelog](https://discord.gg/evnWJBzwsc) → Emoji Silme logunu ayarlar. 
> [-girişlog](https://discord.gg/evnWJBzwsc) → Giriş logunu ayarlar.
> [-çıkışlog](https://discord.gg/evnWJBzwsc) → Çıkış logunu ayarlar.  
> [-hoşgeldinlog](https://discord.gg/evnWJBzwsc) → Hoş geldin kanalını ayarlar.
> [-hgmesaj](https://discord.gg/evnWJBzwsc) →  Hoş geldin mesajını ayarlamanızı sağlar.
> [-hgdmmesaj](https://discord.gg/evnWJBzwsc) →  Hoş geldin DM mesajını ayarlamanızı sağlar.
> [-isimlog](https://discord.gg/evnWJBzwsc) → İsim log kanalı ayarlar.
\n1️⃣📑 > Log Sayfa 1
 2️⃣📑 > Log Sayfa 2`)
    .setFooter(`F-Bot | Log`,"https://cdn.discordapp.com/attachments/836533918760042508/871411306878615593/presF.png")
  .setThumbnail("https://cdn.discordapp.com/attachments/836533918760042508/871411604015677450/3t8ik7.gif")
  .setTimestamp();
    let button6 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('💠') 
  .setID('logo') 
        let button7 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('2️⃣📑') 
  .setID('log2') 
      let button5 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('1️⃣📑') 
  .setID('log') 

let button3 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('🔧') 
  .setID('moderasyon') 
let button2 = new disbut.MessageButton()
  .setStyle('red')
  .setLabel('⚙️') 
  .setID('ayarlar') 
let button1 = new disbut.MessageButton()
  .setStyle('blurple')
  .setLabel('🏠') 
  .setID('ev') 
    


 button.message.edit(
{
buttons: [button1,button3,button7,button2],
  embed: embed
})

    
  

    
  }
          if(button.id === "log2")
  {
     
await button.reply.defer(true); 
  var embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setTitle("Log Komutları")
  .setDescription(`
> [-kanalaçmalog](https://discord.gg/evnWJBzwsc) →  Kanal Açma logunu ayarlar. 
> [-kanalsilmelog](https://discord.gg/evnWJBzwsc) →  Kanal silme logunu ayarlar.
> [-mesajsilmelog](https://discord.gg/evnWJBzwsc) → Mesaj Silme logunu ayarlar.
> [-mesajgüncellemelog](https://discord.gg/evnWJBzwsc) → Mesaj Silme logunu ayarlar.
> [-rolaçmalog](https://discord.gg/evnWJBzwsc) → Rol Açma logunu ayarlar.
> [-rolsilmelog](https://discord.gg/evnWJBzwsc) → Rol Silme logunu ayarlar.
> [-rolgüncellemelog](https://discord.gg/evnWJBzwsc) → Rol Güncelleme logunu ayarlar.
> [-roldeğiştirmelog](https://discord.gg/evnWJBzwsc) → Rol Değiştirme logunu ayarlar.
> [-isimlog](https://discord.gg/evnWJBzwsc) → İsim Değiştirme logunu ayarlar.
> [-kanalkorumalog](https://discord.gg/evnWJBzwsc) → Kanal koruma logunu ayarlar 
> [-isteklog](https://discord.gg/evnWJBzwsc) → İstek logunu ayarlar.

\n1️⃣📑 > Log Sayfa 1
 2️⃣📑 > Log Sayfa 2`)
    .setFooter(`F-Bot | Log`,"https://cdn.discordapp.com/attachments/836533918760042508/871411306878615593/presF.png")
  .setThumbnail("https://cdn.discordapp.com/attachments/836533918760042508/871411604015677450/3t8ik7.gif")
  .setTimestamp();
    let button6 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('💠') 
  .setID('logo') 
        let button7 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('2️⃣📑') 
  .setID('log2') 
      let button5 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('1️⃣📑') 
  .setID('log') 

let button3 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('🔧') 
  .setID('moderasyon') 
let button2 = new disbut.MessageButton()
  .setStyle('red')
  .setLabel('⚙️') 
  .setID('ayarlar') 
let button1 = new disbut.MessageButton()
  .setStyle('blurple')
  .setLabel('🏠') 
  .setID('ev') 
    


 button.message.edit(
{
buttons: [button1,button3,button5,button2],
  embed: embed
})

    
  

    
  }
        if(button.id === "eğlence")
  {
     
await button.reply.defer(true); 
  var embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setTitle("Eğlence Komutları")
  .setDescription(`
> [-aşk-ölç](https://discord.gg/evnWJBzwsc) → Etiketlediğin kişinin aşkını ölçer.
> [-espri](https://discord.gg/evnWJBzwsc) → F-Bot senin için espiri yapar.
> [-düello](https://discord.gg/evnWJBzwsc) → Etiketlediğin kişiyle düello atarsın.
> [-balıktut](https://discord.gg/evnWJBzwsc) → Balık tutasın.
> [-ağla](https://discord.gg/evnWJBzwsc) → Bot U Ağlatırsınız.
> [-şanslısayım](https://discord.gg/evnWJBzwsc) → Şanslı sayını senin yerine bulur.
> [-wasted](https://discord.gg/evnWJBzwsc) → Yakalandın pislik herif.
> [-zarat](https://discord.gg/evnWJBzwsc) → Zar atar.
\n1️⃣🎈 > Eğlence Sayfa 1
 2️⃣🎈 > Eğlence Sayfa 2
😐 > Kullanıcı`)
    .setFooter(`F-Bot | Eğlence`,"https://cdn.discordapp.com/attachments/836533918760042508/871411306878615593/presF.png")
  .setThumbnail("https://cdn.discordapp.com/attachments/836533918760042508/871411604015677450/3t8ik7.gif")
  .setTimestamp();
    let button6 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('😐') 
  .setID('kullanıcı') 
        let button7 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('2️⃣🎈') 
  .setID('eğlence2') 
      let button5 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('1️⃣🎈') 
  .setID('eğlence') 

let button3 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('🔧') 
  .setID('moderasyon') 
let button2 = new disbut.MessageButton()
  .setStyle('red')
  .setLabel('⚙️') 
  .setID('ayarlar') 
let button1 = new disbut.MessageButton()
  .setStyle('blurple')
  .setLabel('🏠') 
  .setID('ev') 
    


 button.message.edit(
{
buttons: [button1,button5,button7,button6,button2],
  embed: embed
})
      }
            if(button.id === "eğlence2")
  {
     
await button.reply.defer(true);
  var embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setTitle("Eğlence Komutları")
  .setDescription(`
> [-emojiyazı](https://discord.gg/evnWJBzwsc) → Yazdığın mesajdan emojiyle yazı yazar.
> [-yazan-kazanır](https://discord.gg/evnWJBzwsc) → Etiketlediğin kişiyle yazan kazanır oynayabilirsiniz.
> [-duello](https://discord.gg/evnWJBzwsc) → Etiketlediğin kişiyle duello oynayabilirsiniz.
> [-adamasmaca](https://discord.gg/evnWJBzwsc) → Adam asmaca oyununu oynayabilirsiniz..
> [-twit](https://discord.gg/evnWJBzwsc) → Twit atar.
> [-insta](https://discord.gg/evnWJBzwsc) → İnstagram postu atar.
> [-şişe](https://discord.gg/evnWJBzwsc) → Şişe çevirmece oynatır.
> [-taşkağıtmakas](https://discord.gg/evnWJBzwsc) → Taş kağıt makas oyunu oynatır.
\n1️⃣🎈 > Log Sayfa 1
 2️⃣🎈 > Log Sayfa 2
😐 > Kullanıcı`)
    .setFooter(`F-Bot | Eğlence`,"https://cdn.discordapp.com/attachments/836533918760042508/871411306878615593/presF.png")
  .setThumbnail("https://cdn.discordapp.com/attachments/836533918760042508/871411604015677450/3t8ik7.gif")
  .setTimestamp();
    let button6 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('😐') 
  .setID('kullanıcı') 
        let button7 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('2️⃣🎈') 
  .setID('eğlence2') 
      let button5 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('1️⃣🎈') 
  .setID('eğlence') 

let button3 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('🔧') 
  .setID('moderasyon') 
let button2 = new disbut.MessageButton()
  .setStyle('red')
  .setLabel('⚙️') 
  .setID('ayarlar') 
let button1 = new disbut.MessageButton()
  .setStyle('blurple')
  .setLabel('🏠') 
  .setID('ev') 
    


 button.message.edit(
{
buttons: [button1,button5,button7,button6,button2],
  embed: embed
})
      }
            if(button.id === "kullanıcı")
  {
     
await button.reply.defer(true);
  var embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setTitle("Kullanıcı Komutları")
  .setDescription(`
> [-profil](https://discord.gg/evnWJBzwsc) → Kendinin profilini görürsünüz.
> [-ilet](https://discord.gg/evnWJBzwsc) → Yapımcıma yazdığınız yazıyı iletir!.
> [-roleinfo](https://discord.gg/evnWJBzwsc) → Yazdığın rolün bilgisini verir.. 
> [-toplamkomut](https://discord.gg/evnWJBzwsc) → Botta ne kadar komut oldunu gösterir.
> [-avatar](https://discord.gg/evnWJBzwsc) → Etiketlediğin birisinin avatarını gösterir.
> [-yetkilerim](https://discord.gg/evnWJBzwsc) → Hangi yetkilere sahip olduğunuzu gösterir.
> [-sunucuresmi](https://discord.gg/evnWJBzwsc) → Sunucu resmini gösterir.
> [-ping](https://discord.gg/evnWJBzwsc) → Botun Pingine Bakarsın. 
> [-davet](https://discord.gg/evnWJBzwsc) → beni sunucuna ekle.
> [-bug-bildir](https://discord.gg/evnWJBzwsc) → Yazdığınız bug'u yapımcılarıma bildirir.
> [-istek-kod](https://discord.gg/evnWJBzwsc) → Yazdığınız istek kodu yapımcılarıma bildirir.
> [-sunucu](https://discord.gg/evnWJBzwsc) → Sunucunun bilgilerini verir.`)
    .setFooter(`F-Bot | Kullanıcı`,"https://cdn.discordapp.com/attachments/836533918760042508/871411306878615593/presF.png")
  .setThumbnail("https://cdn.discordapp.com/attachments/836533918760042508/871411604015677450/3t8ik7.gif")
  .setTimestamp();
    let button6 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('💠') 
  .setID('logo') 
        let button7 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('2️⃣📑') 
  .setID('log2') 
      let button5 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('1️⃣📑') 
  .setID('log') 

let button3 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('🔧') 
  .setID('moderasyon') 
let button2 = new disbut.MessageButton()
  .setStyle('red')
  .setLabel('⚙️') 
  .setID('ayarlar') 
let button1 = new disbut.MessageButton()
  .setStyle('blurple')
  .setLabel('🏠') 
  .setID('ev') 
    


 button.message.edit(
{
buttons: [button1,button2],
  embed: embed
})

    
  

    
  }
            if(button.id === "logo")
  {
     
await button.reply.defer(true); 
  var embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setTitle("Logo Komutları")
  .setDescription(`
> [-grafiti](https://discord.gg/evnWJBzwsc) → grafiti logo oluşturur. 
> [-discord](https://discord.gg/evnWJBzwsc) → discord logo oluşturur. 
> [-gold](https://discord.gg/evnWJBzwsc) → gold logo oluşturur. 
> [-comic](https://discord.gg/evnWJBzwsc) → comic logo oluşturur. 
> [-bubble](https://discord.gg/evnWJBzwsc) → bubble logo oluşturur. 
> [-bubble2](https://discord.gg/evnWJBzwsc) → bubble2 logo oluşturur. 
> [-buz](https://discord.gg/evnWJBzwsc) → buz logosu oluşturur. 
> [-rainbow](https://discord.gg/evnWJBzwsc) → rainbow logo oluşturur. 
> [-scifi](https://discord.gg/evnWJBzwsc) → scifi logosu oluşturur. 
> [-bling](https://discord.gg/evnWJBzwsc) → bling logosu oluşturur. 
> [-redtext](https://discord.gg/evnWJBzwsc) → Kırmızı logo oluşturur. 
> [-mavitext](https://discord.gg/evnWJBzwsc) → Mavi logo oluşturur. 
\n1️⃣💠 > Logo Sayfa 1
 2️⃣💠 > Logo Sayfa 2
 3️⃣💠 > Logo Sayfa 3`)
    .setFooter(`F-Bot | Logo`,"https://cdn.discordapp.com/attachments/836533918760042508/871411306878615593/presF.png")
  .setThumbnail("https://cdn.discordapp.com/attachments/836533918760042508/871411604015677450/3t8ik7.gif")
  .setTimestamp();
      let button9 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('3️⃣💠') 
  .setID('logo3') 
     let button8 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('2️⃣💠') 
  .setID('logo2') 
    let button6 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('1️⃣💠') 
  .setID('logo') 
        let button7 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('2️⃣📑') 
  .setID('log2') 
      let button5 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('1️⃣📑') 
  .setID('log') 

let button3 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('🔧') 
  .setID('moderasyon') 
let button2 = new disbut.MessageButton()
  .setStyle('red')
  .setLabel('⚙️') 
  .setID('ayarlar') 
let button1 = new disbut.MessageButton()
  .setStyle('blurple')
  .setLabel('🏠') 
  .setID('ev') 
    


 button.message.edit(
{
buttons: [button1,button6,button8,button9,button2],
  embed: embed
})

    
  

    
  }
              if(button.id === "logo2")
  {
     
await button.reply.defer(true);
  var embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setTitle("Logo Komutları")
  .setDescription(`
> [-dinamik](https://discord.gg/evnWJBzwsc) → dinamik logo oluşturur. 
> [-altın](https://discord.gg/evnWJBzwsc) → altın logo oluşturur. 
> [-banner](https://discord.gg/evnWJBzwsc) → banner logo oluşturur. 
> [-basit](https://discord.gg/evnWJBzwsc) → basit logo oluşturur. 
> [-elmas](https://discord.gg/evnWJBzwsc) → elmas logo oluşturur. 
> [-neonmavi](https://discord.gg/evnWJBzwsc) → neonmavi logo oluşturur. 
> [-kalın](https://discord.gg/evnWJBzwsc) → kalın logo oluşturur. 
\n1️⃣💠 > Logo Sayfa 1
 2️⃣💠 > Logo Sayfa 2
 3️⃣💠 > Logo Sayfa 3`)
    .setFooter(`F-Bot | Logo`,"https://cdn.discordapp.com/attachments/836533918760042508/871411306878615593/presF.png")
  .setThumbnail("https://cdn.discordapp.com/attachments/836533918760042508/871411604015677450/3t8ik7.gif")
  .setTimestamp();
      let button9 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('3️⃣💠') 
  .setID('logo3') 
     let button8 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('2️⃣💠') 
  .setID('logo2') 
    let button6 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('1️⃣💠') 
  .setID('logo') 
        let button7 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('2️⃣📑') 
  .setID('log2') 
      let button5 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('1️⃣📑') 
  .setID('log') 

let button3 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('🔧') 
  .setID('moderasyon') 
let button2 = new disbut.MessageButton()
  .setStyle('red')
  .setLabel('⚙️') 
  .setID('ayarlar') 
let button1 = new disbut.MessageButton()
  .setStyle('blurple')
  .setLabel('🏠') 
  .setID('ev') 
    


 button.message.edit(
{
buttons: [button1,button6,button8,button9,button2],
  embed: embed
})

    
  

    
  }
                if(button.id === "logo3")
  {
     
await button.reply.defer(true); 
  var embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setTitle("Logo Komutları")
  .setDescription(`
> [-anime](https://discord.gg/evnWJBzwsc) → anime logo oluşturur. 
> [-habbo](https://discord.gg/evnWJBzwsc) → habbo logo oluşturur. 
> [-arrow](https://discord.gg/evnWJBzwsc) → arrow logo oluşturur. 
> [-green](https://discord.gg/evnWJBzwsc) → green logo oluşturur. 
> [-alev](https://discord.gg/evnWJBzwsc) → alev logo oluşturur. 
> [-red](https://discord.gg/evnWJBzwsc) → red logo oluşturur. 
> [-kalp](https://discord.gg/evnWJBzwsc) → kalp logo oluşturur. 
\n1️⃣💠 > Logo Sayfa 1
 2️⃣💠 > Logo Sayfa 2
 3️⃣💠 > Logo Sayfa 3`)
    .setFooter(`F-Bot | Logo`,"https://cdn.discordapp.com/attachments/836533918760042508/871411306878615593/presF.png")
  .setThumbnail("https://cdn.discordapp.com/attachments/836533918760042508/871411604015677450/3t8ik7.gif")
  .setTimestamp();
      let button9 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('3️⃣💠') 
  .setID('logo3') 
     let button8 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('2️⃣💠') 
  .setID('logo2') 
    let button6 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('1️⃣💠') 
  .setID('logo') 
        let button7 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('2️⃣📑') 
  .setID('log2') 
      let button5 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('1️⃣📑') 
  .setID('log') 

let button3 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('🔧') 
  .setID('moderasyon') 
let button2 = new disbut.MessageButton()
  .setStyle('red')
  .setLabel('⚙️') 
  .setID('ayarlar') 
let button1 = new disbut.MessageButton()
  .setStyle('blurple')
  .setLabel('🏠') 
  .setID('ev') 
    


 button.message.edit(
{
buttons: [button1,button6,button8,button9,button2],
  embed: embed
})

    
  

    
  }
                  if(button.id === "ayarlar")
  {
      if (button.channel.type === "dm") return;
    //ban log
    let banlogg = await db.fetch(`banlog_${button.guild.id}`)
    if(banlogg === null)
    {banlogg = "Ayarlanmamış"}
   else{let banlog = db.fetch(`banlog_${button.guild.id}`)
    banlogg = `<#`+banlog+`>`}
     //ban açma log
    let banaçmalog = await db.fetch(`banaçmalog_${button.guild.id}`)
    if(banaçmalog === null)
    {banaçmalog = "Ayarlanmamış"}
   else{let banlog = db.fetch(`banaçmalog_${button.guild.id}`)
    banaçmalog = `<#`+banlog+`>`}
    //mesajlog
     let mesajsilmelog = await db.fetch(`mesajsilmelog_${button.guild.id}`)
    if(mesajsilmelog === null)
    {mesajsilmelog = "Ayarlanmamış"}
    else{let mesajlog = db.fetch(`mesajsilmelog_${button.guild.id}`)
    mesajsilmelog = `<#`+mesajlog+`>`}
    //mesajlog
     let mesajgüncellemelog = await db.fetch(`mesajgüncellemelog_${button.guild.id}`)
    if(mesajgüncellemelog === null)
    {mesajgüncellemelog = "Ayarlanmamış"}
    else{let mesajlog = db.fetch(`mesajgüncellemelog_${button.guild.id}`)
    mesajgüncellemelog = `<#`+mesajlog+`>`}
      //rol Açma log
     let rolaçmalog = await db.fetch(`rolaçmalog_${button.guild.id}`)
    if(rolaçmalog === null)
    {rolaçmalog = "Ayarlanmamış"}
    else{let rollog = db.fetch(`rolaçmalog_${button.guild.id}`)
    rolaçmalog = `<#`+rollog+`>`}
        //rol Silme log
     let rolsilmelog = await db.fetch(`rolsilmelog_${button.guild.id}`)
    if(rolsilmelog === null)
    {rolsilmelog = "Ayarlanmamış"}
    else{let rollog = db.fetch(`rolsilmelog_${button.guild.id}`)
    rolsilmelog = `<#`+rollog+`>`}
     //rol Güncelleme log
     let rolgüncellemelog = await db.fetch(`rolgüncellemelog_${button.guild.id}`)
    if(rolgüncellemelog === null)
    {rolgüncellemelog = "Ayarlanmamış"}
    else{let rollog = db.fetch(`rolgüncellemelog_${button.guild.id}`)
    rolgüncellemelog = `<#`+rollog+`>`}
     //rol Değiştirme log
     let roldeğiştirmelog = await db.fetch(`roldeğiştirmelog_${button.guild.id}`)
    if( roldeğiştirmelog  === null)
    { roldeğiştirmelog  = "Ayarlanmamış"}
    else{let rollog = db.fetch(`roldeğiştirmelog_${button.guild.id}`)
     roldeğiştirmelog  = `<#`+rollog+`>`}
 
     //kanal log
     let kanallogg = await db.fetch(`klog_${button.guild.id}`)
    if(kanallogg === null)
    {kanallogg = "Ayarlanmamış"}
    else{let kanallog = db.fetch(`klog_${button.guild.id}`)
    kanallogg = `<#`+kanallog+`>`}
       //kanal korukma log
     let kalogg = await db.fetch(`kalog${button.guild.id}`)
    if(kalogg === null)
    {kalogg = "Ayarlanmamış"}
    else{let kalog = db.fetch(`kalog${button.guild.id}`)
    kalogg = `<#`+kalog+`>`}
     //istek
     let ilogg = await db.fetch(`ilog_${button.guild.id}`)
    if(ilogg === null)
    {ilogg = "Ayarlanmamış"}
    else{let ilog = db.fetch(`ilog_${button.guild.id}`)
    ilogg = `<#`+ilog+`>`}
      //isim
     let isimlog = await db.fetch(`isimlog_${button.guild.id}`)
    if(isimlog === null)
    {isimlog = "Ayarlanmamış"}
    else{let isimlog1 = db.fetch(`isimlog_${button.guild.id}`)
    isimlog = `<#`+isimlog1+`>`}
      //emoji açma log
     let emojiaçmalog = await db.fetch(`emojiaçmalog_${button.guild.id}`)
    if(emojiaçmalog === null)
    {emojiaçmalog = "Ayarlanmamış"}
    else{let elog1 = db.fetch(`emojiaçmalog_${button.guild.id}`)
    emojiaçmalog = `<#`+elog1+`>`}
       //emoji silme log
     let emojisilmelog = await db.fetch(`emojisilmelog_${button.guild.id}`)
    if(emojisilmelog === null)
    {emojisilmelog = "Ayarlanmamış"}
    else{let elog1 = db.fetch(`emojisilmelog_${button.guild.id}`)
    emojisilmelog = `<#`+elog1+`>`}
    //girişçıkış
     let gçlog = await db.fetch(`gçlog_${button.guild.id}`)
    if(gçlog === null)
    {gçlog = "Ayarlanmamış"}
    else{let gçlog1 = db.fetch(`gçlog_${button.guild.id}`)
    gçlog = `<#`+gçlog1+`>`}
     //hoşgeldin
     let hglog = await db.fetch(`hglog_${button.guild.id}`)
    if(hglog === null)
    {hglog = "Ayarlanmamış"}
    else{let hglog1 = db.fetch(`hglog_${button.guild.id}`)
    hglog = `<#`+hglog1+`>`}
     //giriş
     let girişlog = await db.fetch(`girişlog_${button.guild.id}`)
    if(girişlog === null)
    {girişlog= "Ayarlanmamış"}
    else{let gçlog1 = db.fetch(`girişlog_${button.guild.id}`)
    girişlog = `<#`+gçlog1+`>`}
     //gçıkış
     let çıkışlog = await db.fetch(`çıkışlog_${button.guild.id}`)
    if(çıkışlog === null)
    {çıkışlog = "Ayarlanmamış"}
    else{let gçlog1 = db.fetch(`çıkışlog_${button.guild.id}`)
    çıkışlog = `<#`+gçlog1+`>`}
         //kanal açma log
     let kanalaçmalog = await db.fetch(`kanalaçmalog_${button.guild.id}`)
    if(kanalaçmalog === null)
    {kanalaçmalog = "Ayarlanmamış"}
    else{let gçlog1 = db.fetch(`kanalaçmalog_${button.guild.id}`)
    kanalaçmalog= `<#`+gçlog1+`>`}
      //kanal silme log
     let kanalsilmelog = await db.fetch(`kanalsilmelog_${button.guild.id}`)
    if(kanalsilmelog === null)
    {kanalsilmelog = "Ayarlanmamış"}
    else{let gçlog1 = db.fetch(`kanalsilmelog_${button.guild.id}`)
    kanalsilmelog = `<#`+gçlog1+`>`}
      //hoşgeldin mesaj
     let hoşgeldinmesaj = await db.fetch(`hgmesaj_${button.guild.id}`)
    if(hoşgeldinmesaj === null)
    {hoşgeldinmesaj = "Ayarlanmamış"}
    else{let gçlog1 = db.fetch(`hgmesaj_${button.guild.id}`)
    hoşgeldinmesaj = `<#`+gçlog1+`>`}
      //hoşgeldin dm mesaj
     let hoşgeldindmmesaj = await db.fetch(`hgdmmesaj_${button.guild.id}`)
    if(hoşgeldindmmesaj === null)
    {hoşgeldindmmesaj = "Ayarlanmamış"}
    else{let gçlog1 = db.fetch(`hgdmmesaj_${button.guild.id}`)
    hoşgeldindmmesaj = `<#`+gçlog1+`>`}
    
    //kanalkoruma
      let kanalkoruma = await db.fetch(`kanalk_${button.guild.id}`)
    if(kanalkoruma === null)
    {kanalkoruma = `🔴Kapalı`}
    else{kanalkoruma = `🟢Açık`}
    //anti spam
     let antispam = await db.fetch(`antispam_${button.guild.id}`)
    if(antispam === null)
    {antispam = `🔴Kapalı`}
    else{antispam = `🟢Açık`}
    //rol koruma
      let rolk = await db.fetch(`rolk_${button.guild.id}`)
    if(rolk === null)
    {rolk = `🔴Kapalı`}
    else{rolk = `🟢Açık`}
    //küfür
     let küfürengel = await db.fetch(`küfürengel_${button.guild.id}`)
    if(küfürengel === null)
    {küfürengel = `🔴Kapalı`}
    else{küfürengel = `🟢Açık`}
    //reklam
       let reklam = await db.fetch(`reklamFiltre_${button.guild.id}`)
    if(reklam === null)
    {reklam = `🔴Kapalı`}
    else{reklam = `🟢Açık`}
    //seviye
     let seviye = await db.fetch(`seviyeacik_${button.guild.id}`)
    if(seviye === null)
    {seviye = `🔴Kapalı`}
    else{seviye = `🟢Açık`}
await button.reply.defer(true); 
  var embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setTitle("Ayarlar")
  //{ name: '\u200B', value: '\u200B' }, görünmez 1 satır yapmak için
  	.addFields(
      	{ name: '``Anti Spam``', value: `**${antispam}**`, inline: true },
		{ name: '``Kanal Koruma``', value: `**${kanalkoruma}**`, inline: true },
      		{ name: '``Rol Koruma``', value: `**${rolk}**`, inline: true },
      		{ name: '``Küfür Filtre``', value: `**${küfürengel}**`, inline: true },
      		{ name: '``Reklam Filtre``', value: `**${reklam}**`, inline: true },
      	{ name: '``Seviye Sistemi``', value: `**${seviye}**`, inline: true },
      { name: '\u200B', value: '\u200B' },
    { name: '``Ban``', value: `**Banlama Log:** ${banlogg} \n**Ban Açma Log:** ${banaçmalog}`, inline: true  },
      	{ name: '``Mesaj``', value: `**Mesaj Silme log:** ${mesajsilmelog} \n**Mesaj Edit Log:** ${mesajgüncellemelog}`, inline: true  },
         { name: '\u200B', value: '\u200B' },
       	{ name: '``Kanal``', value: `**Kanal Açma Log:** ${kanalaçmalog} \n**Kanal Silme Log:** ${kanalsilmelog}`, inline: true  },
      	{ name: '``Rol``', value: `**Rol Açma Log:** ${rolaçmalog} \n **Rol Silme Log:** ${rolsilmelog} \n**Rol Güncelleme Log:** ${rolgüncellemelog} \n **Rol Değiştirme Log:** ${roldeğiştirmelog}`, inline: true  },
     { name: '\u200B', value: '\u200B' },
   { name: '``Emoji``', value: `**Emoji Açma Log:** ${emojiaçmalog} \n**Emoji Silme Log:** ${emojisilmelog}`, inline: true  },
    { name: '``Giriş-Çıkış``', value: `**Giriş Log:** ${girişlog} \n**Çıkış Log:** ${çıkışlog} \n **Hoşgeldin Log:** ${hglog}`, inline: true  },
   { name: '\u200B', value: '\u200B' },
      { name: '``Diğer``', value: `**Kanal Koruma Log:** ${kalogg} \n **İstek Log:** ${ilogg} \n **İsim Log:** ${isimlog}`, inline: true  },
{ name: '``Mesajlar``', value: `**HG mesaj:** ${hoşgeldinmesaj} \n **HG dm mesaj:** ${hoşgeldindmmesaj}`, inline: true  },
	)
  


    .setFooter(`F-Bot | Ayarlar`,"https://cdn.discordapp.com/attachments/836533918760042508/871411306878615593/presF.png")
  .setThumbnail("https://cdn.discordapp.com/attachments/836533918760042508/871411604015677450/3t8ik7.gif")
  .setTimestamp();
      let button9 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('3️⃣💠') 
  .setID('logo3') 
     let button8 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('2️⃣💠') 
  .setID('logo2') 
    let button6 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('2️⃣💠') 
  .setID('logo') 
        let button7 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('2️⃣📑') 
  .setID('log2') 
      let button5 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('1️⃣📑') 
  .setID('log') 

let button3 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('🔧') 
  .setID('moderasyon') 
let button2 = new disbut.MessageButton()
  .setStyle('red')
  .setLabel('⚙️') 
  .setID('ayarlar') 
let button1 = new disbut.MessageButton()
  .setStyle('blurple')
  .setLabel('🏠') 
  .setID('ev') 
    


 button.message.edit(
{
buttons: [button1],
  embed: embed
})

    
  

    
  }
});
client.on("message", message => {
    if (message.channel.type === "dm") {
       
let Crewembed = new Discord.MessageEmbed()
         .setTitle(`${client.user.username}'a Özelden Mesaj Gönderildi!`)
         .setColor('RANDOM')
         .setTimestamp()
        .addField('Gönderilen Mesaj',` \`\`\` ${message.content}\`\`\` `)
         .addField('Mesajı Gönderen',message.author.tag)
        .addField('Mesajı Gönderenin ID',message.author.id)
        .setThumbnail(message.author.avatarURL({dynamic:true}))
        .setFooter(`F-Bot `,client.user.avatarURL({dynamic:true}))
    client.channels.cache.get('848874739984498689').send(Crewembed);
    }
});
client.on("message", async message => {
    if(message.author.bot) return;
      if (message.channel.type === "dm") return;
    let i = await db.fetch(`reklamFiltre_${message.guild.id}`)  
          if (i == 'acik') {
              const reklam = ["https://","http://","discord.gg",
      "discord.gg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"]
              if (reklam.some(word => message.content.toLowerCase().includes(word))) {
                try {
                  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                    message.delete();                                       
                      let Crewembed = new Discord.MessageEmbed()
                .setDescription(`<a:alertt:848517606788038666><@${message.author.id}> Reklam Yapmak Yasak!`)
                    return message.channel.send(Crewembed).then(msg => {
    msg.delete({ timeout: 10000 })
  })
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
          });    
//client.on("message", message => {
  //  const kufur =  ["mk", "amk", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "sex", "seks", "amına", "orospu çocuğu", "siktir git"];
  //  if (kufur.some(word => message.content.includes(word)) ) {
  //      message.reply("Küfürlü & Argolu kelimeler kullanma! ")
   //     message.delete()
  //  }
//});
///////////////////////////////////////////////////////////////////////////////////////////////
function getFirstTextChannel(guild) {
    const textchannels = guild.channels.cache.filter(channel => channel.type == 'text' && channel.rawPosition == 1);
    return textchannels.values().next().value;
}
client.on("guildCreate", guild => {
  const embo = new Discord.MessageEmbed()
.setTitle("F-Bot'u sunucunuza eklediğiniz için teşekkürler. Umarım memnun kalırsınız. ")
.setThumbnail("https://cdn.discordapp.com/attachments/836533918760042508/871411604015677450/3t8ik7.gif")
 .setDescription(`
• Sunucuma nasıl eklerim?
[Buraya tıklayarak](https://discord.com/oauth2/authorize?client_id=685189238332850256&scope=bot&permissions=4259314903) F-Bot'u sunucunuza ekleyebilirsin.

• Destek Sunucumuz
[Destek Sunucusuna](https://discord.gg/nnpAvPz) katılarak sizde güzel sohbetlere katılabilirsiniz!

• İnternet Sitesi
[İnternet Sitesine](https://f-bot.cf) bakabilirsiniz.
`)
.setTimestamp()
 .setFooter(`F-Bot`,"https://cdn.discordapp.com/attachments/836533918760042508/871411604015677450/3t8ik7.gif");
client.users.cache.get(guild.ownerID).send(embo).catch(err => console.log(err));
    getFirstTextChannel(guild).send(embo).catch(err => console.log(err));
  
})
client.on("message", async message => {
    if(message.author.bot) return;
     if (message.channel.type === "dm") return;
    let i = await db.fetch(`küfürengel_${message.guild.id}`)  
          if (i == 'acik') {
      const kufur = ["sg","oç","oçe","anan","ananı","ananı sikim","anneni sikim","anneni sikeyim","ananı sikeyim","annen","ağzına","ağzına sıçim","ağzına sıçayım","ağzına s","am","ambiti","amını","amını s","amcık","amcik","amcığını","amciğini","amcığını","amcığını s","amck","amckskm","amcuk","amına","amına k","amınakoyim","amına s","amunu","amını","amın oğlu","amın o","amınoğlu","amk","aq","amnskm","anaskm","ananskm","amkafa","amk çocuğu","amk oç","piç","amk ç","amlar","amcıklar","amq","amındaki","amnskm","ananı","anan","ananın am","ananızın","aneni","aneni s","annen","anen","ananın dölü","sperm","döl","anasının am","anası orospu","orospu","orosp,","kahpe","kahbe","kahße","ayklarmalrmsikerim","ananı avradını","avrat","avradını","avradını s","babanı","babanı s","babanın amk","annenin amk","ananın amk","bacı","bacını s","babası pezevenk","pezevenk","pezeveng","kaşar","a.q","a.q.","bitch","çük","yarrak","am","cibiliyetini","bokbok","bombok","dallama","göt","götünü s","ebenin","ebeni","ecdadını","gavat","gavad","ebeni","ebe","fahişe","sürtük","fuck","gotten","götten","göt","gtveren","gttn","gtnde","gtn","hassiktir","hasiktir","hsktr","haysiyetsiz","ibne","ibine","ipne","kaltık","kancık","kevaşe","kevase","kodumun","orosbu","fucker","penis","pic","porno","sex","sikiş","s1kerim","s1k","puşt","sakso","sik","skcm","siktir","sktr","skecem","skeym","slaleni","sokam","sokuş","sokarım","sokarm","sokaym","şerefsiz","şrfsz","sürtük","taşak","taşşak","tasak","tipini s","yarram","yararmorospunun","yarramın başı","yarramınbaşı","yarraminbasi","yrrk","zikeyim","zikik","zkym"];
              if (kufur.some(word => message.content.toLowerCase().includes(word))) {
                try {
                  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                    message.delete();   
                      let embed = new Discord.MessageEmbed()
                        .setDescription(`<@${message.author.id}> Küfür etmek Yasak!`)
                    return message.channel.send(embed).then(msg => {
    msg.delete({ timeout: 10000 })
  }) 
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
          });    
client.login(ayarlar.token)
/////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////
  client.on("ready", () => {
    
  client.channels.cache.get("685195850196058200").join();
}) 
//////////////////////////////////////////////////

client.on('guildDelete', guild => {

let Crewembed = new Discord.MessageEmbed()

.setColor("RED")
.setTitle(" Bot Bir sunucuda kicklendi ")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu ID", guild.id)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)
  .setThumbnail(guild.iconURL({dynamic:true}))

   client.channels.cache.get('848527865582452736').send(Crewembed);
  
});


client.on('guildCreate', guild => {

let Crewembed = new Discord.MessageEmbed()

.setColor("GREEN")
.setTitle(" Bot Bir sunucuya eklendi  ")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu ID", guild.id)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)
  .setThumbnail(guild.iconURL({dynamic:true}))
   client.channels.cache.get('848527865582452736').send(Crewembed);
  
});
client.on("messageDelete",async message => {
    if (message.channel.type === "dm") return;
if(db.has(`mesajsilmelog_${message.guild.id}`) === false) return;
           if (message.author.bot) return;
    const kayitk = await db.fetch(`mesajsilmelog_${message.guild.id}`);
  const kayitk2 = message.guild.channels.cache.find(channel => channel.id === kayitk );
  if (!kayitk2) return;
  const entry = await message.guild.fetchAuditLogs({type: 'messageDelete'}).then(audit => audit.entries.first())
  let user = ""
  let user1 = ""
  

    user = entry.executor.id
    user1 = entry.executor.username


  let Crewembed = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setTitle("Bir Mesaj Silindi")
  .setDescription(`${user1} adlı yetkili ${message.author.username} adlı kullanıcının ${message.channel.name} kanalına gönderdiği mesajı sildi!`)
  .setTimestamp()
  .addField("Silen Kişi", `<@!${user}>`, true)
  .addField("Mesajı Yazan", `<@!${message.author.id}>`, true)
  .addField("Mesaj Kanalı", `<#${message.channel.id}>`, true)
  .addField("Silinen Mesaj", "```" + message.content + "```")
  .setFooter("F-Bot |  Mod-Log",message.guild.iconURL({dynamic:true}))
  .setThumbnail(message.author.avatarURL({dynamic:true}))

  kayitk2.send(Crewembed);
  
  
  });


client.on("messageUpdate", async (oldMsg, newMsg , member) => {
   if (oldMsg.channel.type === "dm") return;

  if(db.has(`mesajgüncellemelog_${oldMsg.guild.id}`) === false) return;
  if (oldMsg.author.bot) return;

  var user = oldMsg.author;

     const kayitk = await db.fetch(`mesajgüncellemelog_${oldMsg.guild.id}`);
  const kayitk2 = oldMsg.guild.channels.cache.find(channel => channel.id === kayitk );
  if (!kayitk2) return;
  
 
  let Crewembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Bir Mesaj Düzenlendi!")
  .setDescription(`${oldMsg.author.username} adlı kullanıcı tarafından ${oldMsg.channel.name} kanalına gönderilen mesaj düzenlendi!`)
   .setTimestamp()
    .addField("Düzenleyen Kişi", `<@!${oldMsg.author.id}>`, true)
    .addField("Mesaj Kanalı", `<#${oldMsg.channel.id}>`, true)
    .addField("Eski Mesaj", "```" + oldMsg.content + "```")
    .addField("Yeni Mesaj", "```" + newMsg.content + "```")
    .setFooter(`F-Bot |  Mod-Log`,oldMsg.guild.iconURL({dynamic:true}))
  .setThumbnail(oldMsg.author.avatarURL({dynamic:true}))
  
  kayitk2.send(Crewembed);
  
  });



client.on("roleCreate", async  role  => {
     if(db.has(`rolaçmalog_${role.guild.id}`) === false) return;
  const kayitk = await db.fetch(`rolaçmalog_${role.guild.id}`);
  const kayitk2 = role.guild.channels.cache.find(channel => channel.id === kayitk );
  if (!kayitk2) return;
 const entry = await role.guild.fetchAuditLogs({type: 'roleCreate'}).then(audit => audit.entries.first())
  let user = ""
  let user1 = ""
  

    user = entry.executor.id
    user1 = entry.executor.username
  let Crewembed = new Discord.MessageEmbed()
   .setColor("RANDOM")
    .setAuthor(`Bir Rol Oluşturuldu!`, role.guild.iconURL())
    .setTimestamp()
  .addField("Yetkili:", `<@!${user}>`, true)
    .addField("Rol:", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu:", `${role.hexColor}`, true)
    .setFooter("F-Bot |  Mod-Log")
   kayitk2.send(Crewembed);
  
  
  });
client.on("roleDelete", async  role  => {
   if(db.has(`rolsilmelog_${role.guild.id}`) === false) return;
const kayitk = await db.fetch(`rolsilmelog_${role.guild.id}`);
  const kayitk2 = role.guild.channels.cache.find(channel => channel.id === kayitk );
  if (!kayitk2) return;
 const entry = await role.guild.fetchAuditLogs({type: 'roleDelete'}).then(audit => audit.entries.first())
  let user = ""
  let user1 = ""
  

    user = entry.executor.id
    user1 = entry.executor.username
  let Crewembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Kaldırıldı!`, role.guild.iconURL())
  .addField("Yetkili:", `<@!${user}>`, true)
    .addField("Rol", `\`${role.name}\``, true)
    .setTimestamp()
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
     .setFooter("F-Bot |  Mod-Log")
  kayitk2.send(Crewembed);
  
  
  });
client.on("roleUpdate", async  role  => {
   if(db.has(`rolgüncellemelog_${role.guild.id}`) === false) return;
const kayitk = await db.fetch(`rolgüncellemelog_${role.guild.id}`);
  const kayitk2 = role.guild.channels.cache.find(channel => channel.id === kayitk );
  if (!kayitk2) return;
 const entry = await role.guild.fetchAuditLogs({type: 'roleUpdate'}).then(audit => audit.entries.first())
  let user = ""
  let user1 = ""
  

    user = entry.executor.id
    user1 = entry.executor.username
  let Crewembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Güncellendi!`, role.guild.iconURL())
  .addField("Yetkili:", `<@!${user}>`, true)
    .addField("Rol", `\`${role.name}\``, true)
  .setTimestamp()
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
    .setFooter("F-Bot |  Mod-Log")
    kayitk2.send(Crewembed);
  
  
  });
client.on('guildBanAdd', async (guild, member)  => {
    if(db.has(`banaçmalog_${guild.id}`) === false) return;
const kayitk = await db.fetch(`banaçmalog_${guild.id}`);
  const kayitk2 = guild.channels.cache.find(channel => channel.id === kayitk );
  if (!kayitk2) return;
  const entry = await guild.fetchAuditLogs({type: 'guildBanAdd'}).then(audit => audit.entries.first())
  let user = ""
  let user1 = ""
  


    user = await entry.executor.id
    user1 = await entry.executor.username
    

  let Crewembed = new Discord.MessageEmbed()
  .setColor("RED")
.setAuthor(`${member.tag}`,member.avatarURL({dynamic:true}))
.setDescription(`**Bir üye Sunucudan Banlandı** <a:banned:848519280529506334> \n\nBanlayan Yetkili:<@${user}>\nBanlanan Kişi:${member}`)
  .setTimestamp()
  .setFooter("F-Bot")
  .setThumbnail(member.avatarURL({dynamic:true}))
 kayitk2.send(Crewembed);
  })

client.on("guildBanRemove", async (guild, member) => {
  if(db.has(`banlog_${guild.id}`) === false) return;
  const kayitk = await db.fetch(`banlog_${guild.id}`);
  const kayitk2 = guild.channels.cache.find(channel => channel.id === kayitk );
  if (!kayitk2) return;
    const entry = await guild.fetchAuditLogs({type: 'guildBanRemove'}).then(audit => audit.entries.first())
  let user = ""
  let user1 = ""
  

    user = await entry.executor.id
    user1 = await entry.executor.username
    
 
     let Crewembed = new Discord.MessageEmbed()
      .setColor("GREEN")
     .setAuthor(`${member.tag}`,member.avatarURL({dynamic:true}))
      .setDescription(`**Bir üyenin banı kaldırıldı** <a:krmznokta:848517611267817483> \n\nBanı Açan Yetkili:<@${user}>\nBanı açılan Kişi:${member}`)
       .setTimestamp()
      .setFooter("F-Bot")
  .setThumbnail(member.avatarURL({dynamic:true}))
  kayitk2.send(Crewembed);
  })




  

client.on("channelCreate", async channel => {
    if (channel.type === "dm") return;
  if(db.has(`kanalaçmalog_${channel.guild.id}`) === false) return;
  const kayitk = await db.fetch(`kanalaçmalog_${channel.guild.id}`);
  const kayitk2 = channel.guild.channels.cache.find(channel => channel.id === kayitk );
  if (!kayitk2) return;
 const entry = await channel.guild.fetchAuditLogs({type: 'channelCreate'}).then(audit => audit.entries.first())
  let user = ""
  let user1 = ""
  


    user = await entry.executor.id
    user1 = await entry.executor.username
  
    if (channel.type === "text") {
     let Crewembed = new Discord.MessageEmbed()
     .setAuthor(`Metin Kanalı Oluşturuldu!`)
        	.setColor('RANDOM')
				.setDescription(`<@${user}> adlı yetkili tarafından \`\`${channel.name}\`\` adlı metin kanal oluşturuldu.`)
				.setFooter(`F-Bot | Mod-Log Sistemi Kanal ID: ${channel.id}`)
      kayitk2.send(Crewembed);
    }
    if (channel.type === "voice") {
      let Crewembed = new Discord.MessageEmbed()
        .setColor('RANDOM')
 .setAuthor(`Ses Kanalı Oluşturuldu!`)
				.setDescription(`<@${user}> adlı yetkili tarafından \`\`${channel.name}\`\` adlı ses kanalı oluşturuldu!`)
				.setFooter(`F-Bot | Mod-Log Sistemi Kanal ID: ${channel.id}`)
   kayitk2.send(Crewembed);
    }
  });

client.on("channelDelete", async channel => {
  if(db.has(`kanalsilmelog_${channel.guild.id}`) === false) return;
 const kayitk = await db.fetch(`kanalsilmelog_${channel.guild.id}`);
  const kayitk2 = channel.guild.channels.cache.find(channel => channel.id === kayitk );
  if (!kayitk2) return;
    const entry = await channel.guild.fetchAuditLogs({type: 'channelDelete'}).then(audit => audit.entries.first())
  let user = ""
  let user1 = ""
  


    user = await entry.executor.id
    user1 = await entry.executor.username
    if (channel.type === "text") {
      let Crewembed = new Discord.MessageEmbed()
         .setAuthor(`Metin Kanalı Silindi!`)
      	.setColor('RANDOM')
				.setDescription(`<@${user}> adlı yetkili tarafından \`\`${channel.name}\`\` adlı metin kanalı silini!`)
				.setFooter(`F-Bot | Mod-Log Sistemi Kanal ID: ${channel.id}`)
       kayitk2.send(Crewembed);
    }
    if (channel.type === "voice") {
      let Crewembed = new Discord.MessageEmbed()
        .setColor('RANDOM')
      .setAuthor(`Ses Kanalı Silindi!`)
				.setDescription(`<@${user}> adlı yetkili tarafından \`\`${channel.name}\`\` adlı ses kanalı silindi`)
			.setFooter(`F-Bot | Mod-Log Sistemi  Kanal ID: ${channel.id}`)
        kayitk2.send(Crewembed);
    }
  });
  client.on("emojiCreate", async (emoji, member) => {
      if(db.has(`emojiaçmalog_${emoji.guild.id}`) === false) return;
    const fs = require("fs");
     const kayitk = await db.fetch(`emojiaçmalog_${emoji.guild.id}`);
  const kayitk2 = emoji.guild.channels.cache.find(channel => channel.id === kayitk );
  if (!kayitk2) return;
       const entry = await emoji.guild.fetchAuditLogs({type: 'emojiCreate'}).then(audit => audit.entries.first())
  let user = ""
  let user1 = ""
  


    user = await entry.executor.id
    user1 = await entry.executor.username
      let Crewembed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setAuthor(`Emoji Oluşturuldu!`)
      .setDescription(`<@${user}> adlı yetkili tarafından \`\`${emoji.name}\`\` adlı emoji oluşturuldu! \nEmoji id = ${emoji.id}`)
       .setFooter("F-Bot | Mod-log")
      
   kayitk2.send(Crewembed);
     })
  client.on("emojiDelete", async(emoji, member)  => {
      if(db.has(`emojisilmelog_${emoji.guild.id}`) === false) return;
    const fs = require("fs");
        const kayitk = await db.fetch(`emojisilmelog_${emoji.guild.id}`);
  const kayitk2 = emoji.guild.channels.cache.find(channel => channel.id === kayitk );
  if (!kayitk2) return;
        const entry = await emoji.guild.fetchAuditLogs({type: 'emojiDelete'}).then(audit => audit.entries.first())
  let user = ""
  let user1 = ""
  


    user = await entry.executor.id
    user1 = await entry.executor.username
      let Crewembed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setAuthor(`Emoji Silindi!`)
      .setDescription(`<@${user}> adlı yetkili tarafından \`\`${emoji.name}\`\` adlı emoji silindi! \nEmoji id = ${emoji.id}`)
     .setFooter("F-Bot | Mod-log")
   
   kayitk2.send(Crewembed);
     })
////////////////////////////////////////


 //////////////////////////////////////

//////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on('guildMemberAdd',async member  => {
     const moment = require('moment');
require('moment-duration-format');
  if(db.has(`girişlog_${member.guild.id}`) === false) return;
    
   
      var aylar = {
      "01": "Ocak",
      "02": "Şubat",
      "03": "Mart",
      "04": "Nisan",
      "05": "Mayıs",
      "06": "Haziran",
      "07": "Temmuz",
      "08": "Ağustos",
      "09": "Eylül",
      "10": "Ekim",
      "11": "Kasım",
      "12": "Aralık"
    }
     
 let kullanıcı = client.users.cache.get(member.id)
        const kayitk = await db.fetch(`girişlog_${member.guild.id}`);
  const kayitk2 = member.guild.channels.cache.find(channel => channel.id === kayitk );
      const hesap = new Date().getTime()- kullanıcı.createdAt.getTime();
  let durum;
  if (hesap < 2592000000) durum = 'Şüpheli'
  if (hesap > 2592000000) durum = 'Güvenli'
  if (!kayitk2) return;
  let Crewembed = new Discord.MessageEmbed()
   .setAuthor(`${member.user.tag}`,member.user.avatarURL({dynamic:true}))
  .setColor("GREEN")
   .setTimestamp()
  .setDescription(`<a:giris:848517612522569728>${member} sunucumuza katıldı. \n**Hesap durumu:** \`${durum}\` \n**Hesap tarihi: **\`${(`${moment(kullanıcı.createdAt).format('DD')} ${aylar[moment(kullanıcı.createdAt).format('MM')]} ${moment(kullanıcı.createdAt).format('YYYY HH:mm')}`)}\``)
 .setFooter("F-Bot")
 .setThumbnail(member.user.avatarURL({dynamic:true}))
 kayitk2.send(Crewembed);
  });
client.on('guildMemberAdd',async member  => {
     
  if(db.has(`hglog_${member.guild.id}`) === false) return;
    const kayitkk= await db.fetch(`hglog_${member.guild.id}`);
  const girişçıkışş = member.guild.channels.cache.find(channel => channel.id === kayitkk);
     const kayitkkk= await db.fetch(`hglogarka_${member.guild.id}`);
        if(kayitkkk === "resimli")
            {
  if(!member.guild) return;
      //create a new Canvas
      const canvas = Canvas.createCanvas(1772, 633);
      //make it "2D"
      const ctx = canvas.getContext('2d');
      //set the Background to the welcome.png
                const kayitresim = await db.fetch(`hglogarkaresim_${member.guild.id}`);
                
         if(db.has(`hglogarkaresim_${member.guild.id}`) === false) 
             {}
                else {const background1 = await Canvas.loadImage(kayitresim);}
     
      const background = await Canvas.loadImage(`./welcome.png`);
                      if(db.has(`hglogarkaresim_${member.guild.id}`) === false) 
             {}
                else {ctx.drawImage(background1, 0, 0, canvas.width, canvas.height);}
     
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#f2f2f2';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      //set the first text string 
      var textString3 = `${member.user.username}`;
      //if the text is too big then smaller the text
      if (textString3.length >= 14) {
        ctx.font = 'bold 100px Genta';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      //else dont do it
      else {
        ctx.font = 'bold 150px Genta';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      //define the Discriminator Tag
      var textString2 = `#${member.user.discriminator}`;
      ctx.font = 'bold 40px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString2, 730, canvas.height / 2 + 58);
      //define the Member count
      var textString4 = `Member #${member.guild.memberCount}`;
      ctx.font = 'bold 60px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString4, 750, canvas.height / 2 + 125);
      //get the Guild Name
      var textString4 = `${member.guild.name}`;
      ctx.font = 'bold 60px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString4, 700, canvas.height / 2 - 150);
      //create a circular "mask"
      ctx.beginPath();
      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
      ctx.closePath();
      ctx.clip();
      //define the user avatar
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
      //draw the avatar
      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
      //get it as a discord attachment
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
      //define the welcome embed
                //Mesaj
                 const mesajımız = await db.fetch(`hgmesaj_${member.guild.id}`);
           
  
      const welcomeembed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTimestamp()
        .setFooter("Hoş Geldin", member.guild.iconURL({ dynamic: true }))
        
       .setDescription(mesajımız ? mesajımız.replace('{kullanıcı}', `<@${member.id}>`) .replace('{sunucu}', `${member.guild.name}`): `<@${member.id}> **${member.guild.name} Adlı sunucumuza hoş geldin!**
Lütfen kuralları oku!`)
                               
    .setImage("attachment://welcome-image.png")
                
        .attachFiles(attachment);
      //define the welcome channel
   girişçıkışş.send(welcomeembed);   
                }
    else {
        const mesajımız1 = await db.fetch(`hgmesaj_${member.guild.id}`);
  girişçıkışş.send(mesajımız1 ? mesajımız1.replace('{kullanıcı}', `<@${member.id}>`) .replace('{sunucu}', `${member.guild.name}`): `<a:ucgen:764800411029995550>**${member.guild.name} Adlı sunucumuza hoş geldin!**<a:ucgen:764800411029995550>`);
        }

  });
client.on('guildMemberRemove',async member=> {
   if(db.has(`çıkışlog_${member.guild.id}`) === false) return;
        const kayitk = await db.fetch(`çıkışlog_${member.guild.id}`);
  const kayitk2 = member.guild.channels.cache.find(channel => channel.id === kayitk );
    if (!kayitk2) return;
   let Crewembed = new Discord.MessageEmbed()
   .setAuthor(`${member.user.tag}`,member.user.avatarURL({dynamic:true}))
  .setColor("RED")
   .setTimestamp()
  .setDescription(`<a:cks:848517612505006090>${member} sunucumuzdan ayrıldı.`)
 .setFooter("F-Bot")
 .setThumbnail(member.user.avatarURL({dynamic:true}))
 kayitk2.send(Crewembed);
  });




client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      let sa1 = await db.fetch(`ssaass_${msg.guild.id}`);
  if (sa1 == "acik") {
    if (
      msg.content.toLowerCase() == "sa" ||
      msg.content.toLowerCase() == "sea" ||
      msg.content.toLowerCase() == "selamun aleyküm"
    ) {
      try {
        return msg.reply("Aleyküm Selam İyi Eğlenceler");
      } catch (err) {
        console.log(err);
      }
    }
  }
  let sa = await db.fetch(`etkitepki_${msg.guild.id}`);
  if (sa == "acik") {
    if (
      msg.content.toLowerCase() == "nasılsın" ||
      msg.content.toLowerCase() == "nasılsın?" ||
      msg.content.toLowerCase() == "nasılsınnnn"
    ) {
      try {
        return msg.reply("**İyiyim Sen nasılsın?**");
      } catch (err) {
        console.log(err);
      }
    }
  } 
     
  if (sa == "acik") {
    if (
      msg.content.toLowerCase() == "günaydın" ||
      msg.content.toLowerCase() == "günaydın <3" ||
      msg.content.toLowerCase() == "günaydınnn"
    ) {
      try {
        return msg.reply("**Sanada Günaydın iyi Sabahlar <3**");
      } catch (err) {
        console.log(err);
      }
    }
  }
      if (sa == "acik") {
    if (
      msg.content.toLowerCase() == "iyi geceler" ||
      msg.content.toLowerCase() == "iyigeceler" ||
      msg.content.toLowerCase() == "iyi geceler <3"
    ) {
      try {
        return msg.reply("**Sanada iyi geceler <3**");
      } catch (err) {
        console.log(err);
      }
    }
  }
});





client.on("ready", async () => {
  
let dc = require("discord.js")
let cse = new dc.MessageEmbed()
.setTitle("F-Bot Yeniden başlatıldı")
.setColor("BLACK")
.setTimestamp()
 .setFooter("F-Bot")
.addField("Toplam Sunucu", client.guilds.cache.size)
.addField("Toplam Kanal", client.channels.cache.size)
.addField("Toplam Kullanıcı", client.users.cache.size)
.addField('Bellek kullanımı:', (process.memoryUsage().heapUsed / 2048 / 2048).toFixed(2))
.setThumbnail("https://cdn.discordapp.com/attachments/836533918760042508/871411604015677450/3t8ik7.gif")
client.channels.cache.get('871400828752257104').send(cse);
});

client.on('guildMemberAdd', async member => {
    if(db.has(`hgdmmesaj_${member.guild.id}`) === false) return;
  let mesajım = await db.fetch(`hgdmmesaj_${member.guild.id}`);
    let Crewembed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(mesajım ? mesajım.replace('{kullanıcı}', `<@${member.id}>`) .replace('{sunucu}', `${member.guild.name}`): `<@${member.id}> **${member.guild.name} Adlı sunucumuza hoş geldin!**
    Lütfen kuralları oku!`)
   
  .setFooter("F-Bot",member.guild.iconURL({dynamic:true}))
 .setThumbnail(member.guild.iconURL({dynamic:true}))
  member.send(Crewembed);

});



client.on('guildMemberAdd', async member => {
    if(db.has(`otorollog_${member.guild.id}`) === false) return;
  let rol = await db.fetch(`otorol_${member.guild.id}`)
 if (member.user.bot)
      {}
    else {member.roles.add(rol)}
  let rol2 = await db.fetch(`otorollog_${member.guild.id}`)
  const rolk2 = member.guild.channels.cache.find(channel => channel.id === rol2);
       let Crewembed = new Discord.MessageEmbed()
   .setAuthor(`${member.user.tag}`,member.user.avatarURL({dynamic:true}))
  .setColor("RANDOM")
   .setTimestamp()
  .setDescription(`<a:gen:811545751385538590>${member} adlı kişiye otorol verildi.`)
 .setFooter("F-Bot")
 .setThumbnail(member.user.avatarURL({dynamic:true}))
rolk2.send(Crewembed);

}); 


////////////////////kanal Koruma///////////////////////////////
client.on('channelDelete', (channel) => {
    if(db.has(`kanalk_${channel.guild.id}`) === false) return;
    let kategoriID = channel.parentID;
    channel.clone({ name: channel.name, reason: 'izinsiz silindi.' }).then(channels => {
    let ganal = channel.guild.channels.cache.find(channels=> channels.name === channel.name)
    //channels.setParent(channel.guild.channels.cache.find(channelss => channelss.id === kategoriID));
    
      let cfxu = new Discord.MessageEmbed()
                  .setTitle(`**F-Bot| Kanal Koruma Sistemi**`)
        .setColor("#00ff88")
          .setFooter(`F-Bot `,client.user.avatarURL({dynamic:true}))
        .setDescription(`Bu kanal silindi ve kanal koruma sistemi sayesinde başarıyla tekrardan açıldı!\nKanalın adı, kanalın konusu, kanalın kategorisi, kanalın izinleri başarıyla ayarlandı.`)
      channels.send(cfxu)
                    
  });
});
client.on("channelDelete", async channel => {
   if(db.has(`kanalk_${channel.guild.id}`) === false) return;
  let logs = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'});
   if(db.has(`kalog${channel.guild.id}`) === false) return;
  let cfxg = await db.fetch(`kalog${channel.guild.id}`)

  let cfxh = channel.guild.channels.cache.find(channels=> channels.id === cfxg)

  
 

    
    
    
      
        let cfxu = new Discord.MessageEmbed()
                  .setTitle(`**F-Bot| Kanal Koruma Sistemi**`)
        .setColor("#00ff88")
          .setFooter(`F-Bot `,client.user.avatarURL({dynamic:true}))
        .setDescription(`Kanal Koruma Sistemi Devrede \n\n**Kişi:**<@${channel.guild.member(logs.entries.first().executor).id}>  \n**Silmeye çalıştığı Kanal:** ${channel.name}`)  
      cfxh.send(cfxu)
        
      
  
        
  
});

client.on("roleDelete", async(role , channel , guild) => {
 
  
 if(db.has(`rolk_${role.guild.id}`) === false) return;

   let logs = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'});
 role.guild.roles.create({
  data: {
    name: role.name,
    color: role.color,
    permissions: role.permissions, 
  },
  reason: 'rol silindi tekrar açıldı',
})
  .catch(console.error);

       let Crewembed = new Discord.MessageEmbed()
                  .setTitle(`**F-Bot| Rol Koruma Sistemi**`)
        .setColor("#00ff88")
          .setFooter(`F-Bot `,client.user.avatarURL({dynamic:true}))
        .setDescription(`Rol Koruma Sistemi Devrede \n\n**Kişi:**<@${role.guild.member(logs.entries.first().executor).id}> \n**Silmeye çalıştığı Rol:** ${role.name}`) 
           role.guild.owner.send(Crewembed)
        



})

client.on("message", async message => {
  let prefix = ayarlar.prefix;
 if (message.channel.type === "dm") return;
  var id = message.author.id;
  var gid = message.guild.id;

  let hm = await db.fetch(`seviyeacik_${gid}`);

  let kanal1 = await db.fetch(`svlog_${gid}`);
    let kanal = message.guild.channels.cache.find(channels=> channels.id === kanal1)
  let xps = await db.fetch(`verilecekxp_${gid}`);
  let seviyerol = await db.fetch(`svrol_${gid}`);
  let rollvl = await db.fetch(`rollevel_${gid}`);

  if (!hm) return;
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  if (!lvl) {
 
    if (xps) {
      db.set(`xp_${id}_${gid}`, xps);
    }
    db.set(`xp_${id}_${gid}`, 4);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
  } else {
    if (xps) {
      db.add(`xp_${id}_${gid}`, xps);
    }
    db.add(`xp_${id}_${gid}`, 4);

    if (xp > xpToLvl) {
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(
        `xpToLvl_${id}_${gid}`,
        (await db.fetch(`lvl_${id}_${gid}`)) * 100
      );
      if (kanal) {
        client.channels.cache
          .get(kanal.id)
          .send(
            `<@${message.author.id}>` +
              "<a:dia4:687306212899160091> ** Seviye Atladı! Yeni seviyesi; `" +
              lvl +
              "` Tebrikler! :tada: **<a:dia4:687306212899160091>"
          );

      }
    
    }

    if (seviyerol) {
      if (lvl >= rollvl) {
        message.guild.member(message.author.id).addRole(seviyerol);
        if (kanal) {
          client.channels.cache
            .get(kanal.id)
            .send(
              `<@${message.author.id}>` +
                "<a:dia4:687306212899160091>** Yeni Seviyesi **" +
                rollvl +
                "**  seviyeye ulaştı ve " +
                seviyerol +
                " Rolünü kazandı! :tada: **<a:dia4:687306212899160091>"
            );
        }
      }
    }
  }

  
});



/*

const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
	warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
	muteThreshold: 7, // Amount of messages sent in a row that will cause a mute
	kickThreshold: 20, // Amount of messages sent in a row that will cause a kick.
	banThreshold: 100, // Amount of messages sent in a row that will cause a ban.
	maxInterval: 4000, // Amount of time (in milliseconds) in which messages are considered spam.
	warnMessage: '{@user}, Lütfen spamı bırak.', // Message that will be sent in chat upon warning a user.
	kickMessage: '**{user_tag}** Spamdan kicklendi.', // Message that will be sent in chat upon kicking a user.
	muteMessage: '**{user_tag}** Spamdan mutelendi.',// Message that will be sent in chat upon muting a user.
	banMessage: '**{user_tag}** Spamdan banlandı.', // Message that will be sent in chat upon banning a user.
	maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesKick: 18, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesBan: 22, // Amount of duplicate messages that trigger a warning.
	exemptPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
	ignoreBots: false, // Ignore bot messages.
	verbose: true, // Extended Logs from module.
	ignoredUsers: [], // Array of User IDs that get ignored.
	muteRoleName: "Muted", // Name of the role that will be given to muted users!
	removeMessages: true // If the bot should remove all the spam messages when taking action on a user!
	// And many more options... See the documentation.
});
client.on("message", async message => { 
    if(db.has(`antispam_${message.guild.id}`) === false) return;
    antiSpam.message(message); 
                            
                                  
                                  
                                  });
                                  */

const usersMap = new Map();
const LIMIT2 = 5;
const TIME = 10000;
const DIFF = 2000;
const LIMIT = 7;
const TIME2 = 10000;
const DIFF2 = 2000;
 
/*
'id' => {
msgCount: 0,
lastMessage: 'message',
timer: fn()
}
*/
client.on("message", async message => { 
  if(message.author.bot) return;
   if (message.channel.type === "dm") return;
   if(db.has(`antispam_${message.guild.id}`) === false) return;
   
if(usersMap.has(message.author.id)){
  const userData = usersMap.get(message.author.id);
  const { lastMessage, timer } = userData;
  const diffrence = message.createdTimestamp - lastMessage.createdTimestamp;
 
  if(diffrence > DIFF){
    clearTimeout(timer);
    
    userData.msgCount = 1
    userData.lastMessage = message;
    userData.timer = setTimeout(() => {
           usersMap.delete(message.author.id);

      
    },TIME);
    usersMap.set(message.author.id, userData);
  }
  else{
  let msgCount = usersMap.get(message.author.id).msgCount
 ++msgCount;

  if(parseInt(msgCount) === LIMIT){
      if (!message.member.hasPermission("ADMINISTRATOR") ){
      
     const kayitk = await db.fetch(`antispamr_${message.guild.id}`);  
  let role = ""
    if (kayitk === null){
        
    }
    else{
   
    role = message.guild.roles.cache.find(role => role.id === kayitk );
         message.member.roles.add(role)
    }
  
   
    message.channel.bulkDelete(LIMIT).then
    message.channel.send(`<@${message.author.id}>`+"Susturuldun")
      }
  }

  else{
       if(parseInt(msgCount) === LIMIT2){
            if (!message.member.hasPermission("ADMINISTRATOR") ){
         message.channel.bulkDelete(LIMIT2).then
        message.channel.send(`<@${message.author.id}>`+"Lütfen spamı bırak yoksa susturulucaksın")
                }
    }
    userData.msgCount = msgCount;
    usersMap.set(message.author.id, userData)
  }
    }
}
  else{
   
  let fn = setTimeout(() => {
      usersMap.delete(message.author.id);

      
      
    },TIME);
    usersMap.set(message.author.id, {
msgCount: 1,
lastMessage: message,
timer: fn     
});
  }
  
});
client.on("message", async message => { 
  if(message.author.bot) return;
    if (message.channel.type === "dm") return;
   if(db.has(`antispam_${message.guild.id}`) === false) return;
   
if(usersMap.has(message.author.id)){
  const userData = usersMap.get(message.author.id);
  const { lastMessage, timer } = userData;
  const diffrence = message.createdTimestamp - lastMessage.createdTimestamp;
 
  if(diffrence > DIFF){
    clearTimeout(timer);
    
    userData.msgCount = 1
    userData.lastMessage = message;
    userData.timer = setTimeout(() => {
           usersMap.delete(message.author.id);

      
    },TIME);
    usersMap.set(message.author.id, userData);
  }
  else{
  let msgCount = usersMap.get(message.author.id).msgCount
 ++msgCount;

  if(parseInt(msgCount) === LIMIT){
      if (!message.member.hasPermission("ADMINISTRATOR") ){
      
     const kayitk = await db.fetch(`antispamr_${message.guild.id}`);  
  let role = ""
    if (kayitk === null){
        
    }
    else{
   
    role = message.guild.roles.cache.find(role => role.id === kayitk );
         message.member.roles.add(role)
    }
  
   
    message.channel.bulkDelete(LIMIT).then
    message.channel.send(`<@${message.author.id}>`+"Susturuldun")
      }
  }

  else{
       if(parseInt(msgCount) === LIMIT2){
            if (!message.member.hasPermission("ADMINISTRATOR") ){
         message.channel.bulkDelete(LIMIT2).then
        message.channel.send(`<@${message.author.id}>`+"Lütfen spamı bırak yoksa susturulucaksın")
                }
    }
    userData.msgCount = msgCount;
    usersMap.set(message.author.id, userData)
  }
    }
}
  else{
   
  let fn = setTimeout(() => {
      usersMap.delete(message.author.id);

      
      
    },TIME);
    usersMap.set(message.author.id, {
msgCount: 1,
lastMessage: message,
timer: fn     
});
  }
  
});


          
client.on('guildMemberUpdate', async (oldMember, newMember) => {
  if(db.has(`roldeğiştirmelog_${oldMember.guild.id}`) === false) return;
   
    const kayitk = await db.fetch(`roldeğiştirmelog_${newMember.guild.id}`);
  const log = oldMember.guild.channels.cache.find(channel => channel.id === kayitk );
  if (!log) return;
  // declare changes
  var Changes = {
    unknown: 0,
    addedRole: 1,
    removedRole: 2,
    username: 3,
    nickname: 4,
    avatar: 5
  }
  var change = Changes.unknown
  // check if roles were removed
  
  var removedRole = ''
 oldMember.roles.cache.forEach((value) => {
 if (!newMember.roles.cache.find((role) => role.id === value.id)) {
  change = Changes.removedRole;
  removedRole = value;
    
 }
});
  // check if roles were added
  var addedRole = ''
newMember.roles.cache.forEach((value) => {
 if (!oldMember.roles.cache.find((role) => role.id === value.id)) {
  change = Changes.addedRole;
  addedRole = value;
 }
  
    
    
});
  // check if roles were removed

  // check if username changed
  if (newMember.user.username != oldMember.user.username) {
    change = Changes.username
  }
  // check if nickname changed
  if (newMember.nickname != oldMember.nickname) {
    change = Changes.nickname
  }
  // check if avatar changed
  if (newMember.user.avatarURL != oldMember.user.avatarURL) {
    change = Changes.avatar
  }
  // post in the guild's log channel
       const entry = await newMember.guild.fetchAuditLogs({type: 'guildMemberUpdate'}).then(audit => audit.entries.first())
  let user = ""
  let user1 = ""
  

    user = entry.executor.id
    user1 = entry.executor.username
  if (log != null) {
        if(db.has(`roldeğiştirmelog_${oldMember.guild.id}`) === true) {
    switch (change) {
      case Changes.unknown:

        break
      case Changes.addedRole:
             const Embed2 = new Discord.MessageEmbed()
               Embed2.setColor("GREEN");
        Embed2.setAuthor(newMember.user.tag, newMember.user.avatarURL({dynamic:true}));
       Embed2.setTimestamp()
    Embed2.setFooter(`F-Bot`)
     Embed2.setThumbnail(newMember.user.avatarURL({dynamic:true}))
            
         
        // Looping through the role and checking which role was removed.
 
              Embed2.setDescription(`${user1} adlı yetkili ${newMember.user.username} adlı kişinin rollerini değiştirildi \n\nYetkili: <@${user}>\nRolü Değiştirilen Kişi: <@${newMember.user.id}>\nEklenen Rol: ${addedRole}`);
             log.send(Embed2)
          
        break
      case Changes.removedRole:
              const Embed3 = new Discord.MessageEmbed()
        
               Embed3.setColor("RED");
        Embed3.setAuthor(newMember.user.tag, newMember.user.avatarURL({dynamic:true}));
       Embed3.setTimestamp()
    Embed3.setFooter(`F-Bot`)
     Embed3.setThumbnail(newMember.user.avatarURL({dynamic:true}))
         
        // Looping through the role and checking which role was removed.
 
              Embed3.setDescription(`${user1} adlı yetkili ${newMember.user.username} adlı kişinin rollerini değiştirildi \n\nYetkili: <@${user}>\nRolü Değiştirilen Kişi: <@${newMember.user.id}>\nSilinen Rol: ${removedRole}`);
            log.send(Embed3)
            
        break
            }
        }
    
                   
     
  }
})
client.on('guildMemberUpdate', async (oldMember, newMember) => {
  if(db.has(`isimlog_${oldMember.guild.id}`) === false) return;
      const kayitkk = await db.fetch(`isimlog_${newMember.guild.id}`);
  const log2 = oldMember.guild.channels.cache.find(channel => channel.id === kayitkk );
 
  if (!log) return;
  // declare changes
  var Changes = {
    unknown: 0,
    addedRole: 1,
    removedRole: 2,
    username: 3,
    nickname: 4,
    avatar: 5
  }
  var change = Changes.unknown
  // check if roles were removed
  
  var removedRole = ''
 oldMember.roles.cache.forEach((value) => {
 if (!newMember.roles.cache.find((role) => role.id === value.id)) {
  change = Changes.removedRole;
  removedRole = value;
    
 }
});
  // check if roles were added
  var addedRole = ''
newMember.roles.cache.forEach((value) => {
 if (!oldMember.roles.cache.find((role) => role.id === value.id)) {
  change = Changes.addedRole;
  addedRole = value;
 }
  
    
    
});
  // check if roles were removed

  // check if username changed
  if (newMember.user.username != oldMember.user.username) {
    change = Changes.username
  }
  // check if nickname changed
  if (newMember.nickname != oldMember.nickname) {
    change = Changes.nickname
  }
  // check if avatar changed
  if (newMember.user.avatarURL != oldMember.user.avatarURL) {
    change = Changes.avatar
  }
  // post in the guild's log channel
       const entry = await newMember.guild.fetchAuditLogs({type: 'guildMemberUpdate'}).then(audit => audit.entries.first())
  let user = ""
  let user1 = ""
  

    user = entry.executor.id
    user1 = entry.executor.username

     
           switch (change) {
      case Changes.username:
   
            const Embed6 = new Discord.MessageEmbed()
                  Embed6.setColor("BLACK");
        Embed6.setAuthor(newMember.user.tag, newMember.user.avatarURL({dynamic:true}));
       Embed6.setTimestamp()
    Embed6.setFooter(`F-Bot`)
     Embed6.setThumbnail(newMember.user.avatarURL({dynamic:true}))
             Embed.setDescription( `${user1} adlı yetkili ${newMember.user.username} adlı kişinin ismi değiştirildi \n\nYetkili: <@${user}>\nİsmi Değiştirilen Kişi: <@${newMember.user.id}>\nEski İsmi: **${oldMember.user.username}${oldMember.user.discriminator}**    Yeni İsmi: **${ newMember.user.username}${ newMember.user.discriminator}**` )
        log2.send(Embed6)
        break
      case Changes.nickname:
            
            let yeniisim = ""
          if(newMember.nickname === null)
              {yeniisim = newMember.user.username}
            else{yeniisim = newMember.nickname}
                   let eskiisim = ""
          if(oldMember.nickname === null)
              {eskiisim = newMember.user.username}
            else{eskiisim = oldMember.nickname}
                  const Embed = new Discord.MessageEmbed()
        Embed.setColor("BLACK");
        Embed.setAuthor(newMember.user.tag, newMember.user.avatarURL({dynamic:true}));
       Embed.setTimestamp()
    Embed.setFooter(`F-Bot`)
     Embed.setThumbnail(newMember.user.avatarURL({dynamic:true}))
             Embed.setDescription( `${user1} adlı yetkili ${newMember.user.username} adlı kişinin ismi değiştirildi \n\nYetkili: <@${user}>\nİsmi Değiştirilen Kişi: <@${newMember.user.id}>\nEski İsmi: **${eskiisim}**    Yeni İsmi: **${yeniisim}**` )
        log2.send(Embed)
        break
             
         
      case Changes.avatar:
                      const Embed5 = new Discord.MessageEmbed()
        Embed5.setColor("BLACK");
        Embed5.setAuthor(newMember.user.tag, newMember.user.avatarURL({dynamic:true}));
       Embed5.setTimestamp()
    Embed5.setFooter(`F-Bot`)
     Embed5.setThumbnail(newMember.user.avatarURL({dynamic:true}))
             Embed5.setDescription( `${user1} adlı yetkili ${newMember.user.username} adlı kişinin ismi değiştirildi \n\nYetkili: <@${user}>\nİsmi Değiştirilen Kişi: <@${newMember.user.id}>\nEski PP: ${oldMember.avatarURL}    Yeni PP: ${newMember.avatarURL}` )
        log2.send(Embed5)
     
        break
    }
                   
     
  
})   
/*
client.on("message", async message => { 
    if (message.channel.type === "dm") return;
     if (!message.guild) return;
db.add(`${message.guild.id}${message.author.id}s`,1)
})
client.on("message", async message => { 
    if (message.channel.type === "dm") return;
     if (!message.guild) return;
     let prefix1 = await db.fetch(`prefix_${message.guild.id}`);
    if (prefix1 == null) prefix1 = ayarlar.prefix
    if(message.content==`${prefix1}mesajlar`){
        let s =  db.get(`${message.guild.id}${message.author.id}s`)
      let s2 = s
     const embed= new Discord.MessageEmbed()
     .setTitle('Mesaj Sayısı')
     .setDescription(`Mesaj Sayısı:${s2}`)
     .setColor('BLUE')
     message.channel.send(embed)
     
    }
   
})
*/
if(!db.get("giveaways")) db.set("giveaways", []);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {

    async getAllGiveaways(){
        return db.get("giveaways");
    }

    async saveGiveaway(messageID, giveawayData){
        db.push("giveaways", giveawayData);
        return true;
    }

    async editGiveaway(messageID, giveawayData){
        const giveaways = db.get("giveaways");
        const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
        newGiveawaysArray.push(giveawayData);
        db.set("giveaways", newGiveawaysArray);
        return true;
    }

    async deleteGiveaway(messageID){
        const newGiveawaysArray = db.get("giveaways").filter((giveaway) => giveaway.messageID !== messageID);
        db.set("giveaways", newGiveawaysArray);
        return true;
    }
  
  
};
const manager = new GiveawayManagerWithOwnDatabase(client, {
  storage: false,
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: "#0a99ff",
    reaction: "🎉"
  }
});
client.on('messageReactionAdd', async (reaction, user, channel) => {
       let message = reaction.message;
    if (message.channel.type === "dm") return;
  let member = message.guild.members.cache.get(user.id);
      if(db.has(`ticketrolereactions_${message.guild.id}_${message.id}`) === false) return;
    if (user.bot) return;
    const data = require("quick.db");

     let roleObject = db.fetch(`ticketrolereactions_${message.guild.id}_${message.id}`);
     let emoji = reaction.emoji.toString();
    if (emoji === roleObject.emoji) {
       
        if (roleObject) {
           
           
            
                console.log('Creating ticket');
                try {
                     const author = reaction.users.cache.last();
        
             const sd = await data.fetch(`ass.${message.guild.id}.${member}`);

          data.add(`numara.${message.guild.id}`, 1);
          const as = await data.fetch(`numara.${message.guild.id}`);
          message.guild.channels.create(`ticket-${as}`).then(async s => {
            data.add(`numara.${s.id}`, as);
            data.set(`ass.${message.guild.id}.${member}`, s.id);
            data.set(
              `asd.${message.guild.id}.${s.id}.${member}`,
              "ticketaçma"
            );
            let role = message.guild.roles.cache.find(
              r => r.name === "@everyone"
            );
            s.createOverwrite(role, { VIEW_CHANNEL: false });
            message.guild.members.cache.forEach(u => {
              if (u.hasPermission("MANAGE_CHANNELS")) {
                s.createOverwrite(u, {
                  VIEW_CHANNEL: true,
                  SEND_MESSAGES: true,
                  MANAGE_MESSAGES: true,
                  MANAGE_CHANNELS: true
                });
              }
            });
            s.createOverwrite(author, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
            });
            s.send(
              `${member}, Hoşgeldin!`,
              new Discord.MessageEmbed()
                .setColor("BLACK")
                .setDescription(
                  `Çok yakın zaman da seninle ilgileneceğiz.
Bileti kapatmak istersen: 🔒`
                )
                .setFooter(`Destek Sistem`, client.user.avatarURL)
            ).then(m => {
              m.react(`🔒`);
              let si = (reaction, user) =>
                reaction.emoji.name === "🔒" && user.id !== client.user.id;
              let s23 = m.createReactionCollector(si, { time: 0 });

              s23.on("collect", async reaction => {
                const author = reaction.users.cache.last();
                reaction.users.remove(author.id);
                m.react(`✅`);
                m.react(`❌`);
                let sil = (reaction, user) =>
                  reaction.emoji.name === "✅" && user.id !== client.user.id;
                let sill = m.createReactionCollector(sil, { time: 0 });
                let ss = (reaction, user) =>
                  reaction.emoji.name === "❌" && user.id !== client.user.id;
                let s2 = m.createReactionCollector(ss, { time: 0 });
                s2.on("collect", async reaction => {
                  s.messages.fetch({ limit: 10 }).then(async messages => {
                    messages
                      .get(m.id)
                      .reactions.cache.get("✅")
                      .removeAll();
                    reaction.users.removeAll();
                  });
                });
                sill.on("collect", async reaction => {
                  let us = reaction.users.cache.last();
                  reaction.users.remove(us.id);
                  s.send(
                    new Discord.MessageEmbed()
                      .setColor("BLACK")
                      .setDescription(`Bilet ${us} tarafından kapatıldı.`)
                  );
                  s.setName(`closed-${as}`);
                  s.send(
                    new Discord.MessageEmbed().setColor(`#00ff00`)
                      .setDescription(`:unlock: Ticketi tekrar açar.

:no_entry:: Ticketi siler.`)
                  ).then(m2 => {
                    m2.react("🔓");
                    m2.react("⛔");
                    let sil = (reaction, user) =>
                      reaction.emoji.name === "⛔" &&
                      user.id !== client.user.id;
                    let sill = m2.createReactionCollector(sil, { time: 0 });
                    let geri = (reaction, user) =>
                      reaction.emoji.name === "🔓" &&
                      user.id !== client.user.id;
                    let geriaç = m2.createReactionCollector(geri, { time: 0 });

                    geriaç.on("collect", async reaction => {
                      const author = reaction.users.cache.last();
                      m2.delete({ timeout: 5000 });
                      reaction.users.remove(author.id);
                      s.send(
                        new Discord.MessageEmbed()
                          .setColor(`#00ff00`)
                          .setDescription(
                            `Bilet <@${member}> tarafından tekrar açıldı.`
                          )
                      );
                      s.setName(`ticket-${as}`);
                    });

                    sill.on("collect", async reaction => {
                      const author = reaction.users.cache.last();
                      reaction.users.remove(author.id);
                      s.send(
                        new Discord.MessageEmbed()
                          .setColor(`#ee7621`)
                          .setDescription(
                            `Bilet 5 saniye sonra tamamen silinecek.`
                          )
                      );
                      setTimeout(async () => {
                        s.delete();
                        const sd = await data.fetch(
                          `ass.${message.guild.id}.${member}`
                        );
                        data.delete(`asd.${message.guild.id}.${member}`);
                        data.delete(
                          `asd.${message.guild.id}.${s.id}.${member}`
                        );
                      }, 5000);
                    });
                  });
                });
              });
            });
          });   } catch (err) {
                    console.log(err);
                    client.users.cache.get("422432559830401027").send(err);
                }
            
        } else {
            console.log('No ticket config found!');
        }
   }  else if (reaction.emoji.name === '🔒') { 
        const ticket = await Ticket.findOne({ where: { channelId: reaction.message.channel.id }}) //this part closes the ticket / hides it from the user so only admins can see
        if (ticket) {
            console.log('Ticket has been found');
            const closedMessageId = ticket.getDataValue('closedMessageId');
            if (reaction.message.id === closedMessageId) {
                reaction.message.channel.updateOverwrite(ticket.getDataValue('authorId'), {
                    VIEW_CHANNEL: false 
                }).catch((err) => console.log(err));
                ticket.resolved = true;
                await ticket.save();
                console.log('Updated');
            }

        }
    };

});

client.giveawaysManager = manager;

const twitchs = {};
       const Parser = require("rss-parser");
    //parser = new Parser();
    const startAt = Date.now();
    function formatDate(date) {
    let monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    let day = date.getDate(), month = date.getMonth(), year = date.getFullYear();
    return `${day} ${monthNames[parseInt(month, 10)]} ${year}`;
}

 
const { promisify } = require('util')
client.config = require("./config.js")
client.logger = console
client.wait = promisify(setTimeout)
client.ayar = db

String.prototype.toProperCase = function() {
  return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

process.on("uncaughtException", (err) => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  console.error("Uncaught Exception: ", errorMsg);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: ", err);
});




client.on("guildMemberAdd", async member => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`);
  if (sunucupaneli) {
    let toplamuye = member.guild.channels.cache.find(x =>
      x.name.startsWith("Toplam Üye:")
    );
    let toplamaktif = member.guild.channels.cache.find(x =>
      x.name.startsWith("Aktif Üye:")
    );
    let botlar = member.guild.channels.cache.find(x => x.name.startsWith("Botlar •"));
    let rekoraktif = member.guild.channels.cache.find(x =>
      x.name.startsWith("Rekor Aktiflik:")
    );

    if (
      member.guild.members.cache.filter(off => off.presence.status !== "offline")
        .size > sunucupaneli
    ) {
      await db.set(
        `sunucupanel_${member.guild.id}`,
        member.guild.members.cache.filter(off => off.presence.status !== "offline")
          .size
      );
    }
    try {
      if (toplamuye) {
        toplamuye.setName(`Toplam Üye: ${member.guild.memberCount}`);
      }
      if (toplamaktif) {
        toplamaktif.setName(
          `Aktif Üye: ${
            member.guild.members.cache.filter(
              off => off.presence.status !== "offline"
            ).size
          }`
        );
      }
      if (botlar) {
        botlar.setName(
          `Botlar • ${member.guild.members.cache.filter(m => m.user.bot).size}`
        );
      }
      if (rekoraktif) {
        rekoraktif.setName(`Rekor Aktiflik: ${sunucupaneli}`);
      }
    } catch (e) {}
  }
});

client.on("guildMemberRemove", async member => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`);
  if (sunucupaneli) {
    let toplamuye = member.guild.channels.cache.find(x =>
      x.name.startsWith("Toplam Üye:")
    );
    let toplamaktif = member.guild.channels.cache.find(x =>
      x.name.startsWith("Aktif Üye:")
    );
    let botlar = member.guild.channels.cache.find(x => x.name.startsWith("Botlar:"));
    let rekoraktif = member.guild.channels.cache.find(x =>
      x.name.startsWith("Rekor Aktiflik:")
    );

    if (
      member.guild.members.cache.filter(off => off.presence.status !== "offline")
        .size > sunucupaneli
    ) {
      await db.set(
        `sunucupanel_${member.guild.id}`,
        member.guild.members.cache.filter(off => off.presence.status !== "offline")
          .size
      );
    }
    try {
      if (toplamuye) {
        toplamuye.setName(`Toplam Üye: ${member.guild.memberCount}`);
      }
      if (toplamaktif) {
        toplamaktif.setName(
          `Aktif Üye: ${
            member.guild.members.cache.filter(
              off => off.presence.status !== "offline"
            ).size
          }`
        );
      }
      if (botlar) {
        botlar.setName(
          `Botlar: ${member.guild.members.cache.filter(m => m.user.bot).size}`
        );
      }
      if (rekoraktif) {
        rekoraktif.setName(`Rekor Aktiflik: ${sunucupaneli}`);
      }
    } catch (e) {}
  }
});

