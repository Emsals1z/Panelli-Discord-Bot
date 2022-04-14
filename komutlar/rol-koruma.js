const db = require("quick.db");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);

  if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setColor("GOLD")
      .setTitle("Rol Koruma sistemi!")
      .setDescription(`<a:alert:871046210021122059>`+"** Hatalı kullanım! örnek: -rol-koruma aç && kapat**");

    message.channel.send(embed);
    return;
  }
  let rol = await db.fetch(`rolk_${message.guild.id}`);
  if (args[0] == "aç") {
    if (rol) {
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("Rol Koruma")
        .setFooter(`F-Bot| Rol Koruma Sistemi.`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:alert:871046210021122059>`+"** Dostum Zaten Rol Koruma Sistemi Aktif !!**");

      message.channel.send(embed);
      return;
    } else {
      db.set(`rolk_${message.guild.id}`, "acik");
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
      .setTitle("Rol Koruma")
      .setFooter(`F-Bot| Rol Koruma Sistemi.`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:onayyy:825323769752977428>`+"** Rol Koruma Sistemi Aktif Halde ... Silinen Rolleri Tekrar Açacağım Ve Size Bildiriceğim !**");

      message.channel.send(embed);
    }
  } else if (args[0] == "kapat") {
    db.delete(`rolk_${message.guild.id}`);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle("Rol Koruma")
    .setFooter(`F-Bot| Rol Koruma Sistemi.`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:onayyy:825323769752977428>`+"** Rol Koruma Sistemi Kapatıldı !**");

    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rol-k","rolkoruma"],
  permLevel: 3

};

exports.help = {
  name: "rol-koruma",
  description: "Rol korumayı açar.",
  kategori: "güvenlik",
  usage: "rol-koruma"
};