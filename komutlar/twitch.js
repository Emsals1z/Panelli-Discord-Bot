const db = require("quick.db");
const Discord = require('discord.js');
const fetch = require("node-fetch");
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => { 
     if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  if(args[0] === "ayarla") {
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
    if(!channel) return message.channel.send("Twitch Bildirim kanalini belirtmelisin.");
    db.set(`twitch.${message.guild.id}.channel`, channel.id);
    message.channel.send(`Twitch Bildirim kanali başarıyla ayarlandı.`)
  } else if(args[0] === "kanal1") {
   let arguman = args.slice(1).join(" ");

   if(!arguman) return message.channel.send("Twitch Kanalini belirtmelisin.");
  
db.set(`twitch.${message.guild.id}.name`, arguman);
message.channel.send(`Twitch Kanali başarıyla ${arguman} olarak ayarlandı.`);
  } else if(args[0] === "kanal2") {
   let arguman2 = args.slice(1).join(" ");

   if(!arguman2) return message.channel.send("Twitch Kanalini belirtmelisin.");
  
db.set(`twitch2.${message.guild.id}.name`, arguman2);
message.channel.send(`2.Twitch Kanali başarıyla  ${arguman2} olarak ayarlandı.`);
  }
    else if(args[0] === "kanal3") {
   let arguman3 = args.slice(1).join(" ");

   if(!arguman3) return message.channel.send("Twitch Kanalini belirtmelisin.");
  
db.set(`twitch3.${message.guild.id}.name`, arguman3);
message.channel.send(`3.Twitch Kanali başarıyla  ${arguman3} olarak ayarlandı.`);
  }
     else if(args[0] === "kanal4") {
   let arguman4 = args.slice(1).join(" ");

   if(!arguman4) return message.channel.send("Twitch Kanalini belirtmelisin.");
  
db.set(`twitch4.${message.guild.id}.name`, arguman4);
message.channel.send(`4.Twitch Kanali başarıyla  ${arguman4} olarak ayarlandı.`);
  }
     else if(args[0] === "kanal5") {
   let arguman5 = args.slice(1).join(" ");

   if(!arguman5) return message.channel.send("Twitch Kanalini belirtmelisin.");
  
db.set(`twitch5.${message.guild.id}.name`, arguman5);
message.channel.send(`5.Twitch Kanali başarıyla  ${arguman5} olarak ayarlandı.`);
  }
    else if(args[0] === "bildirim") {
   let arguman = args.slice(1).join(" ");
   if(!arguman) return message.channel.send("Bildirim mesajı eklemelisin");
db.set(`twitch.${message.guild.id}.bildirim`, arguman);
message.channel.send(`Twitch Kanali başarıyla ayarlandı.`);
  }
    
    else if(args[0] === "sıfırla") {
    let data = await db.get(`twitch.${message.guild.id}`);
    if(!data) return message.channel.send("zaten ayarlı degil")
    if(!data.name) return message.channel.send("zaten ayarlı degil")
    if(!data.channel) return message.channel.send("zaten ayarlı degil")
    db.delete(`twitch.${message.guild.id}`);
         db.delete(`twitch2.${message.guild.id}`);
         db.delete(`twitch3.${message.guild.id}`);
    message.channel.send("Tüm Ayarlar Sıfırlandı!");
  } else {
    return message.channel.send("Bir arguman belirt `(kanal(1,2,3,4,5), ayarla, bildirim({kullanıcı},{yayın_başlığı},{oyun},{izleyici}), sıfırla)`");
}
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['tw']
  }
  exports.help = {
    name: 'twitch',
      kategori: "moderasyon"
  }

//deneme