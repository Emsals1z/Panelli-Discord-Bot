const db = require("quick.db");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
    if (!isNaN(message.content.split(' ')[1])) {
      let amount = 0;
      if (message.content.split(' ')[1] === '1' || message.content.split(' ')[1] === '0') {
        amount = 1;
      } else {
        amount = message.content.split(' ')[1];
        if (amount > 100) {
          amount = 100;
        }
      }
      await message.channel.bulkDelete(amount, true).then((_message) => {
            const crewBaşarılı = new MessageEmbed()
    .setColor("#007f00")
    .setTitle("Başarılı!")
    .setFooter(`${message.author.username} Tarafından İstendi.`,message.author.avatarURL({dynamic:true}))
     .setDescription(`<a:onayyy:825323769752977428> ${_message.size} Adet mesajı sildim!`);
        message.channel.send(crewBaşarılı).then((sent) => {
          setTimeout(function () {
            sent.delete();
          }, 5000);
        });
      });
    } else {
           const crewBaşarılı1 = new MessageEmbed()
    .setColor("BLACK")
.setDescription(`<a:alert:871046210021122059> Ne kadar mesaj silmek istediğini yaz`);
      message.channel.send(crewBaşarılı1).then((sent) => {
        setTimeout(function () {
          sent.delete();
        }, 2500);
      });
    }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["CLEAR","SİL","Sil","temizle","TEMİZLE","Temizle"],
  permLevel: 2,
  kategori: "moderasyon"
};

exports.help = {
  name: "sil",
  description: "Belirlendiği kadar mesajın siler.",
  kategori: "moderasyon",
  usage: "-sil <sayı>"
};