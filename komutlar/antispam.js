const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.channel.bulkDelete(1).then 
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle("Anti Spam")
    .setFooter(`F-Bot| Anti Spam Sistemi.`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059>** Hatalı kullanım! örnek: -antispam aç && kapat \nNot:Kullanmadan önce -muterololuştur yazarak mute rolü oluşturunuz. İstediğiniz bir rolü de verdirtebilirsiniz -antispamrol @rol`);
      

    message.channel.send(embed);
    return;
  }
  let kanal = await db.fetch(`antispam_${message.guild.id}`)
  if (args[0] == "aç") {
    if (kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("Anti Spam")
      .setFooter(`F-Bot| Anti Spam Sistemi.`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:alert:871046210021122059>`+"** Görünüşe göre Anti Spam zaten açılmış!**");

      message.channel.send(embed);
      return;
    } else {
      db.set(`antispam_${message.guild.id}`, "acik");
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("Anti Spam")
       .setFooter(`F-Bot| Anti Spam Sistemi.`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:onayyy:825323769752977428>**Anti Spam açıldı! \nNot:Kullanmadan önce -muterololuştur yazarak mute rolü oluşturunuz. İstediğiniz bir rolü de verdirtebilirsiniz -antispamrol @rol`);

      message.channel.send(embed);
    }
  } else if (args[0] == "kapat") {
    db.delete(`antispam_${message.guild.id}`);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle("Anti Spam")
     .setFooter(`F-Bot| Anti Spam Sistemi.`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:onayyy:825323769752977428>`+" **Anti Spam kapatıldı**");

    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["anti-spam"],
  permLevel: 2,
  kategori: "sunucu"
};

exports.help = {
  name: "antispam",
  description: "Spamlara karşı sunucunuzu korumaya yarar.",
  kategori: "güvenlik",
  usage: "!antispam"
};