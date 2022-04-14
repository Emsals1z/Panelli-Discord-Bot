const Discord = require('discord.js');
const db = require('quick.db')
  const canvacord = require("canvacord");

exports.run = async(client, message, args) => { 
  message.channel.bulkDelete(1).then
   let hm = await db.fetch(`seviyeacik_${message.guild.id}`)
  let kanal = await db.fetch(`svlog_${message.guild.id}`)
  let xp = await db.fetch(`verilecekxp_${message.guild.id}`)
  let seviyerol = await db.fetch(`svrol_${message.guild.id}`)
  let rollvl = await db.fetch(`rollevel_${message.guild.id}`)
  var xpToLvl = await db.fetch(`xpToLvl_${message.author.id}_${message.guild.id}`);
  let kxp = await db.fetch(`xp_${message.author.id}_${message.guild.id}`)
  let klvl = await db.fetch(`lvl_${message.author.id}_${message.guild.id}`)
  if(!hm) return message.channel.send('Seviye komutları aktif değil! \n `-seviye-aç -seviye-rol -seviye-log -seviye-xp -seviye-ayarlar -seviye-kapat`')
  var user = message.mentions.users.first() || message.author;
  
  let kontrol;
  if(klvl == null) kontrol = '0'
  else kontrol = kxp
  
  let kontrol2;
  if(klvl == null) kontrol2 = '0'
  else kontrol2 = klvl-1

const renk = await db.fetch(`seviyearkarenk_${message.guild.id}`)
const bar = await db.fetch(`seviyebarrenk_${message.guild.id}`)

/*const renkyeşil = #00ee00
const renkkırmızı = #ff0000
const renkbeyaz = #ffffff
const renkmavi = #1e90ff
const renksarı = #ffff00
const renkturuncu = #ff7f24
const renkmor = #bf3eff
const renkturkuvas = #00f5ff
const renkpembe = #ff34b3*/
    

const rank = new canvacord.Rank()
    .setAvatar(message.author.displayAvatarURL({dynmic: false,format: 'png'}))
    .setCurrentXP(kontrol)
    .setRequiredXP(xpToLvl)

 if(db.has(`seviyearkarenk_${message.guild.id}`) === true) 
    {
        if(renk === "yeşil")
            {
   rank.setBackground("COLOR","##00ee00")
                }
         if(renk === "kırmızı")
            {
   rank.setBackground("COLOR","#ff0000")
                }
         if(renk === "beyaz")
            {
   rank.setBackground("COLOR","#ffffff")
                }
         if(renk === "mavi")
            {
   rank.setBackground("COLOR","#1e90ff")
                }
         if(renk === "sarı")
            {
   rank.setBackground("COLOR","#ffff00")
                }
         if(renk === "turuncu")
            {
   rank.setBackground("COLOR","#ff7f24")
                }
                 if(renk === "mor")
            {
   rank.setBackground("COLOR","#bf3eff")
                }
           if(renk === "turkuvas")
            {
   rank.setBackground("COLOR","#00f5ff")
                }
              if(renk === "pembe")
            {
   rank.setBackground("COLOR","#ff34b3")
                }
        }
    else if(db.has(`${message.guild.id}.resim`) === true){ 
        const arkaresim = await db.fetch(`${message.guild.id}.resim`)
        rank.setBackground("IMAGE",arkaresim)
    }
   rank.setLevel(kontrol2)
    .setStatus(message.author.presence.status)
 const ab = db.fetch(`${message.guild.id}.renk`)
  if(db.has(`${message.guild.id}.resim`) === true) {
       rank.setProgressBar(ab, "COLOR")    
      }  
    else if(db.has(`seviyebarrenk_${message.guild.id}`) === true) 
    {
     
      if(bar === "yeşil")
            {
   rank.setProgressBar("##00ee00", "COLOR")                
   
                }
         if(bar === "kırmızı")
            {
    rank.setProgressBar("#ff0000", "COLOR")                

                }
         if(bar === "beyaz")
            {
    rank.setProgressBar("#ffffff", "COLOR")                
  
                }
         if(bar === "mavi")
            {
  rank.setProgressBar("#1e90ff", "COLOR")                 
  
                }
         if(bar === "sarı")
            {
    rank.setProgressBar("#ffff00", "COLOR")               
   
                }
         if(bar === "turuncu")
            {
  rank.setProgressBar("#ff7f24", "COLOR")                
   
                }
                 if(bar === "mor")
            {
     rank.setProgressBar("#bf3eff", "COLOR")             
   
                }
           if(bar === "turkuvas")
            {
    rank.setProgressBar("#00f5ff", "COLOR")
  
                }
              if(bar === "pembe")
            {
   rank.setProgressBar("#ff34b3", "COLOR")

                }
  
        }
    rank.setUsername(message.member.user.username)
    .setDiscriminator(message.member.user.discriminator);

rank.build()
    .then(data => {
        const attachment = new Discord.MessageAttachment(data, "RankCard.png");
        message.channel.send(attachment);
    });
  let seviye = new Discord.MessageEmbed()
  .setTitle('Seviye Bilgisi:')
   .setAuthor(message.member.user.username, message.author.avatarURL)
  .addField('Kullanıcı:', user, true)
  .addField('Kullanıcı XP değeri:', '**'+kontrol+'**', true)
  .addField('Kullanıcı Seviye Değeri:', '**'+kontrol2+'**', true)
  .setFooter('F-Bot Seviye Sistemi',client.user.avatarURL({dynamic:true}))
  .setColor('RANDOM')
  .setTimestamp()
  .setThumbnail(user.avatarURL)
  message.channel.send(seviye)
 

 };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'seviye',
  description: 'Yazan kişinin seviyesini verir.', 
   kategori: "seviye",
  usage: 'seviye'
};