const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {



    let google = args.slice(0).join('+');

        let link = `https://translate.google.com/?hl=tr#tr/en/` + google;
        if(!link)return message.reply("Hata !")
  if(!google) return message.reply("**Lütfen Ne Çevireceğimi Yaz**")
        let Crewembed = new Discord.MessageEmbed()
    
    .setColor("0xe2ff00")
    .setTimestamp()
    
    .addField("Kelime:", `${args.slice(0).join(' ')}`)
    .addField('Link:', `${link}`)
.setFooter('Dogy | Google Çeviri Sistemi')    
          
    message.channel.send(Crewembed);

  
}



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['g_çeviri'],
  permLevel: 0
};

exports.help = {
  name: 'çeviri',
  description: 'Bot yazdığınız kelimeyi çevirir.',
  kategori: "kullanıcı",
  usage: 'gçevir'
};