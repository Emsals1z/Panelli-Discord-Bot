const Discord = require("discord.js");
const discord = require("discord.js");
const moment = require("moment");
const useful = require("useful-tools")

const emoji = require("../emojiler.json");
require('discord-reply'); //⚠️ IMPORTANT: put this before your discord.Client()
const client = new Discord.Client();
{exports.run = (client, message, params, args) => {
 
  message.react(`<a:onayy:${emoji.onayyy}>`)
    setTimeout(function() {
    
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
      else {
        let roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
  let roles1= message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
  let rolesa = ""
  if(roles.length > 15)
{
  roles = roles.slice(0, 15)
  rolesa = "+"+roles1.slice(15).length
}
  const channels = message.guild.channels.cache.sort((a, b) => a.position - b.position).map(channel => channel.toString());
 let channels1 = message.guild.channels.cache.filter(c => c.type === 'text').sort((a, b) => a.position - b.position).map(channel => channel.toString());
  let channels11 = message.guild.channels.cache.filter(c => c.type === 'text').sort((a, b) => a.position - b.position).map(channel => channel.toString());
   let channels1a = ""
  if(channels1.length > 15)
{
  channels1 = channels1.slice(0, 15)
  channels1a = "+"+channels11.slice(15).length
}
   let channels2 = message.guild.channels.cache.filter(c => c.type === 'voice').sort((a, b) => a.position - b.position).map(channel => channel.toString());
      let channels21 = message.guild.channels.cache.filter(c => c.type === 'voice').sort((a, b) => a.position - b.position).map(channel => channel.toString());
  let channels2a = ""
  if(channels2.length > 15)
{
  channels2 = channels2.slice(0, 15)
  channels2a = "+"+channels21.slice(16).length
}
     let emojis1 = message.guild.emojis.cache.map((e) => `${e} `)
     let a = ""
         if(emojis1.length === 0)
        {
       
          emojis1 = "Yok"
          
        }
      if(emojis1.length > 20)
        {
          a = "+"+emojis1.slice(20).length
          emojis1 = emojis1.slice(0, 20)
          console.log("a")
        }
   let list1 = "Yok"
    message.guild.fetchBans()
  .then(banned => {
    list1 = banned.map(user => user.user.username).join(', ');

    // Make sure if the list is too long to fit in one message, you cut it off appropriately.
  if (list1.length >= 100) list1 = `${list1.slice(0, 99)}...`;
let listsize = banned.size
let afk = message.guild.afkChannel
  if(message.guild.afkChannel === null)
    {
      afk = "Sunucuda Afk Kanalı Ayarlanmamış."
    }
  let afkt = message.guild.afkTimeout
  if(message.guild.afkTimeout === null)
    {
      afkt = "Sunucuda Afk Kanalı Ayarlanmamış."
    }
      
        let system = message.guild.systemChannel
  if(message.guild.systemChannel === null)
    {
      system = "Sunucuda Sistem Mesajları Kanalı Ayarlanmamış."
    }
           let region = message.guild.region
  if(message.guild.region === null)
    {
      region = "Yok"
    }
  
  
   
       
  const tarih = useful.tarih(message.guild.createdTimestamp)
    const sunucubilgi = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic:true}))
      .addField(`<:serverowner:${emoji.owner}> Sunucu Sahibi`, message.guild.owner, true)
    .addField(`<:purpleinbox:${emoji.inbox}> Sunucu Adı`, message.guild.name, true)
      .addField(`<:purplejoin:${emoji.join}> Sunucu ID`, message.guild.id, true)
      .addField(`<:purpleplane:${emoji.plane}> Sunucu Bölgesi`, region, true)
     .addField(
        `<:purpledeafened:${emoji.deafened}><:purplemuted:903946666053361706> AFK Kanalı`, afk, true
      )
     .addField(`<:purpledisconnect:${emoji.disconnect}> AFK Zaman Aşımı`, afkt, true)
    .addField(`<:purpleshop:${emoji.shop}> Sistem Mesaj Kanalı `, system, true)
  
      .addField(`<:purplesupport:${emoji.support}> Oluşturulma Tarihi`, `${tarih}`, true)
      .addField(
        `<:banhammer:${emoji.hammer}> Banlar [${listsize}]`, `${list1}`,true
      )
   .addField('\u200B', "\u200B")
    .addField(`<:purpleticket:${emoji.ticket}> Rol Sayısı [${roles.length - 1}]`, roles.join('| ')+rolesa)
       .addField(`<:purpletextchannel:${emoji.kanal}><:purpleintegraiton:${emoji.integraiton}> Kanal Sayısı [${channels.length - 1}]`,`<:purplelock:${emoji.kanal}>__${message.guild.channels.cache.filter(c => c.type === 'text').size}:__ ${channels1.join('| ')+channels1a} \n<:purpleintegraiton:${emoji.integraiton}> __${message.guild.channels.cache.filter(c => c.type === 'voice').size}:__ ${channels2.join('| ')+channels2a} \n\n`)
   
    .addField(`<:purplemembers:${emoji.members}> Üye Sayısı [${message.guild.memberCount}]`,`<:cevrimiciuye:${emoji.çevrimiçi}> __${message.guild.members.cache.filter(member => member.presence.status === 'online').size}__  <:bostauye:${emoji.boşta}> __${message.guild.members.cache.filter(member => member.presence.status === 'idle').size}__ <:rahatsizetmeuye:${emoji.dnd}> __${message.guild.members.cache.filter(member => member.presence.status === 'dnd').size}__  <:offlineuye:${emoji.offline}> __${message.guild.members.cache.filter(member => member.presence.status === 'offline').size}__ <:bot:${emoji.bot}> __${message.guild.members.cache.filter(m => m.user.bot).size}__`,true)
      
       .addField('\u200B', "\u200B",true)
     .addField(`<:purpleimage:903946666414067763> Emoji Sayısı [${message.guild.emojis.cache.size}]`, `${emojis1.join(' ')+a}`,true)
  .setFooter(`Sorgulayan: ${message.author.tag}`, message.author.avatarURL({dynamic:true}))
    .setThumbnail(message.guild.iconURL({dynamic:true}));
    return  message.lineReplyNoMention(sunucubilgi).then(async message => {
	message.react('<a:dunya:823956494692253716>')

  
  
})})
      }}, 1 * 1000);}
               
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucu", "sunucu-bilgi", "sbilgi","server","server-bilgi","sbilgi","serverinfo","server-info"],
  permLevel: 0
};

exports.help = {
  name: "s",
  description: "Sunucu hakkında bilgi verir.",
    kategori: "kullanıcı",
  usage: "sunucubilgi"
};