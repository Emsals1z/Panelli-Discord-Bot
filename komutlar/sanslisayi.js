const Discord = require("discord.js");
const client = new Discord.Client();
//CrewCode
exports.run = (client, message) => {
 if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  message.channel.send("**🎆 Şanslı Sayını Buluyorum! 🎇**").then(message => {
    var espriler = [
      "🎉 Senin Şanslı Sayın 14 🎲",
      "🎉 Senin Şanslı Sayın 1 🎲",
      "🎉 Senin Şanslı Sayın 2 🎲",
      "🎉 Senin Şanslı Sayın 3 🎲",
      "🎉 Senin Şanslı Sayın 4 🎲",
      "🎉 Senin Şanslı Sayın 5 🎲",
      "🎉 Senin Şanslı Sayın 6 🎲",
      "🎉 Senin Şanslı Sayın 7 🎲",
      "🎉 Senin Şanslı Sayın 8 🎲",
      "🎉 Senin Şanslı Sayın 9 🎲",
      "🎉 Senin Şanslı Sayın 10 🎲",
      "🎰 Senin Şanslı Sayın Yok 😔 ",
      "🎉 Senin Şanslı Sayın 11 🎲",
      "🎉 Senin Şanslı Sayın 12 🎲",
      "🎉 Senin Şanslı Sayın 13 🎲",
      "🎉 Senin Şanslı Sayın 14 🎲"
    ];
    var espri = espriler[Math.floor(Math.random() * espriler.length)];
    message.edit(`${espri}`);
  });
}; //CrewCode

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["şanslı-sayım"],
  permLevel: 0
};

exports.help = {
  name: "şanslısayım",
  description: "Şanslı Sayınızı Bulmaya Çalışır",
  kategori: "eğlence",
  usage: "-şanslısayım"
};