const Discord = require('discord.js');
const moment = require('moment');
const ms = require('ms');
const Canvas = require("canvas")
exports.run = async (client, message , args ) => {
var time = moment().format('Do MMMM YYYY , hh:mm');
var room;
var title;
var duration;
var çevir
var değer
var currentTime = new Date(),
hours = currentTime.getHours() + 3 ,
minutes = currentTime.getMinutes(),
done = currentTime.getMinutes() + duration,
seconds = currentTime.getSeconds();
if (minutes < 10) {
minutes = "0" + minutes;
}
var suffix = "AM";
if (hours >= 12) {
suffix = "PM";
hours = hours - 12;
}
if (hours == 0) {
hours = 12;
}
var filter = m => m.author.id === message.author.id;
 const canvas = Canvas.createCanvas(1080, 1080)
const ctx = canvas.getContext('2d')
  const background = await Canvas.loadImage("resimler/sise.png");
 ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    
  
 
  
      message.channel.send(`🍾| **Oyunun yapılacağı kanalın adını yaz Ör: şişe çevirme-odası**`).then(msg => {
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      }).then(collected => {
        let room = message.guild.channels.cache.find(channel => channel.name === collected.first().content); 
        if(!room) return message.channel.send('🍾| **Böyle bir kanal bulamadım**');
        room = collected.first().content;
        collected.first().delete();
                   msg.edit('🍾| **Oyun bekleme süresini belirle (1s, 1m, 1h, 1d)**').then(msg => {
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
          }).then(collected => {
            if(!collected.first().content.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('🍾| **Böyle bir süre bilmiyorum :(**');
            duration = collected.first().content
            collected.first().delete();
          msg.edit('🍾| **Şimdi de çağırma mesajı yaz bakalım**').then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
              }).then(collected => {
                title = collected.first().content;
                collected.first().delete();
                msg.delete();
                message.delete();
         
                try {
                  let giveEmbed = new Discord.MessageEmbed()
                  .setColor("#f558c9")
                   .setTitle(`\`\`\`${title}\`\`\``)
                  .setDescription(`**Başlama Zamanı :** \`${hours+12}:${minutes}:${seconds}\` \n**Bekleme Süresi:** \`${duration}\` \n **Oyunu başlatan: **<@${message.author.id}>`)
                  .setFooter("F-Bot", client.user.avatarURL({dynamic:true}));
                  message.guild.channels.cache.find(channel => channel.name === room).send(giveEmbed).then(m => {
                     let re = m.react('🍾');
                      
                    setTimeout(async () => {
                    let users = await m.reactions.cache.get("🍾").users.fetch();
                       let list = users.array().filter(u => u.id !== m.author.id !== client.user.id);
                        let gFilter = list[Math.floor(Math.random() * list.length) + 0]
                        let gFilter1 = list[Math.floor(0) + 0]
                        let gFilter2 = list[Math.floor(1) + 0]
                        let gFilter3 = list[Math.floor(2) + 0]
                         let gFilter4 = list[Math.floor(3) + 0]
           
                              if (list.length === 5){
                                     let endEmbed = new Discord.MessageEmbed()
                       .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
                      .setColor("#f558c9")
                     .setFooter("E-Bot", client.user.avatarURL({dynamic:true}))
                      .setDescription(`\`OYUN BAŞLADI!\` \n\n**İlk Oyuncu:** ${gFilter} \n**Oyunu Başlatan: **<@${message.author.id}>`)
                       .setTimestamp()
                     m.edit(endEmbed);
                     //  message.guild.channels.cache.find(channel => channel.name === room).send(gFilter.avatarURL())
                                
               /////////////////////////////////////////////////////////////canvas////////////////////////////////////////////////////////
                                    //yazı
         ctx.font = "40px Sans-serif",
       ctx.fillStyle = "#00000"
        ctx.fillText(gFilter1.username, 390, 370);
         //yazı2 
            ctx.font = "40px Sans-serif",
          ctx.fillStyle = "#00000"
                 ctx.fillText(gFilter2.username, 750, 750);
            ctx.font = "40px Sans-serif",
       ctx.fillStyle = "#00000"
        ctx.fillText(gFilter3.username, 390, 1060);
         //yazı2 
            ctx.font = "40px Sans-serif",
          ctx.fillStyle = "#00000"
                 ctx.fillText(gFilter4.username, 25, 750);
                                                       if(gFilter === gFilter1)
                                      {
                                   const avatar30 = await Canvas.loadImage("resimler/gFilter1.png")
                                            ctx.drawImage(avatar30, 30, 30, 1000, 1000);
                                      }  
       if(gFilter === gFilter2)
                                      {
      const avatar31 = await Canvas.loadImage("resimler/gFilter2.png")
                                            ctx.drawImage(avatar31, 30, 30, 1000, 1000);
                                      }
                  if(gFilter === gFilter3)
                                      {
    const avatar32 = await Canvas.loadImage("resimler/gFilter3.png")
                                            ctx.drawImage(avatar32, 30, 30, 1000, 1000);
                                      }
      if(gFilter === gFilter4)
                                      {
    const avatar33 = await Canvas.loadImage("resimler/gFilter4.png")
                                            ctx.drawImage(avatar33, 30, 30, 1000, 1000);
                                      }
                                       const avatar3 = await Canvas.loadImage(gFilter1.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar3, 390, 20, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(390, 20, 300, 300);
                                         const avatar1 = await Canvas.loadImage(gFilter2.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar1, 750, 400, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(750, 400, 300, 300);
                                    const avatar10 = await Canvas.loadImage(gFilter3.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar10, 390, 720, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(390, 720, 300, 300);
                                         const avatar111 = await Canvas.loadImage(gFilter4.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar111, 25, 400, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                  
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(25, 400, 300, 300);
                                 //       const avatar2 = await Canvas.loadImage(gFilter3.avatarURL({format: "png"}))
                                   //         ctx.drawImage(avatar2, 343, 290.5, 13, 13);
                                 //        ctx.strokeStyle = "#00000";
                                 //                        ctx.lineWidth = 4;
                                //                    ctx.strokeRect(343,290.5, 13, 13);
                                //      const avatar4 = await Canvas.loadImage(gFilter4.avatarURL({format: "png"}))
                                //            ctx.drawImage(avatar4, 343, 290.5, 13, 13);
                                ////         ctx.strokeStyle = "#00000";
                                   //                      ctx.lineWidth = 4;
                                  ///                  ctx.strokeRect(343,290.5, 13, 13);
                              
                                           const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "sise.png")
                                             message.channel.send(attachment)
                                      
                                 
                                  
                                         /////////////////////////////////////////////////////////////canvas////////////////////////////////////////////////////////
                                   setTimeout(function() {
                       var embedLel = new Discord.MessageEmbed()
                        .setColor("BLACK")
                        .setDescription(`**${gFilter} şişenin ucu sana bakıyor. Doğruluk mu? Cesaret mi?**`).setFooter("F-Bot ", client.user.avatarURL({dynamic:true})).setTimestamp()
                    message.guild.channels.cache.find(channel => channel.name === room).send(embedLel).then(msg => {
                                           msg.react('🇩')
                                           msg.react('🇨').then( r => {
        msg.react('🍾')

        // Filters
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '🇩' && user.id === gFilter.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '🇨' && user.id === gFilter.id;
        const reload = (reaction, user) => reaction.emoji.name === '🍾' && user.id === gFilter.id;

                                               
        const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000});
        const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000});
        const reload1 = msg.createReactionCollector(reload, {timer: 6000});

        backwards.on('collect', r => {
           
         
           embedLel.setDescription(`${gFilter} ** Demek doğruluk ha hadi bakalım**`);
            
            msg.edit(embedLel)
              
               
        })

        forwards.on('collect', r => {
             
            embedLel.setDescription(`${gFilter}** Demek cesaret ha hadi bakalım**`);
            
            msg.edit(embedLel)
          
        })
        reload1.on('collect', r => {
             let gFilterrandom = list[Math.floor(Math.random() * list.length) + 0]
      setTimeout(async () => {
          
        ctx.font = "40px Sans-serif",
       ctx.fillStyle = "#00000"
        ctx.fillText(gFilter1.username, 390, 370);
         //yazı2 
            ctx.font = "40px Sans-serif",
          ctx.fillStyle = "#00000"
                 ctx.fillText(gFilter2.username, 750, 750);
            ctx.font = "40px Sans-serif",
       ctx.fillStyle = "#00000"
        ctx.fillText(gFilter3.username, 390, 1060);
         //yazı2 
            ctx.font = "40px Sans-serif",
          ctx.fillStyle = "#00000"
                 ctx.fillText(gFilter4.username, 25, 750);
           const avatar36 = await Canvas.loadImage("resimler/aaaa.png")
                                            ctx.drawImage(avatar36, 30, 30, 1000, 1000);
                                                       if(gFilterrandom === gFilter1)
            
                                      {
                                   const avatar30 = await Canvas.loadImage("resimler/gFilter1.png")
                                            ctx.drawImage(avatar30, 30, 30, 1000, 1000);
                                      }  
       if(gFilterrandom === gFilter2)
                                      {
      const avatar31 = await Canvas.loadImage("resimler/gFilter2.png")
                                            ctx.drawImage(avatar31, 30, 30, 1000, 1000);
                                      }
                  if(gFilterrandom === gFilter3)
                                      {
    const avatar32 = await Canvas.loadImage("resimler/gFilter3.png")
                                            ctx.drawImage(avatar32, 30, 30, 1000, 1000);
                                      }
      if(gFilterrandom === gFilter4)
                                      {
    const avatar33 = await Canvas.loadImage("resimler/gFilter4.png")
                                            ctx.drawImage(avatar33, 30, 30, 1000, 1000);
                                      }
                                       const avatar3 = await Canvas.loadImage(gFilter1.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar3, 390, 20, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(390, 20, 300, 300);
                                         const avatar1 = await Canvas.loadImage(gFilter2.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar1, 750, 400, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(750, 400, 300, 300);
                                    const avatar10 = await Canvas.loadImage(gFilter3.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar10, 390, 720, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(390, 720, 300, 300);
                                         const avatar111 = await Canvas.loadImage(gFilter4.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar111, 25, 400, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                  
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(25, 400, 300, 300);
                                 //       const avatar2 = await Canvas.loadImage(gFilter3.avatarURL({format: "png"}))
                                   //         ctx.drawImage(avatar2, 343, 290.5, 13, 13);
                                 //        ctx.strokeStyle = "#00000";
                                 //                        ctx.lineWidth = 4;
                                //                    ctx.strokeRect(343,290.5, 13, 13);
                                //      const avatar4 = await Canvas.loadImage(gFilter4.avatarURL({format: "png"}))
                                //            ctx.drawImage(avatar4, 343, 290.5, 13, 13);
                                ////         ctx.strokeStyle = "#00000";
                                   //                      ctx.lineWidth = 4;
                                  ///                  ctx.strokeRect(343,290.5, 13, 13);
                              
                                 
           
                                 //       const avatar2 = await Canvas.loadImage(gFilter3.avatarURL({format: "png"}))
                                   //         ctx.drawImage(avatar2, 343, 290.5, 13, 13);
                                 //        ctx.strokeStyle = "#00000";
                                 //                        ctx.lineWidth = 4;
                                //                    ctx.strokeRect(343,290.5, 13, 13);
                                //      const avatar4 = await Canvas.loadImage(gFilter4.avatarURL({format: "png"}))
                                //            ctx.drawImage(avatar4, 343, 290.5, 13, 13);
                                ////         ctx.strokeStyle = "#00000";
                                   //                      ctx.lineWidth = 4;
                                  ///                  ctx.strokeRect(343,290.5, 13, 13);
                                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "sise.png")
                                             message.channel.send(attachment)
             }, 1 * 100);
                                         /////////////////////////////////////////////////////////////canvas////////////////////////////////////////////////////////
 setTimeout(async () => {
                       var embedLel = new Discord.MessageEmbed()
                        .setColor("BLACK")
                        .setDescription(`**${gFilterrandom} şişenin ucu sana bakıyor. Doğruluk mu? Cesaret mi?**`).setFooter("F-Bot ", client.user.avatarURL({dynamic:true})).setTimestamp()
                    message.guild.channels.cache.find(channel => channel.name === room).send(embedLel).then(msg => {
                                                       msg.react('🇩')
                                           msg.react('🇨').then( r => {
        msg.react('🍾')

        // Filters
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '🇩' && user.id === gFilterrandom.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '🇨' && user.id === gFilterrandom.id;
        const reload = (reaction, user) => reaction.emoji.name === '🍾' && user.id === gFilterrandom.id;

                                               
        const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000});
        const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000});
        const reload1 = msg.createReactionCollector(reload, {timer: 6000});

        backwards.on('collect', r => {
           
         
           embedLel.setDescription(`${gFilterrandom} **Demek doğruluk ha hadi bakalım**`);
            
            msg.edit(embedLel)
              
               
        })

        forwards.on('collect', r => {
             
            embedLel.setDescription(`${gFilterrandom}**Demek cesaret ha hadi bakalım**`);
            
            msg.edit(embedLel)
          
        })
        reload1.on('collect', r => {
                        let gFilterrandom2 = list[Math.floor(Math.random() * list.length) + 0]
      setTimeout(async () => {
          
        ctx.font = "40px Sans-serif",
       ctx.fillStyle = "#00000"
        ctx.fillText(gFilter1.username, 390, 370);
         //yazı2 
            ctx.font = "40px Sans-serif",
          ctx.fillStyle = "#00000"
                 ctx.fillText(gFilter2.username, 750, 750);
            ctx.font = "40px Sans-serif",
       ctx.fillStyle = "#00000"
        ctx.fillText(gFilter3.username, 390, 1060);
         //yazı2 
            ctx.font = "40px Sans-serif",
          ctx.fillStyle = "#00000"
                 ctx.fillText(gFilter4.username, 25, 750);
           const avatar36 = await Canvas.loadImage("resimler/aaaa.png")
                                            ctx.drawImage(avatar36, 30, 30, 1000, 1000);
                                                       if(gFilterrandom2 === gFilter1)
            
                                      {
                                   const avatar30 = await Canvas.loadImage("resimler/gFilter1.png")
                                            ctx.drawImage(avatar30, 30, 30, 1000, 1000);
                                      }  
       if(gFilterrandom2 === gFilter2)
                                      {
      const avatar31 = await Canvas.loadImage("resimler/gFilter2.png")
                                            ctx.drawImage(avatar31, 30, 30, 1000, 1000);
                                      }
                  if(gFilterrandom2 === gFilter3)
                                      {
    const avatar32 = await Canvas.loadImage("resimler/gFilter3.png")
                                            ctx.drawImage(avatar32, 30, 30, 1000, 1000);
                                      }
      if(gFilterrandom2 === gFilter4)
                                      {
    const avatar33 = await Canvas.loadImage("resimler/gFilter4.png")
                                            ctx.drawImage(avatar33, 30, 30, 1000, 1000);
                                      }
                                       const avatar3 = await Canvas.loadImage(gFilter1.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar3, 390, 20, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(390, 20, 300, 300);
                                         const avatar1 = await Canvas.loadImage(gFilter2.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar1, 750, 400, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(750, 400, 300, 300);
                                    const avatar10 = await Canvas.loadImage(gFilter3.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar10, 390, 720, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(390, 720, 300, 300);
                                         const avatar111 = await Canvas.loadImage(gFilter4.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar111, 25, 400, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                  
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(25, 400, 300, 300);
                                 //       const avatar2 = await Canvas.loadImage(gFilter3.avatarURL({format: "png"}))
                                   //         ctx.drawImage(avatar2, 343, 290.5, 13, 13);
                                 //        ctx.strokeStyle = "#00000";
                                 //                        ctx.lineWidth = 4;
                                //                    ctx.strokeRect(343,290.5, 13, 13);
                                //      const avatar4 = await Canvas.loadImage(gFilter4.avatarURL({format: "png"}))
                                //            ctx.drawImage(avatar4, 343, 290.5, 13, 13);
                                ////         ctx.strokeStyle = "#00000";
                                   //                      ctx.lineWidth = 4;
                                  ///                  ctx.strokeRect(343,290.5, 13, 13);
                              
                                 
           
                                 //       const avatar2 = await Canvas.loadImage(gFilter3.avatarURL({format: "png"}))
                                   //         ctx.drawImage(avatar2, 343, 290.5, 13, 13);
                                 //        ctx.strokeStyle = "#00000";
                                 //                        ctx.lineWidth = 4;
                                //                    ctx.strokeRect(343,290.5, 13, 13);
                                //      const avatar4 = await Canvas.loadImage(gFilter4.avatarURL({format: "png"}))
                                //            ctx.drawImage(avatar4, 343, 290.5, 13, 13);
                                ////         ctx.strokeStyle = "#00000";
                                   //                      ctx.lineWidth = 4;
                                  ///                  ctx.strokeRect(343,290.5, 13, 13);
                                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "sise.png")
                                             message.channel.send(attachment)
             }, 1 * 100);
                                         /////////////////////////////////////////////////////////////canvas////////////////////////////////////////////////////////
 setTimeout(async () => {
                       var embedLel = new Discord.MessageEmbed()
                        .setColor("BLACK")
                        .setDescription(`**${gFilterrandom2} şişenin ucu sana bakıyor. Doğruluk mu? Cesaret mi?**`).setFooter("F-Bot ", client.user.avatarURL({dynamic:true})).setTimestamp()
                    message.guild.channels.cache.find(channel => channel.name === room).send(embedLel).then(msg => {
                                                       msg.react('🇩')
                                           msg.react('🇨').then( r => {
        msg.react('🍾')

        // Filters
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '🇩' && user.id === gFilterrandom2.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '🇨' && user.id === gFilterrandom2.id;
        const reload = (reaction, user) => reaction.emoji.name === '🍾' && user.id === gFilterrandom2.id;

                                               
        const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000});
        const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000});
        const reload1 = msg.createReactionCollector(reload, {timer: 6000});

        backwards.on('collect', r => {
           
         
           embedLel.setDescription(`${gFilterrandom2} ** Demek doğruluk ha hadi bakalım**`);
            
            msg.edit(embedLel)
              
               
        })

        forwards.on('collect', r => {
             
            embedLel.setDescription(`${gFilterrandom2}** Demek cesaret ha hadi bakalım**`);
            
            msg.edit(embedLel)
          
        })
        reload1.on('collect', r => {
                              let gFilterrandom3 = list[Math.floor(Math.random() * list.length) + 0]
      setTimeout(async () => {
          
        ctx.font = "40px Sans-serif",
       ctx.fillStyle = "#00000"
        ctx.fillText(gFilter1.username, 390, 370);
         //yazı2 
            ctx.font = "40px Sans-serif",
          ctx.fillStyle = "#00000"
                 ctx.fillText(gFilter2.username, 750, 750);
            ctx.font = "40px Sans-serif",
       ctx.fillStyle = "#00000"
        ctx.fillText(gFilter3.username, 390, 1060);
         //yazı2 
            ctx.font = "40px Sans-serif",
          ctx.fillStyle = "#00000"
                 ctx.fillText(gFilter4.username, 25, 750);
           const avatar36 = await Canvas.loadImage("resimler/aaaa.png")
                                            ctx.drawImage(avatar36, 30, 30, 1000, 1000);
                                                       if(gFilterrandom3 === gFilter1)
            
                                      {
                                   const avatar30 = await Canvas.loadImage("resimler/gFilter1.png")
                                            ctx.drawImage(avatar30, 30, 30, 1000, 1000);
                                      }  
       if(gFilterrandom3 === gFilter2)
                                      {
      const avatar31 = await Canvas.loadImage("resimler/gFilter2.png")
                                            ctx.drawImage(avatar31, 30, 30, 1000, 1000);
                                      }
                  if(gFilterrandom3 === gFilter3)
                                      {
    const avatar32 = await Canvas.loadImage("resimler/gFilter3.png")
                                            ctx.drawImage(avatar32, 30, 30, 1000, 1000);
                                      }
      if(gFilterrandom3 === gFilter4)
                                      {
    const avatar33 = await Canvas.loadImage("resimler/gFilter4.png")
                                            ctx.drawImage(avatar33, 30, 30, 1000, 1000);
                                      }
                                       const avatar3 = await Canvas.loadImage(gFilter1.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar3, 390, 20, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(390, 20, 300, 300);
                                         const avatar1 = await Canvas.loadImage(gFilter2.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar1, 750, 400, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(750, 400, 300, 300);
                                    const avatar10 = await Canvas.loadImage(gFilter3.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar10, 390, 720, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(390, 720, 300, 300);
                                         const avatar111 = await Canvas.loadImage(gFilter4.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar111, 25, 400, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                  
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(25, 400, 300, 300);
                                 //       const avatar2 = await Canvas.loadImage(gFilter3.avatarURL({format: "png"}))
                                   //         ctx.drawImage(avatar2, 343, 290.5, 13, 13);
                                 //        ctx.strokeStyle = "#00000";
                                 //                        ctx.lineWidth = 4;
                                //                    ctx.strokeRect(343,290.5, 13, 13);
                                //      const avatar4 = await Canvas.loadImage(gFilter4.avatarURL({format: "png"}))
                                //            ctx.drawImage(avatar4, 343, 290.5, 13, 13);
                                ////         ctx.strokeStyle = "#00000";
                                   //                      ctx.lineWidth = 4;
                                  ///                  ctx.strokeRect(343,290.5, 13, 13);
                              
                                 
           
                                 //       const avatar2 = await Canvas.loadImage(gFilter3.avatarURL({format: "png"}))
                                   //         ctx.drawImage(avatar2, 343, 290.5, 13, 13);
                                 //        ctx.strokeStyle = "#00000";
                                 //                        ctx.lineWidth = 4;
                                //                    ctx.strokeRect(343,290.5, 13, 13);
                                //      const avatar4 = await Canvas.loadImage(gFilter4.avatarURL({format: "png"}))
                                //            ctx.drawImage(avatar4, 343, 290.5, 13, 13);
                                ////         ctx.strokeStyle = "#00000";
                                   //                      ctx.lineWidth = 4;
                                  ///                  ctx.strokeRect(343,290.5, 13, 13);
                                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "sise.png")
                                             message.channel.send(attachment)
             }, 1 * 100);
                                         /////////////////////////////////////////////////////////////canvas////////////////////////////////////////////////////////
 setTimeout(async () => {
                       var embedLel = new Discord.MessageEmbed()
                        .setColor("BLACK")
                        .setDescription(`**${gFilterrandom3} şişenin ucu sana bakıyor. Doğruluk mu? Cesaret mi?**`).setFooter("F-Bot ", client.user.avatarURL({dynamic:true})).setTimestamp()
                    message.guild.channels.cache.find(channel => channel.name === room).send(embedLel).then(msg => {
                                                       msg.react('🇩')
                                           msg.react('🇨').then( r => {
        msg.react('🍾')

        // Filters
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '🇩' && user.id === gFilterrandom3.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '🇨' && user.id === gFilterrandom3.id;
        const reload = (reaction, user) => reaction.emoji.name === '🍾' && user.id === gFilterrandom3.id;

                                               
        const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000});
        const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000});
        const reload1 = msg.createReactionCollector(reload, {timer: 6000});

        backwards.on('collect', r => {
           
         
           embedLel.setDescription(`${gFilterrandom3} ** Demek doğruluk ha hadi bakalım**`);
            
            msg.edit(embedLel)
              
               
        })

        forwards.on('collect', r => {
             
            embedLel.setDescription(`${gFilterrandom3}** Demek cesaret ha hadi bakalım**`);
            
            msg.edit(embedLel)
          
        })
        reload1.on('collect', r => {
                               let gFilterrandom4 = list[Math.floor(Math.random() * list.length) + 0]
      setTimeout(async () => {
          
        ctx.font = "40px Sans-serif",
       ctx.fillStyle = "#00000"
        ctx.fillText(gFilter1.username, 390, 370);
         //yazı2 
            ctx.font = "40px Sans-serif",
          ctx.fillStyle = "#00000"
                 ctx.fillText(gFilter2.username, 750, 750);
            ctx.font = "40px Sans-serif",
       ctx.fillStyle = "#00000"
        ctx.fillText(gFilter3.username, 390, 1060);
         //yazı2 
            ctx.font = "40px Sans-serif",
          ctx.fillStyle = "#00000"
                 ctx.fillText(gFilter4.username, 25, 750);
           const avatar36 = await Canvas.loadImage("resimler/aaaa.png")
                                            ctx.drawImage(avatar36, 30, 30, 1000, 1000);
                                                       if(gFilterrandom4 === gFilter1)
            
                                      {
                                   const avatar30 = await Canvas.loadImage("resimler/gFilter1.png")
                                            ctx.drawImage(avatar30, 30, 30, 1000, 1000);
                                      }  
       if(gFilterrandom4 === gFilter2)
                                      {
      const avatar31 = await Canvas.loadImage("resimler/gFilter2.png")
                                            ctx.drawImage(avatar31, 30, 30, 1000, 1000);
                                      }
                  if(gFilterrandom4 === gFilter3)
                                      {
    const avatar32 = await Canvas.loadImage("resimler/gFilter3.png")
                                            ctx.drawImage(avatar32, 30, 30, 1000, 1000);
                                      }
      if(gFilterrandom4 === gFilter4)
                                      {
    const avatar33 = await Canvas.loadImage("resimler/gFilter4.png")
                                            ctx.drawImage(avatar33, 30, 30, 1000, 1000);
                                      }
                                       const avatar3 = await Canvas.loadImage(gFilter1.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar3, 390, 20, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(390, 20, 300, 300);
                                         const avatar1 = await Canvas.loadImage(gFilter2.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar1, 750, 400, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(750, 400, 300, 300);
                                    const avatar10 = await Canvas.loadImage(gFilter3.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar10, 390, 720, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(390, 720, 300, 300);
                                         const avatar111 = await Canvas.loadImage(gFilter4.avatarURL({format: "png"}))
                                            ctx.drawImage(avatar111, 25, 400, 300, 300);
                                         ctx.strokeStyle = "#00000";
                                  
                                                         ctx.lineWidth = 4;
                                                    ctx.strokeRect(25, 400, 300, 300);
                                 //       const avatar2 = await Canvas.loadImage(gFilter3.avatarURL({format: "png"}))
                                   //         ctx.drawImage(avatar2, 343, 290.5, 13, 13);
                                 //        ctx.strokeStyle = "#00000";
                                 //                        ctx.lineWidth = 4;
                                //                    ctx.strokeRect(343,290.5, 13, 13);
                                //      const avatar4 = await Canvas.loadImage(gFilter4.avatarURL({format: "png"}))
                                //            ctx.drawImage(avatar4, 343, 290.5, 13, 13);
                                ////         ctx.strokeStyle = "#00000";
                                   //                      ctx.lineWidth = 4;
                                  ///                  ctx.strokeRect(343,290.5, 13, 13);
                              
                                 
           
                                 //       const avatar2 = await Canvas.loadImage(gFilter3.avatarURL({format: "png"}))
                                   //         ctx.drawImage(avatar2, 343, 290.5, 13, 13);
                                 //        ctx.strokeStyle = "#00000";
                                 //                        ctx.lineWidth = 4;
                                //                    ctx.strokeRect(343,290.5, 13, 13);
                                //      const avatar4 = await Canvas.loadImage(gFilter4.avatarURL({format: "png"}))
                                //            ctx.drawImage(avatar4, 343, 290.5, 13, 13);
                                ////         ctx.strokeStyle = "#00000";
                                   //                      ctx.lineWidth = 4;
                                  ///                  ctx.strokeRect(343,290.5, 13, 13);
                                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "sise.png")
                                             message.channel.send(attachment)
             }, 1 * 100);
                                         /////////////////////////////////////////////////////////////canvas////////////////////////////////////////////////////////
 setTimeout(async () => {
                       var embedLel = new Discord.MessageEmbed()
                        .setColor("BLACK")
                        .setDescription(`**${gFilterrandom4} şişenin ucu sana bakıyor. Doğruluk mu? Cesaret mi?**`).setFooter("F-Bot ", client.user.avatarURL({dynamic:true})).setTimestamp()
                    message.guild.channels.cache.find(channel => channel.name === room).send(embedLel).then(msg => {
                                                       msg.react('🇩')
                                           msg.react('🇨').then( r => {
        msg.react('🍾')

        // Filters
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '🇩' && user.id === gFilterrandom4.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '🇨' && user.id === gFilterrandom4.id;
        const reload = (reaction, user) => reaction.emoji.name === '🍾' && user.id === gFilterrandom4.id;

                                               
        const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000});
        const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000});
        const reload1 = msg.createReactionCollector(reload, {timer: 6000});

        backwards.on('collect', r => {
           
         
           embedLel.setDescription(`${gFilterrandom4} ** Demek doğruluk ha hadi bakalım**`);
            
            msg.edit(embedLel)
              
               
        })

        forwards.on('collect', r => {
             
            embedLel.setDescription(`${gFilterrandom4}** Demek cesaret ha hadi bakalım**`);
            
            msg.edit(embedLel)
          
        })
        reload1.on('collect', r => {
             embedLel.setDescription(`${gFilterrandom4}** Tur bitti tekrar başlat -şişe**`);
            
            msg.edit(embedLel)
   
              
               
        })
    })
                        });
              
               
        }, 1 * 2000);
   
              
               
           
   
              
               
        })
    })
                        });
              
               
        }, 1 * 2000);
   
              
               
           
   
              
               
        })
    })
                        });
              
               
        }, 1 * 2000);
   
              
               
           
   
              
               
        })
    })
                        });
              
               
        }, 1 * 2000);
   
              
               
        })
    })
                        });
              
               
        }, 1 * 2000);
    }
              
                        else
                            {
                                message.channel.bulkDelete(1).then
                                   var embedLel1 = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`\`Yeterli sayıda katılım olmadığından oyun iptal edildi\``).setFooter("F-Bot", client.user.avatarURL({dynamic:true})).setTimestamp()
                    message.guild.channels.cache.find(channel => channel.name === room).send(embedLel1)
                            }
                       }, ms(duration)); 
                      
         
              


                });     }catch(e) {
                message.channel.send(`:heavy_multiplication_x:| **Maalesef gerekli yetkilerim bulunmamakta**`);
                  console.log(e);
                }
              });
            });
          });
        });
     });
  });
  
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ŞİŞE","şişe-çevirmece","şişeçevirmece","Şişe"],
  permLevel: 2
};
exports.help = {
  name: 'şişe',
  description: 'Şişe çevirmece oynatır.',
   kategori: "oyun",
  usage: 'şişe'
};
   