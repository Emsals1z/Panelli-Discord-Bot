const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.channel.bulkDelete(1).then 
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle("Kanal Koruma")
    .setFooter(`F-Bot| Kanal Koruma Sistemi.`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059>`+"** Hatalı kullanım! örnek: -saas aç && kapat**");
      

    message.channel.send(embed);
    return;
  }
  let kanal = await db.fetch(`ssaass_${message.guild.id}`)
  if (args[0] == "aç") {
    if (kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("Kanal Koruma")
      .setFooter(`F-Bot| Kanal Koruma Sistemi.`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:alert:871046210021122059>`+"** Görünüşe göre Sa As zaten açılmış!**");

      message.channel.send(embed);
      return;
    } else {
      db.set(`ssaass_${message.guild.id}`, "acik");
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("Kanal Koruma")
       .setFooter(`F-Bot| Kanal Koruma Sistemi.`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:onayyy:825323769752977428>`+" **Sa As açıldı!**");

      message.channel.send(embed);
    }
  } else if (args[0] == "kapat") {
    db.delete(`ssaass_${message.guild.id}`);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle("Kanal Koruma")
     .setFooter(`F-Bot| Kanal Koruma Sistemi.`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:onayyy:825323769752977428>`+" **Sa As kapatıldı**");

    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["saas","selam"],
  permLevel: 2
 
};

exports.help = {
  name: "sa-as",
  description: "sa-as'ı açıp kapatır.",
  kategori: "moderasyon",
  usage: "-sa-as"
};