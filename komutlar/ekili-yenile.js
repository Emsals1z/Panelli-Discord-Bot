const ms = require('ms');
const Discord = require('discord.js');
exports.run = async (client, message, args) => {
 if(!message.member.permissions.has('ADMINISTRATOR')) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok.`)
    message.channel.send(embed);
    return;
  }

let messageID = args[0]
    if(!messageID){
           const embed = new Discord.MessageEmbed()
      .setDescription('<a:alert:871046210021122059> bir çekiliş kimliği **belirtmelisin!**')
    
        return message.channel.send(embed);
    }
 
client.giveawaysManager.reroll(messageID, {
    
    messages: {
        congrat: ":tada: Yeni kazanan(lar): {winners}! Tebrikler!",
        error: "**Geçerli katılım yok, kazanan seçilemez!**"
                    }   
}).catch((err) => {
      const embed3 = new Discord.MessageEmbed()
      .setDescription("`"+ messageID +"` için çekiliş bulamadım, lütfen kontrol edin ve tekrar deneyin")
    message.channel.send(embed3);
})
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['çekiliş-reroll',"çekilişyenile","çekilişrerol"],
  permLevel: 0
};

exports.help = {
  name: 'çekiliş-yenile',
  description: 'Çekilişi yeniler.',
    kategori: "moderasyon",
  usage: 'çekiliş-tekrar'
};