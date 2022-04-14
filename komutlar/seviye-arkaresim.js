const db = require("quick.db");
const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<:CARRno:524246262191751168> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  

  
  
  if (!args[0])
      {
          const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
   .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059> Bir arka resim girmelisin.`);
           return message.channel.send(embed)
      }

if (args[0] == "sıfırla") {
    db.delete(`${message.guild.id}.resim`);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
    .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:onayyy:825323769752977428>`+" **Seviye bar rengi sıfırlandı**");

    message.channel.send(embed);
  }
  
  else {
  
  db.set(`${message.guild.id}.resim`, args[0])
    {
      let embed1 = new Discord.MessageEmbed()
      .setColor("BLACK")
   .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setImage(`${args[0]}`)
      .setDescription(`<a:onayyy:825323769752977428> Seviye arka fotoğrafı başarıyla \`${args[0]}\` olarak ayarlandı. Sıfırlamak için -seviye-arkaresim sıfırla`);
        message.channel.send(embed1)
}

 
  }
  
  
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['SEVİYE-ARKARESİM'],
    permLevel: 0,
    kategori: "seviye"
};
  
  exports.help = {
    name: 'seviye-arkaresim',
    description: 'Seviye kartının arka plan resmini değiştirir',
    kategori: "seviye",
    usage: 'seviye-arkaresim <link>'
};