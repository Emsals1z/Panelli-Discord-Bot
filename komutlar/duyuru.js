  
const Discord = require('discord.js');

exports.run = (client, message, args) => {
  
     if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("<a:alert:871046210021122059> Bu Komutu Kullanmak İçin İzniniz Yok!");
  let mesaj = args.slice(1).join(' ');

  if (!args[0])
      {
          const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
   .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059> Lütfen duyuru şeklini seçtikten sonra duyuru mesajını yazın. \n Ör: !duyuru düz <duyuru> __(here ve everyonesiz duyuru atar)__ \n Ör: !duyuru here <duyuru> __(here ile duyuru atar)__ \n Ör: !duyuru everyone <duyuru> __(everyone ile duyuru atar)__`);
           return message.channel.send(embed)
      }
   const embed1 = new Discord.MessageEmbed()
    .setColor("BLACK")
   .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059> Yazacağım metni yazarsan sevinirim \n Ör: !duyuru düz <duyuru> __(here ve everyonesiz duyuru atar)__ \n Ör: !duyuru here <duyuru> __(here ile duyuru atar)__ \n Ör: !duyuru everyone <duyuru> __(everyone ile duyuru atar)__`)
  if (mesaj.length < 1) return message.reply(embed1);
  message.delete();
  
    if (args[0] === "düz")
      {
         let Crewembed = new Discord.MessageEmbed()
   .setTitle('F-Bot Duyuru Sistemi')
    .addField(`<a:duyuru:848517606540574771>Duyuru;`,` \`\`\` ${mesaj}\`\`\` `)
   .setTimestamp()
  .setColor('RANDOM')
  .setFooter(`${message.author.username} Tarafından duyuruldu.`,message.author.avatarURL({dynamic:true}))
  .setThumbnail(message.guild.iconURL({dynamic:true}));
  message.channel.send(Crewembed).then(async message => {
	message.react(`<a:duyuru:848517606540574771>`)
 message.react(`<a:bot:848517607245742100>`)
	})
      }
   if (args[0] === "here")
      {
  let Crewembed = new Discord.MessageEmbed()
   .setTitle('F-Bot Duyuru Sistemi')
    .addField(`<a:duyuru:848517606540574771>Duyuru;`,` \`\`\` ${mesaj}\`\`\` `)
   .setTimestamp()
  .setColor('RANDOM')
  .setFooter(`${message.author.username} Tarafından duyuruldu.`,message.author.avatarURL({dynamic:true}))
  .setThumbnail(message.guild.iconURL({dynamic:true}));
  message.channel.send(Crewembed).then(async message => {
	message.react(`<a:duyuru:848517606540574771>`)
 message.react(`<a:bot:848517607245742100>`)
	

  message.channel.send(`||@here||`)
  
 
})
      }
     if (args[0] === "everyone")
      {
  let Crewembed = new Discord.MessageEmbed()
   .setTitle('F-Bot Duyuru Sistemi')
    .addField(`<a:duyuru:848517606540574771>Duyuru;`,` \`\`\` ${mesaj}\`\`\` `)
   .setTimestamp()
  .setColor('RANDOM')
  .setFooter(`${message.author.username} Tarafından duyuruldu.`,message.author.avatarURL({dynamic:true}))
  .setThumbnail(message.guild.iconURL({dynamic:true}));
  message.channel.send(Crewembed).then(async message => {
	message.react(`<a:duyuru:848517606540574771>`)
 message.react(`<a:bot:848517607245742100>`)
	

  message.channel.send(`||@everyone||`)
  
 
})
      }
}



  
  



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'duyuru',
  description: 'Sunucunuzda here/düz veya everyone atarak duyuru atmanıza yarar.',
  kategori: "moderasyon",
  usage: ''
};