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
      .setDescription(`<a:alert:871046210021122059>`+"** Hatalı kullanım! örnek: -küfür-engel aç && kapat**");
      

    message.channel.send(embed);
    return;
  }
  let kanal = await db.fetch(`küfürengel_${message.guild.id}`)
  if (args[0] == "aç") {
    if (kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("Küfür Engel")
      .setFooter(`F-Bot| Küfür Engel Sistemi.`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:alert:871046210021122059>`+"** Görünüşe göre Küfür engel zaten açılmış!**");

      message.channel.send(embed);
      return;
    } else {
      db.set(`küfürengel_${message.guild.id}`, "acik");
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("Küfür Engel")
       .setFooter(`F-Bot| Küfür Engel Sistemi.`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:onayyy:825323769752977428>`+" **Küfür engel açıldı!**");

      message.channel.send(embed);
    }
  } else if (args[0] == "kapat") {
    db.delete(`küfürengel_${message.guild.id}`);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle("Küfür Engel")
     .setFooter(`F-Bot| Küfür Engel Sistemi.`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:onayyy:825323769752977428>`+" **Küfür engel kapatıldı**");

    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["küfürengel","küfür"],
  permLevel: 2
 
};

exports.help = {
  name: "küfür-engel",
  description: "kanal koruma",
   kategori: "güvenlik",
  usage: "kanal-koruma"
};