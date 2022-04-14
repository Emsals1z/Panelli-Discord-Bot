const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle("Otorol")
    .setFooter(`F-Bot| Otorol Sistemi.`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059>`+"** Hatalı kullanım! örnek: -otorol-aç aç && kapat**");
      

    message.channel.send(embed);
    return;
  }
  let kanal = await db.fetch(`otorollog_${message.guild.id}`)
  if (args[0] == "aç") {
    if (kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("Otorol")
      .setFooter(`F-Bot| Otorol Sistemi.`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:alert:871046210021122059>`+"** Görünüşe göre otorol zaten açılmış!**");

      message.channel.send(embed);
      return;
    } else {
      db.set(`otorollog_${message.guild.id}`, "acik");
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("Otorol")
       .setFooter(`F-Bot| Otorol Sistemi.`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:onayyy:825323769752977428>`+" **Otorol açıldı!**");

      message.channel.send(embed);
    }
  } else if (args[0] == "kapat") {
    db.delete(`otorollog_${message.guild.id}`);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle("Otorol")
     .setFooter(`F-Bot| Otorol Sistemi.`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:onayyy:825323769752977428>`+" **Otorol kapatıldı**");

    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["otorol-aç"],
  permLevel: 2,
  kategori: "sunucu"
};

exports.help = {
  name: "otorolaç",
  description: "Otorolü açmanıza yarar.",
   kategori: "moderasyon",
  usage: "otorolaç"
};