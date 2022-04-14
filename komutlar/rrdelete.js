const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
    
 if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  let msgid = args[0];
  if (!msgid)
  {
        const embed5 = new Discord.MessageEmbed()
      .setColor("BLACK")
       .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059> Lütfen bir mesaj ID'si belirtin!`);
           return message.channel.send(embed5)
     
      
  }

  try {
    message.channel.messages
      .fetch(msgid, { limit: 1 })
      .then(m => {
        try {
          if (m.embeds.length > 0) {
            let rol31 = db.fetch(
              `rolereactions_${message.guild.id}_${msgid}`
            );
            if (!rol31)
                {
                   const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
       .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059> Emoji rol sistemi bulunamadı lütfen oluşturduğunuzdan emin olun!`);
           return message.channel.send(embed)
              }
            let embed = new Discord.MessageEmbed()
              .setColor("#FF5349")
              .setDescription(
                rol31.text || `<@&${rol31.role}> Rolünü almak için aşağıdaki ${rol31.emoji} emojisine tıklayın!`
              )
              .setFooter("Bu emoji rolü silindi");
            db.delete(`rolereactions_${message.guild.id}_${msgid}`);
            m.edit({ embed });
                      const embed1 = new Discord.MessageEmbed()
      .setColor("BLACK")
       .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:onayyy:757018736845783101> Başarıyla Emoji rol sistemi veritabanından silindi!`);
           message.channel.send(embed1);
          } else {
            message.reply("<a:alert:871046210021122059> Bilinmeyen bir hata oluştu!");
          }
        } catch (e) {
                const embed3 = new Discord.MessageEmbed()
      .setColor("BLACK")
       .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059> Bu bir emoji rolü mesajı değil lütfen kontrol edin!`);
           message.channel.send(embed3)
         
        }
      })
      .catch(err => {
             const embed5 = new Discord.MessageEmbed()
      .setColor("BLACK")
       .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059> Mesaj bulunamadı bir hata oluştu ` + err.message);
           message.channel.send(embed5)
       
      });
  } catch (e) {
              const embed4 = new Discord.MessageEmbed()
      .setColor("BLACK")
       .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059> oof bir şeyler ters gitti ` + e.message);
           message.channel.send(embed4)
    
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
 aliases: ["rrremove","rrdelete"],
  permLevel: 0
};
exports.help = {
  name: "rrsil",
  description: "Tepki rolünü siler !bakımda!",
  kategori: "moderasyon",
  usage: "-rrsil <emoji rolü mesaj idsi>"
 
};
  /*
  
  youtube.com/c/EmirhanSarac
  
  */