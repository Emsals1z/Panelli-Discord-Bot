const backup = require('discord-backup');

const discord = require("discord.js")
const Discord = require("discord.js")
const db = require('quick.db')


exports.run = async (client, message, args) => {
    const ayarlar = "-"
let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar
    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send('<a:alert:871046210021122059> Sunucu yedek komutlarına erişmek için üyeleri yönetme yetkinizin olması lazım.');
    }
    message.react('<a:onayyy:825323769752977428>')
    backup.create(message.guild).then((backupData) => {
const embed = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`<a:onayyy:825323769752977428> __Yedek oluşturuldu!__ \n**Yedek ID:** \`${backupData.id}\`\n**${prefix}yedek-yükle ${backupData.id}** yazarak yedeğin bilgisini alabilirsiniz.\n**${prefix}yedek-yükle ${backupData.id}** yazarak yedeği yükleyebilirsiniz.!`)
        message.author.send(embed);
        return message.channel.send(embed);

    }).catch(() => {
const embed1 = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('<a:alert:871046210021122059> Hata oluştu,Lütfen botta yönetici yetkisinin olup olmadığını kontrol edin.!')
        return message.channel.send(embed1);

    });

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Sunucu-Yedekle","SunucuYedekle","SUNUCU-YEDEKLE","sunucuyedekle"],
  permLevel: 0
};

exports.help = {
  name: 'sunucu-yedekle',
  description: 'Sunucuyu yedekler',
    kategori: "moderasyon",
  usage: '-sunucu-yedekle'
};