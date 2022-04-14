const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle("Kanal Koruma")
    .setFooter(`F-Bot| Kanal Koruma Sistemi.`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059>`+"** Hatalı kullanım! örnek: -mesaj-tepki aç && kapat**");
      

    message.channel.send(embed);
    return;
  }
  let kanal = await db.fetch(`etkitepki_${message.guild.id}`)
  if (args[0] == "aç") {
    if (kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("Kanal Koruma")
      .setFooter(`F-Bot| Kanal Koruma Sistemi.`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:alert:871046210021122059>`+"** Görünüşe göre Mesaj Tepki zaten açılmış!**");

      message.channel.send(embed);
      return;
    } else {
      db.set(`etkitepki_${message.guild.id}`, "acik");
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("Kanal Koruma")
       .setFooter(`F-Bot| Kanal Koruma Sistemi.`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:onayyy:825323769752977428>`+" **Mesaj Tepki açıldı!**");

      message.channel.send(embed);
    }
  } else if (args[0] == "kapat") {
    db.delete(`etkitepki_${message.guild.id}`);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle("Kanal Koruma")
     .setFooter(`F-Bot| Kanal Koruma Sistemi.`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:onayyy:825323769752977428>`+" **Mesaj Tepki kapatıldı**");

    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mesaj-tepki"],
  permLevel: 2,
  kategori: "sunucu"
};

exports.help = {
  name: "mesajtepki",
  description: "kanal koruma",
    kategori: "moderasyon",
  usage: "kanal-koruma"
};