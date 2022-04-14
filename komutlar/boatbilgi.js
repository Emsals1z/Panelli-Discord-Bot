const Discord = require("discord.js");
const moment = require("moment");
const emoji = require("../emojiler.json");
const ayarlar = require("../ayarlar.json");
const Topgg = require('@top-gg/sdk')

const osu = require('node-os-utils');


const client1 = new Discord.Client();
const TopggApi = new Topgg.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0ODU1MTYyNjc4MDU3MzcxNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjI4NTA2NDUzfQ.g_QIq-lyVdVGlWZTvFGgp-68sUUXGsZX0hCFMJIqvMA");
var os = require('os');
const mem = osu.mem
const cpu = osu.cpu


const count = cpu.count() // 8
var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();



require('discord-reply'); //⚠️ IMPORTANT: put this before your discord.Client()
const client = new Discord.Client();
exports.run = async (client, message, args, member) => {
  message.react(`<a:onayy:${emoji.onayyy}>`)
   let votes
    let monthlyVotes

   await TopggApi.getBot(client.user.id).then(bot => {
       votes = bot.points
       monthlyVotes = bot.monthlyPoints
   }).catch(err => votes = "error", monthlyVotes = "error")

 

 const duration2 = moment.duration(client.uptime).format(" D [gün önce], H [saat önce], m [dakika önce], s [saniye önce]");
      const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
    const members = client.users.cache.size
    const textChannels = client.channels.cache.filter(c => c.type === "text").size;
    const voiceChannels = client.channels.cache.filter(c => c.type === "voice").size;
    const guilds = client.guilds.cache.size;
   setTimeout(function() {

      

     const cpuUP = cpu.usage()
let ramm = ""
if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 0 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 100 )
  {
    ramm = "--/-------------------------------------"
  }
     if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 100 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 200 )
  {
    ramm = "------/---------------------------------"
  }
       if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 200 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 300 )
  {
    ramm = "-----------/----------------------------"
  }
      if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 300 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 400 )
  {
    ramm = "---------------/------------------------"
  }
      if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 400 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 500 )
  {
    ramm = "-------------------/--------------------"
  }
         if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 500 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 600 )
  {
    ramm = "-----------------------/----------------"
  }
              if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 600 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 700 )
  {
    ramm = "----------------------------/-----------"
  }
               if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 700 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 800 )
  {
    ramm = "--------------------------------/-------"
  }
          if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 800 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 900 )
  {
    ramm = "------------------------------------/---"
  }
          if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 900 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 1024 )
  {
    ramm = "---------------------------------------/"
  }
  
  
    
     let cpuu = ""
     cpu.usage()
  .then(cpuPercentage => {
    cpuu = cpuPercentage // 10.38
  
const Crewistatistikler = new Discord.MessageEmbed()

.setAuthor(`${client.user.username} bilgileri`,client.user.avatarURL({dynamic:true}),"https://f-bot.cf/stats")
  .addField(`**Botun Yapılmaya Başlandığı Tarih:**`," __15.10.2020__",true)
 .addField("**Pingim:**" ,`__${client.ws.ping}ms__`,true)
.addField("**Uptime:**", ` __${duration}__`, true)
  .addField("**Geliştiricim:**" ,`[Emsalsiz#2739](https://discordapp.com/users/422432559830401027)`,true)
.addField(`**Kanal Sayısı: [${client.channels.cache.filter(c => c.type === 'voice').size+client.channels.cache.filter(c => c.type === 'text').size}]** `, ` <:purpletextchannel:${emoji.kanal}>__${client.channels.cache.filter(c => c.type === 'text').size}__ <:purpleintegraiton:${emoji.integraiton}>__${client.channels.cache.filter(c => c.type === 'voice').size}__`, true)
 .addField(`**Kullanıcı Sayısı:** [${client.users.cache.size}]`,`<:cevrimiciuye:${emoji.çevrimiçi}> __${client.users.cache.filter(member => member.presence.status === 'online').size}__  <:bostauye:${emoji.boşta}> __${client.users.cache.filter(member => member.presence.status === 'idle').size}__ <:rahatsizetmeuye:${emoji.dnd}> __${client.users.cache.filter(member => member.presence.status === 'dnd').size}__  <:offlineuye:${emoji.offline}> __${client.users.cache.filter(member => member.presence.status === 'offline').size}__`,true)
.addField("**Sunucu Sayısı:**", `__${client.guilds.cache.size}__`, true)
.addField("**Kütüphanesi:**", `__Discord.js__`, true)
.addField("**CPU:**", `${cpuu}%`, true)

.addField('\u200B', "\u200B")
.addField('Bellek', ramm)
.addField("``Top.gg:``", `**Aylık Oy:** __${monthlyVotes}__  \n **Toplam Oy:** __${votes}__ `, true)
.addField("``Linkler:``", `[Destek Sunucusu](https://discord.gg/evnWJBzwsc) \n [İnternet Sitesi](https://f-bot.cf)`, true)
.setFooter(`Sorgulayan: ${message.author.tag}`, message.author.avatarURL({dynamic:true}))

.setThumbnail(client.user.avatarURL({dynamic:true}))
return message.lineReplyNoMention(Crewistatistikler).then(async message => {
	message.react('<a:developer:823953278399414373>')

  
  
})})}, 1 * 1000);
  
  
}
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['i','BotBilgi','botbilgi','bot-bilgi','Bot-Bilgi'],
  permLevel: 0
};

exports.help = {
  name: 'istatistik',
  description: 'Botun istatistiğini gösterir.',
   kategori: "kullanıcı",
  usage: ''
}; 