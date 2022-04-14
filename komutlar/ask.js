const Discord = require('discord.js')
 
exports.run = async (client, message, args) => {
      if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }    
  let member = message.guild.member(message.mentions.users.array()[0] ||  message.guild.members.cache.get(args[0]))
        let member2 = message.guild.member(message.mentions.users.array()[1] || message.guild.members.cache.get(args[1]))
        var s = message.author
        if(member2) {
                var s = member2.user
        }
        if(!member) {
                const embed = new Discord.MessageEmbed()
                        .setDescription(`Aşk ölçmek için birini etiketlemen lazım,Hem seni ve hemde onu <3`)
                        .setColor("RED")
                        .setTimestamp()
                message.channel.send({embed})
                return
        }
 
        var crewanasonuc = Math.floor(Math.random() * 101)
        var crewkalp = ''
        var crewkalp = ''
        if(Math.floor(Math.round(crewanasonuc / 10) * 10) >= 10) {
                var c = 0
                for(var i = 0; i < Math.floor(Math.round(crewanasonuc / 10)); i++) {
                        crewkalp += '❤️'
                        c++
                }
                for(var x = c; x < 10; x++) {
                        crewkalp += `🖤`
                }
        } else {
                var crewkalp = '🖤'
                var crewkalp = '🖤🖤🖤🖤🖤🖤🖤🖤🖤'
        }
        var crewyorum = `Sizi evlendirelim <3`
        if(crewanasonuc < 90) {
                var crewyorum = 'birazdaha uğraşırsan bu kız senin!'
        }
        if(crewanasonuc < 70) {
                var crewyorum = 'bilemedim bak'
        }
        if(crewanasonuc < 50) {
                var crewyorum = 'Çok azda olsa senden hoşlanıyo...'
        }
        if(crewanasonuc < 30) {
                var crewyorum = 'Seni sevmiyormuş ağa beeeeee...'
        }
        const embed = new Discord.MessageEmbed()
                .setAuthor(`${member.user.tag} | ${s.tag}`)
                .setDescription(`NE kadar seviyo bakalım : ${crewanasonuc}\n${crewkalp}${crewkalp}\n\n${crewyorum}`)
                .setColor("RED")
                .setTimestamp()
        message.channel.send({embed})
}
 
exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: [''],
        permLevel: 0
}
 
exports.help = {
        name: 'aşk-ölç',
        description: 'Aşk ölcer.',
  kategori: "eğlence",
        usage: '-aşk-ölç'
}