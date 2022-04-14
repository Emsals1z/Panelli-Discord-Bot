
   const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const moment = require("moment");
require("moment-duration-format");
    const Canvas = require("canvas")
 
exports.run = async (client, message, args ,guild) => {
     message.react('<a:onayy:848517607803715594>')
   
  setTimeout(async function() {
         if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**<a:alert:871046210021122059> Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
    message.channel.bulkDelete(1).then
 var tarih = [moment().format('DD-MM-YYYY | H:mm:ss')]
    let foto = args[0]
   let twit = args.slice(1).join(" ")
 if(!foto) return message.channel.send("<a:alert:871046210021122059> Atılacak post ne?|Örnek kulllanım: -insta <post fotoğrafı> <post açıklaması>")
if(!twit) return message.channel.send("<a:alert:871046210021122059> Postun açıklamasına ne yazmak istersin?|Örnek kulllanım: -insta <post fotoğrafı> <post açıklaması>")
   
const canvas = Canvas.createCanvas(555, 821)
const ctx = canvas.getContext('2d')

const background = await Canvas.loadImage("resimler/instaa.png");
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
//cerceve
    
    ctx.strokeStyle = "#00000";
     ctx.lineWidth = 5;
    ctx.strokeRect(0,0, canvas.width, canvas.height);
    //yazı
  ctx.font = "14px Sans-serif",
  ctx.fillStyle = "#808080"
  ctx.fillText(twit, 110, 670);
    //yazı2 
        ctx.font = "14px Sans-serif",
  ctx.fillStyle = "#0a0909"
  ctx.fillText(message.author.username, 65, 42);
     ctx.font = "13px Sans-serif",
  ctx.fillStyle = "#0a0909"
  ctx.fillText(message.author.username, 15, 670);
     ctx.font = "13px Sans-serif",
  ctx.fillStyle = "#0a0909"
  ctx.fillText(client.user.username, 15, 710);
        ctx.font = "14px Sans-serif",
  ctx.fillStyle = "#808080"
  ctx.fillText("Müqemmelsin moruq", 53, 710);
 ctx.font = "14px Sans-serif",
  ctx.fillStyle = "#949494"
  ctx.fillText("48 yorumun tümünü gör", 15, 690);

        
    ctx.font = "9px Sans-serif",
  ctx.fillStyle = "#0a0909"
  ctx.fillText(tarih, 15, 774);

     const avatar3 = await Canvas.loadImage(foto)
    ctx.drawImage(avatar3, 18, 81, 520, 520);
 //  ctx.strokeStyle = "#00000";
  //   ctx.lineWidth = 1;
  //  ctx.strokeRect(18, 81, 520, 520);
   
  
      //avatar bot

     //   const avatar2 = await Canvas.loadImage(message.guild.iconURL({format: "png"}))
    // ctx.drawImage(avatar2, 358, 290.5, 13, 13);
  // ctx.strokeStyle = "#00000";
   //  ctx.lineWidth = 1;
   // ctx.strokeRect(358,290.5, 13, 13);

      //avatar sunucu
    

     
      //  const avatar3 = await Canvas.loadImage(client.user.avatarURL({format: "png"}))
    // ctx.drawImage(avatar3, 343, 290.5, 13, 13);
  // ctx.strokeStyle = "#00000";
  //   ctx.lineWidth = 1;
  //  ctx.strokeRect(343,290.5, 13, 13);
   //avatar kırpma
    
  
    ctx.beginPath()
    ctx.arc(41, 36, 17, 0, Math.PI * 2,true)
   ctx.strokeStyle = '#000000';
   ctx.lineWidth = 4;
    ctx.stroke();
    ctx.save();
    ctx.closePath();
   ctx.clip();
    
      //avatar
    const avatar = await Canvas.loadImage(message.author.avatarURL({format: "png"}))
   ctx.drawImage(avatar, 20, 17, 45, 45);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "instaa.png")
  

     message.channel.send(attachment)
         .then(async message => {
message.react('<a:instagram:833373208706154506>')

	

  
  
})
      }, 1 * 1500);
};
             
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["İNSTA","instagram","İNSTAGRAM"],
  permLevel: 2

};

exports.help = {
  name: "insta",
  description: "İnstagram görünümünde mesaj atmanıza yarar.",
   kategori: "eğlence",
  usage: "!insta"
};