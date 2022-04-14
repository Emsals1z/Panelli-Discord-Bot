const Discord = require('discord.js');
const emoji = require("../emojiler.json");
const moment = require('moment');
require('moment-duration-format');
require('discord-reply'); //⚠️ IMPORTANT: put this before your discord.Client()
const client = new Discord.Client();
exports.run = function (client, message, args ) {
  message.react(`<a:onayy:${emoji.onayyy}>`)
    setTimeout(function() {
 
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('<a:alert:871046210021122059> **Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
   const kisi = message.author || message.mentions.users.first()
    let badge = ""
    let nitro = ""
       let early = ""
        let developer = ""
    
                           if(kisi.avatarURL({dynamic: true}).endsWith('.gif')) {
                             nitro = `<:nitro:${emoji.nitro}>`
                         } 
  
    kisi.flags.toArray().forEach(flag =>{
                                if (flag === "HOUSE_BALANCE") { 
                                    badge = `<:balance:${emoji.balance}>`
                                  }
                
                               if (flag === "HOUSE_BRILLIANCE") { 
                                   badge = `<:brilliance:${emoji.brilliance}>`
                            }
                
                               if (flag === "HOUSE_BRAVERY") { 
                             badge = `<:bravery:${emoji.bravery}>`
                               }
                               
                               if (flag === "VERIFIED_DEVELOPER") {
                             developer = `<:developer:${emoji.developer}>`
                               }
                               
                               if (flag === "EARLY_SUPPORTER") { 
                                  early = `<:supporter:${emoji.supporter}>`
                              }
                            })
  var aylar = {
      "01": "Ocak",
      "02": "Şubat",
      "03": "Mart",
      "04": "Nisan",
      "05": "Mayıs",
      "06": "Haziran",
      "07": "Temmuz",
      "08": "Ağustos",
      "09": "Eylül",
      "10": "Ekim",
      "11": "Kasım",
      "12": "Aralık"
    }
    var duration = moment.duration(client.uptime).format(" D [gün] H [saat] m [dakika] s [saniye]")
    let nick = ""
    if(message.guild.member(kisi).nickname === null)
      {nick = message.author.username}
      else
  {nick = message.guild.member(kisi).nickname}

   var f =''
 if(kisi.presence.activities.map(a=>a.state)) f=kisi.presence.activities.map(a=>a.state)
 if(kisi.presence.activities.map(a=>a.state) =='') f='Yok'
  var Durum = message.author.presence.status;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi ") : (Durum == "offline" ? ("Çevrimdışı ") : (Durum == "idle" ? ("Boşta ") : (Durum == "dnd" ? ("Rahatsız Etmeyin ") : ("Bilinmiyor/bulunamadı.")))))
   let k 
 if(kisi.lastMessageChannelID) k= `<#${kisi.lastMessageChannelID}>`
 if(!kisi.lastMessageChannelID) k= `Yok`
 const m = message.guild.members.cache.find(a=>a.id == kisi.id)
  var üye = message.mentions.users.first();
  if (üye) {
     let badge = ""
    let nitro = ""
       let early = ""
        let developer = ""
    
                           if(üye.avatarURL({dynamic: true}) .endsWith('.gif')) {
                             nitro = `<:nitro:${emoji.nitro}>`
                         } 
  
    üye.flags.toArray().forEach(flag =>{
                                if (flag === "HOUSE_BALANCE") { 
                                    badge = `<:balance:${emoji.balance}>`
                                  }
                
                               if (flag === "HOUSE_BRILLIANCE") { 
                                   badge = `<:brilliance:${emoji.brilliance}>`
                            }
                
                               if (flag === "HOUSE_BRAVERY") { 
                             badge = `<:bravery:${emoji.bravery}>`
                               }
                               
                               if (flag === "VERIFIED_DEVELOPER") {
                             developer = `<:developer:${emoji.developer}>`
                               }
                               
                               if (flag === "EARLY_SUPPORTER") { 
                                  early = `<:supporter:${emoji.supporter}>`
                              }
                            })
     let nick1 = ""
    if(message.guild.member(üye).nickname === null)
      {nick1 = üye.username}
      else
  {nick1 = message.guild.member(üye).nickname}

     let roles =  message.guild.members.cache.get(üye.id).roles.cache.filter(r => r.name !== "@everyone").sort((a, b) => b.position - a.position).map(role => role.toString());
  let roles1= ""
  let rolesa = ""
  if(roles.length > 20)
{
  roles1 = roles.slice(0, 19)
  rolesa = "+"+roles.slice(19).length
}
    var f1 =''
 if(üye.presence.activities.map(a=>a.state)) f1=üye.presence.activities.map(a=>a.state)
 if(üye.presence.activities.map(a=>a.state) =='') f1='Yok'
      var Durum1 = üye.presence.status;
        var Durmu1 = (Durum1 == "online" ? (0x00AE86) : (Durum1 == "offline" ? (0x808080) : (Durum1 == "idle" ? (0xFFFF00) : (Durum1 == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durum1 = (Durum1 == "online" ? ("Çevrimiçi ") : (Durum1 == "offline" ? ("Çevrimdışı ") : (Durum1 == "idle" ? ("Boşta ") : (Durum1 == "dnd" ? ("Rahatsız Etmeyin ") : ("Bilinmiyor/bulunamadı.")))))
   let k 
 if(üye.lastMessageChannelID) k= `<#${üye.lastMessageChannelID}>`
 if(!üye.lastMessageChannelID) k= `\`Yok\``
    const CrewCodeembed = new Discord.MessageEmbed()
 .setAuthor(`${üye.tag}`,üye.avatarURL({dynamic:true}))
.setColor('BLACK')
.setThumbnail(üye.avatarURL({dynamic:true}))
.setTitle('Profil')
	.setURL(`https://discordapp.com/users/${üye.id}`)
.setDescription(`**İsmi:** \`${üye.username + '#' + üye.discriminator}\`\n**Sunucudaki İsmi:** \`${nick1}\`\n**ID: ** \`${üye.id}\`\n**Son Mesaj: ** \`${message.mentions.users.first().lastMessage}\`\n**Son Mesaj İD: ** \`${message.mentions.users.first().lastMessageID}\`\n**Son Mesaj Kanalı: ** ${k}\n**Oynadığı Oyun: ** \`${üye.presence.game ? üye.presence.game.name : 'Şu an oyun oynamıyor'}\`\n**Durum:** \`${durum1}\`\n**Özel Durum Mesajı:** \`${f1}\`\n**Sunucuya Girme Zamanı:**\`${moment(üye.joinedAt).format(' D MMMM YYYY h:mm:ss')}\`\n**Hesabı Oluşturulduğu Tarih: ** \`${(`${moment(üye.createdAt).format('DD')} ${aylar[moment(üye.createdAt).format('MM')]} ${moment(üye.createdAt).format('YYYY HH:mm:ss')}`)}\`\n**Bot mu?** ${üye.bot  ? ':white_check_mark:' : ':negative_squared_cross_mark:'}\n**Rozetler: **${developer+early+badge+nitro}\n**Roller: ** ${roles.join(' **|** ')}`)
.setTimestamp()
.setFooter(`${client.user.tag} |`,message.guild.iconURL({dynamic:true}))
 message.lineReplyNoMention(CrewCodeembed).then(async message => {


  
  })
  } else {
const CrewCodeembed = new Discord.MessageEmbed()
 .setAuthor(`${message.author.tag}`,message.author.avatarURL({dynamic:true}))
.setColor('BLACK')
.setThumbnail(message.author.avatarURL({dynamic:true}))
.setTitle('Profil')
	.setURL(`https://discordapp.com/users/${message.author.id}`)
.setDescription(`**İsmi:** \`${message.author.username + '#' + message.author.discriminator}\`\n**Sunucudaki İsmi:** \`${nick}\`\n**ID: ** \`${message.author.id}\`\n**Son Mesaj: ** \`${message.author.lastMessage}\`\n**Son Mesaj İD: ** \`${message.author.lastMessageID}\` \n**Son Mesaj Kanalı: ** ${k}\n**Oynadığı Oyun: ** \`${message.author.presence.game ? message.author.presence.game.name : 'Şu an oyun oynamıyor'}\`\n**Durum:** \`${durm}\`\n**Özel Durum Mesajı:** \`${f}\`\n**Sunucuya Girme Zamanı:**\`${moment(m.joinedAt).format(' D MMMM YYYY h:mm:ss')}\`\n**Hesabı Oluşturulduğu Tarih: ** \`${(`${moment(message.author.createdAt).format('DD')} ${aylar[moment(message.author.createdAt).format('MM')]} ${moment(message.author.createdAt).format('YYYY HH:mm:ss')}`)}\`\n**Bot mu?** ${message.author.bot ? ':white_check_mark:' : ':negative_squared_cross_mark:'}\n**Rozetler: **${developer+early+badge+nitro}\n**Roller: ** ${message.guild.members.cache.get(message.author.id).roles.cache.filter(r => r.name !== "@everyone").sort((a, b) => b.position - a.position).map(role => role.toString()).map(r => r).join(' **|** ')}`)
.setTimestamp()
.setFooter(`${client.user.tag} |`,message.guild.iconURL({dynamic:true}))
 message.lineReplyNoMention(CrewCodeembed).then(async message => {


  
  })

  }
  }, 1 * 1000);
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'profil',
  description: 'Etiketlenen veya yazan kişinin profilinin detaylarını verir.',
  kategori: "kullanıcı",
  usage: 'profil'
};
