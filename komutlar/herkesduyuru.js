const Discord = require('discord.js');


exports.run = (client, message, args, member) => {

    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0x2488E7)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('Hey Sen ', 'Merhaba')
    return message.author.sendEmbed(ozelmesajuyari); }
if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`Bu komutu kullanabilmek için "\`Kanalları Yönet\`" yetkisine sahip olmalısın.`);
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.channel.send('<a:alert:871046210021122059> Birşey Yazmalısınız');

  message.delete();



      const mesajat = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`${message.guild.name}`)
      .setDescription('' + mesaj + '')
        .setTimestamp()
  .setThumbnail(message.guild.iconURL({dynamic:true}))
       .setFooter(`${client.user.username}`,client.user.avatarURL({dynamic:true}))
       message.guild.members.cache.filter(m => !m.user.bot).forEach(users => {
  
     

    
users.send(mesajat)
      
  


       }
)
      const mesajat1 = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(message.guild.name)
  .setDescription(`<a:onayyy:825323769752977428> Mesaj ${message.guild.members.cache.filter(m => !m.user.bot).size} kişiye basariyla  gonderildi.`)
        .setTimestamp()
       .setFooter(`${client.user.username}`,client.user.avatarURL({dynamic:true}))
  message.channel.send(mesajat1);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['duyurlaherkse',"herkesduyur","duyuruherkes","duyur-herkes","duyuru-herkes","herkes-duyur"],
  permLevel: 4
};

exports.help = {
  name: 'duyurherkes',
  description: 'İstediğiniz şeyi sunucudaki herkese dm den duyurur.',
    kategori: "moderasyon",
  usage: '!duyurherkes [duyurmak istediğiniz şey]'
};