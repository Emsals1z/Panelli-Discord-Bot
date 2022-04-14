
   const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const moment = require("moment");
require("moment-duration-format");
    const Canvas = require("canvas")
exports.run = async (client, message, args ,guild) => {
     message.react('<a:onayy:823559589345230869>')
   
  setTimeout(async function() {
         if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
    message.channel.bulkDelete(1).then
 var tarih = [moment().format('DD-MM-YYYY | H:mm:ss')]

    let twit = args.slice(0).join(" ")
if(!twit) return message.channel.send("Ne Twiti atıcaksın?")
   
const canvas = Canvas.createCanvas(700, 325)
const ctx = canvas.getContext('2d')

const background = await Canvas.loadImage("resimler/twiter2.png");
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
//cerceve
    
    ctx.strokeStyle = "#00000";
     ctx.lineWidth = 5;
    ctx.strokeRect(0,0, canvas.width, canvas.height);
    //yazı
  ctx.font = "20px Sans-serif",
  ctx.fillStyle = "#0a0909"
  ctx.fillText(twit, 50, 118);
    //yazı2 
        ctx.font = "16px Sans-serif",
  ctx.fillStyle = "#0a0909"
  ctx.fillText(message.author.username, 112, 60);
      
     ctx.font = "10px Sans-serif",
  ctx.fillStyle = "#808080"
  ctx.fillText("48K", 64, 300);
        ctx.font = "10px Sans-serif",
  ctx.fillStyle = "#808080"
  ctx.fillText("48K", 158, 300);
        ctx.font = "10px Sans-serif",
  ctx.fillStyle = "#808080"
  ctx.fillText("480K", 248, 300);
         ctx.font = "14px Bebas-neue",
  ctx.fillStyle = "#0a0909"
  ctx.fillText("480.480", 171, 250);
         ctx.font = "14px Bebas-neue",
  ctx.fillStyle = "#0a0909"
  ctx.fillText("48.048", 45, 250);
      
    //yazı3
 ctx.font = "15px Sans-serif",
  ctx.fillStyle = "#0a0909"
  ctx.fillText(tarih, 515, 315);

    
    //avatar2
  
      //avatar

        const avatar2 = await Canvas.loadImage(message.guild.iconURL({format: "png"}))
     ctx.drawImage(avatar2, 358, 290.5, 13, 13);
   ctx.strokeStyle = "#00000";
     ctx.lineWidth = 1;
    ctx.strokeRect(358,290.5, 13, 13);

      //avatar3
    

     
        const avatar3 = await Canvas.loadImage(client.user.avatarURL({format: "png"}))
     ctx.drawImage(avatar3, 343, 290.5, 13, 13);
   ctx.strokeStyle = "#00000";
     ctx.lineWidth = 1;
    ctx.strokeRect(343,290.5, 13, 13);
   //avatar kırpma
    
  
    ctx.beginPath()
    ctx.arc(75, 57, 30, 0, Math.PI * 2,true)
   ctx.strokeStyle = '#000000';
   ctx.lineWidth = 6;
    ctx.stroke();
    ctx.save();
    ctx.closePath();
   ctx.clip();
    
      //avatar
    const avatar = await Canvas.loadImage(message.author.avatarURL({format: "png"}))
   ctx.drawImage(avatar, 45, 27, 60, 60);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "twiter2.png")
  

     message.channel.send(attachment)
         .then(async message => {
message.react('<a:twitter:716676469656649749>')

	

  
  
})
      }, 1 * 1500);
};
             
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["TWİT","twitter","	TWİTTER"],
  permLevel: 2

};

exports.help = {
  name: "twit",
  description: "Twitter görünümünde post atar.",
    kategori: "eğlence",
  usage: "-twit"
};