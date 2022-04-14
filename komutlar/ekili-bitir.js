const ms = require('ms');
const Discord = require('discord.js');
exports.run = async (client, message, args) => {
 if(!message.member.permissions.has('ADMINISTRATOR')) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok.`)

    message.channel.send(embed);
    return;
  }

    if(!args[0]){
        return message.channel.send('<a:alert:871046210021122059> bir çekiliş kimliği **belirtmelisin!**');
    }

    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send('<a:alert:871046210021122059> sunucuda böyle bir çekiliş **bulunmuyor!** `'+ args.join(' ') + '`.');
    }

    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    .then(() => {
        message.channel.send('<a:alert:871046210021122059> çekiliş kısa sürede bitecek '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' saniye...').then(a => a.delete({timeout: 10000}));
    })
    .catch((e) => {
        if(e.startsWith(`<a:alert:871046210021122059> bu ID çekiliş kimliği ${giveaway.messageID} zaten bitti.`)){
            message.channel.send('<a:onayyy:825323769752977428> Bu çekiliş çoktan sona erdi!');
        } else {
            console.error(e);
            message.channel.send('Bir hata oluştu...');
        }
    });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['çekiliş-sil',"çekilişbitir","çekilişsil"],
  permLevel: 0
};

exports.help = {
  name: 'çekiliş-bitir',
  description: 'Çekilişi bitirmenizi sağlar.',
    kategori: "moderasyon",
  usage: 'çekiliş-bitir'
};