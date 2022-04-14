const db = require("quick.db");
const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<:CARRno:524246262191751168> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`);
    if (prefix == null) prefix = '-'
  
  let preffix = db.fetch(`prefix_${message.guild.id}`)
  
  
  if (!args[0])
      {
          const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
   .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059> Bir prefix girmelisin.`);
           return message.channel.send(embed)
      }


   
  db.set(`prefix_${message.guild.id}`, args[0])
    {
      let embed1 = new Discord.MessageEmbed()
      .setColor("BLACK")
   .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:onayyy:825323769752977428> Prefix başarıyla \`${args[0]}\` olarak ayarlandı.`);
        message.channel.send(embed1)
}

   
  
  
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['prefix'],
    permLevel: 0,
    kategori: "ayarlar"
};
  
  exports.help = {
    name: 'prefix-ayarla',
    description: 'Botun Sunucudaki Prefixini Değiştirir.',
    kategori: "moderasyon",
    usage: 'prefix-ayarla <yeni prefix>'
};