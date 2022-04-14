const Discord = require ("discord.js");

exports.run = (client, message) => {
  
    message.react('<a:onayy:848517607803715594>')
   
  setTimeout(function() {
 
  if (!message.guild) {
     
const EmbedCrewCode = new Discord.MessageEmbed()
   
.setColor("RANDOM")
.setTitle(`<a:loading:687003902117281843> F-Bot <a:loading:687003902117281843>
 ----------------
`)
.setThumbnail("https://cdn.discordapp.com/attachments/836533918760042508/856527249900961802/ezgif-2-90ad2ce86265.gif")
.setDescription(`  **<a:yldz:687003791828058216> Komutlar**
> [-seviye-aç](https://discord.gg/evnWJBzwsc) → Seviye sistemini açar.
> [-seviye-kapat](https://discord.gg/evnWJBzwsc) → Seviye sistemini kapatır ayarlar.
> [-seviye-log](https://discord.gg/evnWJBzwsc) → Seviye logunu ayarlar. 
> [-seviye-rol](https://discord.gg/evnWJBzwsc) → Seviye rol sistemini aktif eder..  
> [-seviye-xp](https://discord.gg/evnWJBzwsc) → Kelime başına verilecek xp yi ayarlar. 
> [-seviye](https://discord.gg/evnWJBzwsc) →  Kendi seviyenizi gösterir. 
> [-seviye-arkarenk](https://discord.gg/evnWJBzwsc) →  Seviye kartının arka rengini ayarlayabilirsiniz. 
> [-seviye-barrenk](https://discord.gg/evnWJBzwsc) →  Seviye kartının bar rengini ayarlayabilirsiniz. 
> [-seviye-arkaresim](https://discord.gg/evnWJBzwsc) →  Seviye kartının arkasına resim koyabilirsiniz. 
`)
 

return message.channel.send(EmbedCrewCode)
.then(async message => {
	message.react('<a:developer:792786468287283221>')
message.react('<a:bot:848517607245742100>')
message.react('<a:js:848517608663285790>')
	

  
  
}) }
message.channel.bulkDelete(1).then
  
const EmbedCrewCode = new Discord.MessageEmbed()
   
.setColor("RANDOM")
.setTitle(`<a:loading:687003902117281843> F-Bot <a:loading:687003902117281843>
 ----------------
`)
.setThumbnail("https://cdn.discordapp.com/attachments/763318281305456640/811186431137284106/emsalsiz.gif")
.setDescription(`  **<a:yldz:687003791828058216> Komutlar**
> [-seviye-aç](https://discord.gg/evnWJBzwsc) → Seviye sistemini açar.
> [-seviye-kapat](https://discord.gg/evnWJBzwsc) → Seviye sistemini kapatır ayarlar.
> [-seviye-log](https://discord.gg/evnWJBzwsc) → Seviye logunu ayarlar. 
> [-seviye-rol](https://discord.gg/evnWJBzwsc) → Seviye rol sistemini aktif eder..  
> [-seviye-xp](https://discord.gg/evnWJBzwsc) → Kelime başına verilecek xp yi ayarlar. 
> [-seviye](https://discord.gg/evnWJBzwsc) →  Kendi seviyenizi gösterir. 
> [-seviye-arkarenk](https://discord.gg/evnWJBzwsc) →  Seviye kartının arka rengini ayarlayabilirsiniz. 
> [-seviye-barrenk](https://discord.gg/evnWJBzwsc) →  Seviye kartının bar rengini ayarlayabilirsiniz. 
> [-seviye-arkaresim](https://discord.gg/evnWJBzwsc) →  Seviye kartının arkasına resim koyabilirsiniz. 
`)
 

return message.channel.send(EmbedCrewCode)
.then(async message => {
	message.react('<a:developer:792786468287283221>')
message.react('<a:bot:848517607245742100>')
message.react('<a:js:848517608663285790>')
	

  
  
})}, 1 * 1500);

};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ['seviye-yardım'], 
    permLevel: 0 
};

  exports.help = {
    name: 'seviyeyardım', 
    description: 'Botun Seviye Yardım Listesini Gösterir!',
     kategori: "seviye",
    usage: '-seviyeyardım'
};