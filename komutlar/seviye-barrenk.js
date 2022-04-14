const db = require("quick.db");
const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<:CARRno:524246262191751168> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  

  
  
  if (!args[0])
      {
          const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
   .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059> Bir bar rengi girmelisin. Seçenekler : kırmızı, mavi, yeşil, sarı, turuncu, mor, turkuvaz, beyaz, pembe`);
           return message.channel.send(embed)
      }

if (args[0] == "sıfırla") {
    db.delete(`seviyebarrenk_${message.guild.id}`);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
    .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:onayyy:825323769752977428>`+" **Seviye bar rengi sıfırlandı**");

    message.channel.send(embed);
  }
  
  else
  {db.set(`seviyebarrenk_${message.guild.id}`, args[0])
    {
      let embed1 = new Discord.MessageEmbed()
      .setColor("BLACK")
   .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:onayyy:825323769752977428> Seviye bar rengi başarıyla \`${args[0]}\` olarak ayarlandı. Sıfırlamak için -seviye-barrenk sıfırla`);
        message.channel.send(embed1)
}
  }
  
  
  
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['SEVİYE-BARRENK'],
    permLevel: 0,
    kategori: "seviye"
};
  
  exports.help = {
    name: 'seviye-barrenk',
    description: 'Seviye bar renigini ayarlamanızı sağlar.',
    kategori: "seviye",
    usage: 'seviye-barrenk <renk>'
};