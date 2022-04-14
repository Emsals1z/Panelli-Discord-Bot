const Discord = require('discord.js');
const moment = require('moment');
const ms = require('ms');
const Canvas = require("canvas")
const db = require("quick.db");
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
 const canvas = Canvas.createCanvas(800, 600)
const ctx = canvas.getContext('2d')
  const background = await Canvas.loadImage("resimler/rock_paper_scissors.png");
     ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    
  

  
      message.channel.send(`🗿📃✂️| **Oyunun yapılacağı kanalın adını yaz Ör: taşkağıtmakas-odası**`).then(msg => {
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      }).then(collected => {
        let room = message.guild.channels.cache.find(channel => channel.name === collected.first().content); 
        if(!room) return message.channel.send('🗿📃✂️| **Böyle bir kanal bulamadım**');
        room = collected.first().content;
        collected.first().delete();
                   msg.edit('🗿📃✂️| **Oyun bekleme süresini belirle (1s, 1m, 1h, 1d)**').then(msg => {
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
          }).then(collected => {
            if(!collected.first().content.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('🗿📃✂️| **Böyle bir süre bilmiyorum :(**');
            duration = collected.first().content
            collected.first().delete();
          msg.edit('🗿📃✂️| **Şimdi de çağırma mesajı yaz bakalım**').then(msg => {
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
                  .setFooter("E-Bot", client.user.avatarURL({dynamic:true}));
                  message.guild.channels.cache.find(channel => channel.name === room).send(giveEmbed).then(m => {
                     let re = m.react('▶️');
                      
                    setTimeout(async () => {
                   
                 
                       
                    let users = await m.reactions.cache.get("▶️").users.fetch();
                       
                        let list = users.array().filter(u => u.id !== m.author.id !== client.user.id);
                  
                              let gFilter1 = list[Math.floor(0) + 0]
                              let gFilter2 = list[Math.floor(1) + 0]
                          
                        
                  
                        
                       
                  
                  
           
                                  if (list.length === 3){
                                     let endEmbed = new Discord.MessageEmbed()
                       .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
                      .setColor("#f558c9")
                     .setFooter("E-Bot", client.user.avatarURL({dynamic:true}))
      .setDescription(`\`OYUN BAŞLADI!\` \n\n**1.oyuncunun seçim yapması bekleniyor!** \n**Oyuncular: **${gFilter1}${gFilter2}\n**Oyunu Başlatan: **<@${message.author.id}>`)
                       .setTimestamp()
                     m.edit(endEmbed);
                                    

  
                   
                                     const madalya = await Canvas.loadImage("resimler/madalya.png")
                                      const taş = await Canvas.loadImage("resimler/taş.png")
                                      const kağıt = await Canvas.loadImage("resimler/kağıt.png")
                                      const makas = await Canvas.loadImage("resimler/makas.png")
                                        const avatar4 = await Canvas.loadImage(gFilter2.avatarURL({format: "png"}))
                                           const avatar3 = await Canvas.loadImage(gFilter1.avatarURL({format: "png"}))
                                        
                                            const avatar36 = await Canvas.loadImage("resimler/rock_paper_scissors.png")
     ctx.drawImage(avatar3, 300, 50, 200, 200);
                                          ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 6;
    ctx.strokeRect(300, 50, 200, 200);
                                          const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "rock_paper_scissors.png")
                                             
                                    const embed = new Discord.MessageEmbed()
                               .setColor('RANDOM')
                               .setTitle(`<a:yldz:819881502925389835>**TaşKağıtMakas Oyunu**<a:yldz:819881502925389835>`)
                               .setTimestamp()
                              .setDescription("Taş mı? Kağıt mı? Makas mı?");
                                       gFilter1.send(attachment)
                                      return gFilter1.send(embed).then(msg => {
                                           msg.react('🗿')
                                           msg.react('📃').then( r => {
        msg.react('✂️')

        // Filters
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '🗿' && user.id === gFilter1.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '📃' && user.id === gFilter1.id;
        const reload = (reaction, user) => reaction.emoji.name === '✂️' && user.id === gFilter1.id;

                                               
        const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000});
        const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000});
        const reload1 = msg.createReactionCollector(reload, {timer: 6000});

        backwards.on('collect', r => {
    
              
         
               embed.setDescription(`${gFilter1}** Demek taş seçtin.**`);
            
            msg.edit(embed)
             let endEmbed = new Discord.MessageEmbed()
                      .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
                      .setColor("#f558c9")
                     .setFooter("E-Bot", client.user.avatarURL({dynamic:true}))
      .setDescription(`\`OYUN BAŞLADI!\` \n\n**1.oyuncu seçimlerini yaptı.** \n**Oyuncular: **${gFilter1}${gFilter2}\n**Oyunu Başlatan: **<@${message.author.id}>`)
                       .setTimestamp()
                     m.edit(endEmbed);           
                             ctx.beginPath()
   
  
 
                                         
                                          ctx.drawImage(avatar4, 300, 50, 200, 200);
            ctx.strokeStyle = "#00000";
     ctx.lineWidth = 6;
    ctx.strokeRect(300, 50, 200, 200);
                                          const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "rock_paper_scissors.png")
                                          gFilter2.send(attachment)
                               const embed5 = new Discord.MessageEmbed()
                               .setColor('RANDOM')
                                .setTitle(`<a:yldz:819881502925389835>**TaşKağıtMakas Oyunu**<a:yldz:819881502925389835>`)
                               .setTimestamp()
                               .setDescription("Taş mı? Kağıt mı? Makas mı?");
                                          
                              return gFilter2.send(embed5).then(msg => {
                                           msg.react('🗿')
                                           msg.react('📃').then( r => {
        msg.react('✂️')

        // Filters
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '🗿' && user.id === gFilter2.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '📃' && user.id === gFilter2.id;
        const reload = (reaction, user) => reaction.emoji.name === '✂️' && user.id === gFilter2.id;

                                               
        const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000});
        const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000});
        const reload1 = msg.createReactionCollector(reload, {timer: 6000});

        backwards.on('collect', r => {
          
        
           embed5.setDescription(`${gFilter2} ** Demek  taş seçtin.**`);
            
            msg.edit(embed5)
                                 
                                            ctx.drawImage(avatar36, 0, 0, canvas.width, canvas.height);
                              
                                         ctx.drawImage(avatar3, 150, 50, 200, 200);
                                                 ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                               ctx.strokeRect(150, 50, 200, 200); 
                                          ctx.drawImage(avatar4, 450, 50, 200, 200);
                                                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                                  ctx.strokeRect(450, 50, 200, 200);
             ctx.drawImage(taş, 150, 35, 40, 40);
                            ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(150, 35, 40, 40); 
                                         ctx.drawImage(taş, 450, 35, 40, 40);
                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(450, 35, 40, 40); 
                                          ctx.drawImage(madalya, 330, 235, 40, 40);
                                            ctx.drawImage(madalya, 630, 235, 40, 40);
                                          const attachment1 = new Discord.MessageAttachment(canvas.toBuffer(), "rock_paper_scissors.png")
                                          message.guild.channels.cache.find(channel => channel.name === room).send(attachment1)
                      let endEmbed = new Discord.MessageEmbed()
                      .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
                      .setColor("#f558c9")
                     .setFooter("E-Bot", client.user.avatarURL({dynamic:true}))
      .setDescription(`**Berabere** \n\n**Oyuncular: **${gFilter1}${gFilter2}\n**Oyunu Başlatan: **<@${message.author.id}>`)
                       .setTimestamp()
                     m.edit(endEmbed);    
                        
                                
               
        })

        forwards.on('collect', r => {
             
               
            embed5.setDescription(`${gFilter2}** Demek kağıt seçtin.**`);
            
            msg.edit(embed5)
                               ctx.drawImage(avatar36, 0, 0, canvas.width, canvas.height);
                            
                                         ctx.drawImage(avatar3, 150, 50, 200, 200);
                                                 ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                               ctx.strokeRect(150, 50, 200, 200); 
                                          ctx.drawImage(avatar4, 450, 50, 200, 200);
                                                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                                  ctx.strokeRect(450, 50, 200, 200);
               ctx.drawImage(taş, 150, 35, 40, 40);
                            ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(150, 35, 40, 40); 
                                         ctx.drawImage(kağıt, 450, 35, 40, 40);
                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(450, 35, 40, 40); 
                                               
                                            ctx.drawImage(madalya, 630, 235, 40, 40);
                                          const attachment1 = new Discord.MessageAttachment(canvas.toBuffer(), "rock_paper_scissors.png")
                                          message.guild.channels.cache.find(channel => channel.name === room).send(attachment1)
                      let endEmbed = new Discord.MessageEmbed()
                      .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
                      .setColor("#f558c9")
                     .setFooter("E-Bot", client.user.avatarURL({dynamic:true}))
      .setDescription(`**${gFilter2} yendi** \n\n**Oyuncular: **${gFilter1}${gFilter2}\n**Oyunu Başlatan: **<@${message.author.id}>`)
                       .setTimestamp()
                     m.edit(endEmbed);    
                        
        })
        reload1.on('collect', r => {
                        
                        embed5.setDescription(`${gFilter2}** Demek makas seçtin**`);
                                     msg.edit(embed5)  
                             ctx.drawImage(avatar36, 0, 0, canvas.width, canvas.height);
                              
                                         ctx.drawImage(avatar3, 150, 50, 200, 200);
                                                 ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                               ctx.strokeRect(150, 50, 200, 200); 
                                          ctx.drawImage(avatar4, 450, 50, 200, 200);
                                                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                                  ctx.strokeRect(450, 50, 200, 200);
             ctx.drawImage(taş, 150, 35, 40, 40);
                            ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(150, 35, 40, 40); 
                                         ctx.drawImage(makas, 450, 35, 40, 40);
                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(450, 35, 40, 40); 
                                               ctx.drawImage(madalya, 330, 235, 40, 40);
                                            
                                          const attachment1 = new Discord.MessageAttachment(canvas.toBuffer(), "rock_paper_scissors.png")
                                          message.guild.channels.cache.find(channel => channel.name === room).send(attachment1)
                      let endEmbed = new Discord.MessageEmbed()
                      .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
                      .setColor("#f558c9")
                     .setFooter("E-Bot", client.user.avatarURL({dynamic:true}))
      .setDescription(`**${gFilter1} yendi** \n\n**Oyuncular: **${gFilter1}${gFilter2}\n**Oyunu Başlatan: **<@${message.author.id}>`)
                       .setTimestamp()
                     m.edit(endEmbed);    
                       
                              

        })        
                                           
                                           })
                                                                })
            msg.edit(embed)  
        })

        forwards.on('collect', r => {
       
              
         
               embed.setDescription(`${gFilter1}** Demek kağıt seçtin.**`);
            
            msg.edit(embed)
             let endEmbed = new Discord.MessageEmbed()
                      .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
                      .setColor("#f558c9")
                     .setFooter("E-Bot", client.user.avatarURL({dynamic:true}))
      .setDescription(`\`OYUN BAŞLADI!\` \n\n**1.oyuncu seçimlerini yaptı.** \n**Oyuncular: **${gFilter1}${gFilter2}\n**Oyunu Başlatan: **<@${message.author.id}>`)
                       .setTimestamp()
                     m.edit(endEmbed);           
               embed.setDescription(`${gFilter1}** Demek taş seçtin**`);
                                             
                                          ctx.drawImage(avatar4, 300, 50, 200, 200);
             ctx.strokeStyle = "#00000";
     ctx.lineWidth = 6;
    ctx.strokeRect(300, 50, 200, 200);
                                          const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "rock_paper_scissors.png")
                                          gFilter2.send(attachment)
                               const embed5 = new Discord.MessageEmbed()
                               .setColor('RANDOM')
                                 .setTitle(`<a:yldz:819881502925389835>**TaşKağıtMakas Oyunu**<a:yldz:819881502925389835>`)
                               .setTimestamp()
                               .setDescription("Taş mı? Kağıt mı? Makas mı?");
                              return gFilter2.send(embed5).then(msg => {
                                           msg.react('🗿')
                                           msg.react('📃').then( r => {
        msg.react('✂️')

        // Filters
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '🗿' && user.id === gFilter2.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '📃' && user.id === gFilter2.id;
        const reload = (reaction, user) => reaction.emoji.name === '✂️' && user.id === gFilter2.id;

                                               
        const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000});
        const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000});
        const reload1 = msg.createReactionCollector(reload, {timer: 6000});

        backwards.on('collect', r => {
          
        
           embed5.setDescription(`${gFilter2} ** Demek  taş seçtin.**`);
            
            msg.edit(embed5)
             
                                            ctx.drawImage(avatar36, 0, 0, canvas.width, canvas.height);
                            
                                         ctx.drawImage(avatar3, 150, 50, 200, 200);
                                                 ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                               ctx.strokeRect(150, 50, 200, 200); 
                                          ctx.drawImage(avatar4, 450, 50, 200, 200);
                                                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                                  ctx.strokeRect(450, 50, 200, 200);
               ctx.drawImage(kağıt, 150, 35, 40, 40);
                            ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(150, 35, 40, 40); 
                                         ctx.drawImage(taş, 450, 35, 40, 40);
                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(450, 35, 40, 40); 
                                             ctx.drawImage(madalya, 330, 235, 40, 40);
                                           
                                          const attachment1 = new Discord.MessageAttachment(canvas.toBuffer(), "rock_paper_scissors.png")
                                          message.guild.channels.cache.find(channel => channel.name === room).send(attachment1)
                      let endEmbed = new Discord.MessageEmbed()
                      .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
                      .setColor("#f558c9")
                     .setFooter("E-Bot", client.user.avatarURL({dynamic:true}))
      .setDescription(`**${gFilter1} yendi** \n\n**Oyuncular: **${gFilter1}${gFilter2}\n**Oyunu Başlatan: **<@${message.author.id}>`)
                       .setTimestamp()
                     m.edit(endEmbed);    
                        
                                
               
        })

        forwards.on('collect', r => {
             
               
            embed5.setDescription(`${gFilter2}** Demek kağıt seçtin.**`);
            
            msg.edit(embed5)
                               ctx.drawImage(avatar36, 0, 0, canvas.width, canvas.height);
                            
                                         ctx.drawImage(avatar3, 150, 50, 200, 200);
                                                 ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                               ctx.strokeRect(150, 50, 200, 200); 
                                          ctx.drawImage(avatar4, 450, 50, 200, 200);
                                                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                                  ctx.strokeRect(450, 50, 200, 200);
               ctx.drawImage(kağıt, 150, 35, 40, 40);
                            ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(150, 35, 40, 40); 
                                         ctx.drawImage(kağıt, 450, 35, 40, 40);
                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(450, 35, 40, 40); 
                                            ctx.drawImage(madalya, 330, 235, 40, 40);
                                            ctx.drawImage(madalya, 630, 235, 40, 40);
                                          const attachment1 = new Discord.MessageAttachment(canvas.toBuffer(), "rock_paper_scissors.png")
                                          message.guild.channels.cache.find(channel => channel.name === room).send(attachment1)
                      let endEmbed = new Discord.MessageEmbed()
                      .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
                      .setColor("#f558c9")
                     .setFooter("E-Bot", client.user.avatarURL({dynamic:true}))
      .setDescription(`**Berabere** \n\n**Oyuncular: **${gFilter1}${gFilter2}\n**Oyunu Başlatan: **<@${message.author.id}>`)
                       .setTimestamp()
                     m.edit(endEmbed);    
                        
        })
        reload1.on('collect', r => {
                        
                        embed5.setDescription(`${gFilter2}** Demek makas seçtin**`);
                                     msg.edit(embed5)  
           
                                            ctx.drawImage(avatar36, 0, 0, canvas.width, canvas.height);
                            
                                         ctx.drawImage(avatar3, 150, 50, 200, 200);
                                                 ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                               ctx.strokeRect(150, 50, 200, 200); 
                                          ctx.drawImage(avatar4, 450, 50, 200, 200);
                                                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                                  ctx.strokeRect(450, 50, 200, 200);
               ctx.drawImage(kağıt, 150, 35, 40, 40);
                            ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(150, 35, 40, 40); 
                                         ctx.drawImage(makas, 450, 35, 40, 40);
                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(450, 35, 40, 40); 
          
                                            ctx.drawImage(madalya, 630, 235, 40, 40);
                                          const attachment1 = new Discord.MessageAttachment(canvas.toBuffer(), "rock_paper_scissors.png")
                                          message.guild.channels.cache.find(channel => channel.name === room).send(attachment1)
                      let endEmbed = new Discord.MessageEmbed()
                      .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
                      .setColor("#f558c9")
                     .setFooter("E-Bot", client.user.avatarURL({dynamic:true}))
      .setDescription(`**${gFilter2} yendi** \n\n**Oyuncular: **${gFilter1}${gFilter2}\n**Oyunu Başlatan: **<@${message.author.id}>`)
                       .setTimestamp()
                     m.edit(endEmbed);    
                       
                              

        })        
                                           
                                           })
                                                                })
            msg.edit(embed)  
        })
          
        
        reload1.on('collect', r => {
           
               embed.setDescription(`${gFilter1}** Demek makas seçtin.**`);
            
            msg.edit(embed)
             let endEmbed = new Discord.MessageEmbed()
                      .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
                      .setColor("#f558c9")
                     .setFooter("E-Bot", client.user.avatarURL({dynamic:true}))
      .setDescription(`\`OYUN BAŞLADI!\` \n\n**1.oyuncu seçimlerini yaptı.** \n**Oyuncular: **${gFilter1}${gFilter2}\n**Oyunu Başlatan: **<@${message.author.id}>`)
                       .setTimestamp()
                     m.edit(endEmbed);           
               embed.setDescription(`${gFilter1}** Demek taş seçtin**`);
                                         ctx.beginPath()
 
                                           
                                          ctx.drawImage(avatar4, 300, 50, 200, 200);
                                             ctx.strokeStyle = "#00000";
                                                    ctx.lineWidth = 6;
                                                ctx.strokeRect(300, 50, 200, 200);
                                          const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "rock_paper_scissors.png")
                                          gFilter2.send(attachment)
                               const embed5 = new Discord.MessageEmbed()
                               .setColor('RANDOM')
                                 .setTitle(`<a:yldz:819881502925389835>**TaşKağıtMakas Oyunu**<a:yldz:819881502925389835>`)
                               .setTimestamp()
                               .setDescription("Taş mı? Kağıt mı? Makas mı?");
                              return gFilter2.send(embed5).then(msg => {
                                           msg.react('🗿')
                                           msg.react('📃').then( r => {
        msg.react('✂️')

        // Filters
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '🗿' && user.id === gFilter2.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '📃' && user.id === gFilter2.id;
        const reload = (reaction, user) => reaction.emoji.name === '✂️' && user.id === gFilter2.id;

                                               
        const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000});
        const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000});
        const reload1 = msg.createReactionCollector(reload, {timer: 6000});

        backwards.on('collect', r => {
          
        
           embed5.setDescription(`${gFilter2} ** Demek  taş seçtin.**`);
            
            msg.edit(embed5)
                                                             ctx.drawImage(avatar36, 0, 0, canvas.width, canvas.height);
                              
                                         ctx.drawImage(avatar3, 150, 50, 200, 200);
                                                 ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                               ctx.strokeRect(150, 50, 200, 200); 
                                          ctx.drawImage(avatar4, 450, 50, 200, 200);
                                                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                                  ctx.strokeRect(450, 50, 200, 200);
             ctx.drawImage(makas, 150, 35, 40, 40);
                            ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(150, 35, 40, 40); 
                                         ctx.drawImage(taş, 450, 35, 40, 40);
                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(450, 35, 40, 40); 
                                             
                                            ctx.drawImage(madalya, 630, 235, 40, 40);
                                          const attachment1 = new Discord.MessageAttachment(canvas.toBuffer(), "rock_paper_scissors.png")
                                          message.guild.channels.cache.find(channel => channel.name === room).send(attachment1)
                      let endEmbed = new Discord.MessageEmbed()
                      .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
                      .setColor("#f558c9")
                     .setFooter("E-Bot", client.user.avatarURL({dynamic:true}))
      .setDescription(`**${gFilter2} yendi** \n\n**Oyuncular: **${gFilter1}${gFilter2}\n**Oyunu Başlatan: **<@${message.author.id}>`)
                       .setTimestamp()
                     m.edit(endEmbed);    
                        
                                
               
        })

        forwards.on('collect', r => {
             
               
            embed5.setDescription(`${gFilter2}** Demek kağıt seçtin.**`);
            
            msg.edit(embed5)
                               ctx.drawImage(avatar36, 0, 0, canvas.width, canvas.height);
                       
                                         ctx.drawImage(avatar3, 150, 50, 200, 200);
                                                 ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                               ctx.strokeRect(150, 50, 200, 200); 
                                          ctx.drawImage(avatar4, 450, 50, 200, 200);
                                                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                                  ctx.strokeRect(450, 50, 200, 200);
                    ctx.drawImage(makas, 150, 35, 40, 40);
                            ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(150, 35, 40, 40); 
                                         ctx.drawImage(kağıt, 450, 35, 40, 40);
                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(450, 35, 40, 40); 
            ctx.drawImage(madalya, 330, 235, 40, 40);
                                  
                                          const attachment1 = new Discord.MessageAttachment(canvas.toBuffer(), "rock_paper_scissors.png")
                                          message.guild.channels.cache.find(channel => channel.name === room).send(attachment1)
                      let endEmbed = new Discord.MessageEmbed()
                      .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
                      .setColor("#f558c9")
                     .setFooter("E-Bot", client.user.avatarURL({dynamic:true}))
      .setDescription(`**${gFilter1} yendi** \n\n**Oyuncular: **${gFilter1}${gFilter2}\n**Oyunu Başlatan: **<@${message.author.id}>`)
                       .setTimestamp()
                     m.edit(endEmbed);    
                        
        })
        reload1.on('collect', r => {
                        
                        embed5.setDescription(`${gFilter2}** Demek makas seçtin**`);
                                     msg.edit(embed5)  
           
                                             ctx.drawImage(avatar36, 0, 0, canvas.width, canvas.height);
                             
                                         ctx.drawImage(avatar3, 150, 50, 200, 200);
                                                 ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                               ctx.strokeRect(150, 50, 200, 200); 
                                          ctx.drawImage(avatar4, 450, 50, 200, 200);
                                                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 4;
                                                  ctx.strokeRect(450, 50, 200, 200);
              ctx.drawImage(makas, 150, 35, 40, 40);
                            ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(150, 35, 40, 40); 
                                         ctx.drawImage(makas, 450, 35, 40, 40);
                   ctx.strokeStyle = "#00000";
                                               ctx.lineWidth = 2;
                                               ctx.strokeRect(450, 35, 40, 40); 
            ctx.drawImage(madalya, 330, 235, 40, 40);
                                            ctx.drawImage(madalya, 630, 235, 40, 40);
                                          const attachment1 = new Discord.MessageAttachment(canvas.toBuffer(), "rock_paper_scissors.png")
                                          message.guild.channels.cache.find(channel => channel.name === room).send(attachment1)
                      let endEmbed = new Discord.MessageEmbed()
                      .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
                      .setColor("#f558c9")
                     .setFooter("E-Bot", client.user.avatarURL({dynamic:true}))
      .setDescription(`**Berabere** \n\n**Oyuncular: **${gFilter1}${gFilter2}\n**Oyunu Başlatan: **<@${message.author.id}>`)
                       .setTimestamp()
                     m.edit(endEmbed);    
                       
                              

        })        
                                           
                                           })
                                                                })
            msg.edit(embed)  
        })
                                                })
                                                                })
                  
                              
                    }else
                            {
                                message.channel.bulkDelete(1).then
                                   var embedLel1 = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`\`Yeterli sayıda katılım olmadığından oyun iptal edildi\``).setFooter("E-Bot", client.user.avatarURL({dynamic:true})).setTimestamp()
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
  aliases: [],
  permLevel: 2
};
exports.help = {
  name: 'taşkağıtmakas',
  description: 'Taş kağıt makas oyunu',
    kategori: "oyun",
  usage: 'şişe'
};
   