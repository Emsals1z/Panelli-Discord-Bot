const ms = require('ms')
const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => { 
let prefix = ayarlar.prefix 
 if(!message.member.permissions.has('ADMINISTRATOR')) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok.`)
    message.channel.send(embed);
    return;
  }
    let giveawayChannel = message.mentions.channels.first();
    if(!giveawayChannel){
        return message.channel.send(`<a:alert:871046210021122059> Lütfen bir **kanal süre**, **kazanan** ve **ödül** belirtin!\nÖrnek kullanım: \`${prefix}çekiliş-başlat #kanal 1h 1 Nitro Classic\``);
    }

    let giveawayDuration = args[1];
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(`<a:alert:871046210021122059> Lütfen bir **kanal süre**, **kazanan** ve **ödül** belirtin!\nÖrnek kullanım: \`${prefix}çekiliş-başlat #kanal 1h 1 Nitro Classic\``);
    }

    let giveawayNumberWinners = args[2];
    if(!giveawayNumberWinners){
        return message.channel.send(`<a:alert:871046210021122059> Lütfen bir **kanal süre**, **kazanan** ve **ödül** belirtin!\nÖrnek kullanım: \`${prefix}çekiliş-başlat #kanal 1h 1 Nitro Classic\``);
    }

    let giveawayPrize = args.slice(3).join(' ');
    if(!giveawayPrize){
        return message.channel.send(`<a:alert:871046210021122059> Lütfen bir **kanal süre**, **kazanan** ve **ödül** belirtin!\nÖrnek kullanım: \`${prefix}çekiliş-başlat #kanal 1h 1 Nitro Classic\``);
    }

 client.giveawaysManager.start(giveawayChannel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: parseInt(giveawayNumberWinners),
            hostedBy: message.author,
            messages: {
            giveaway: "🎉 **ÇEKİLİŞ** 🎉",
                giveawayEnded: "🎉 **ÇEKİLİŞ SONLANDI** 🎉",
                timeRemaining: "Kalan süre: **{duration}**!",
                inviteToParticipate: "🎉 Emojisine basarak katıl! "+`\n Başlama tarihi:<t:${Math.floor(new Date().getTime()/1000.0)}:D>`,
              tarihi:`Çekiliş tarihi:<t:${Math.floor(new Date().getTime()/1000.0)}:D>`,
                winMessage: "🎉 Tebrikler, {winners}! **{prize}** ödülünü kazandınız!",
                embedFooter: "F-Bot",
                noWinner: "bir kazanan belirlenemedi!",
                hostedBy: "Çekilişi yapan: {user}",
                winners: "kazanan(lar)",
                endedAt: `Bitiş tarihi:`,
units: {
                    seconds: "Saniye",
                    minutes: "Dakika",
                    hours: "Saat",
                    days: "Gün",
                    pluralS: false 
                }
            }
        });

    message.channel.send(`🎉 **Çekiliş** ${giveawayChannel} adlı kanalda başlatıldı!`).then(a => a.delete({timeout: 10000}));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['çekiliş-başlat'],
  permLevel: 0
};

exports.help = {
  name: 'çekiliş-yap',
  description: 'Çekiliş yapmanıza yarar.',
  kategori: "moderasyon",
  usage: 'çekiliş-yap'
};
