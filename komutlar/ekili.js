const Discord = require('discord.js')
const moment = require('moment')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
const client = new Discord.Client();
require("moment-duration-format");
const prefix = ayarlar.prefix
exports.run = async (bot, msg, args) => {

        const çekiliş = new Discord.MessageEmbed()
                .setColor('BLACK')
        .setFooter(`${msg.author.username} çekiliş komudunu kullandı`, msg.author.avatarURL)
        .setAuthor('F-Bot Çekiliş Menüsü')
        .setThumbnail('https://cdn.discordapp.com/attachments/836533918760042508/856527249900961802/ezgif-2-90ad2ce86265.gif')
       .addField('**__Çekliş Başlat__**','<a:dia1:686968193239089338> `-çekiliş-başlat #kanal süre kazanan_sayısı Ödül` \nBelirtilen Kanalda Çekiliş Başlatırsınız',false )
        .addField('**__Çekiliş Yenile__**','<a:dia1:686968193239089338>  `-çekiliş-yenile mesaj_id` \n Belirtilen İd deki Çekilişi Yeniler',true)
        .addField('**__Çekiliş Liste__**','<a:dia1:686968193239089338> `-çekiliş-liste` \nSunucudaki Aktif Çekilişleri Listeler',true)
        .addField('**__Çekiliş Bitir__**', '<a:dia1:686968193239089338> `-çekiliş-bitir mesaj_id` \nBelirtilen İd deki Çekilişi Sonlandırır.',false)
    
  
msg.channel.send(çekiliş)
    
}
exports.conf = {
  enabled: true,
  guildOnly: true,
 aliases: ['çekiliş', 'giveawey'],
  kategori: 'yardım',
  permLevel: 0
};
exports.help = {
  name: 'çekiliş',
  description: 'Çekiliş yardım menüsünü açar.',
    kategori: "moderasyon",
  usage: 'çekiliş'
};