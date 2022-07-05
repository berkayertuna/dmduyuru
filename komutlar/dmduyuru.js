const Discord = require('discord.js');
const ID = "319827233042857985"
const ID2 = "972460709231333426"
const ID3 = "972461428407697409"
const embed = new Discord.RichEmbed()
const db = require('quick.db');

exports.run = (client, message, args) => {

embed.setColor("#8A2BE2") 
  
  if (db.fetch(`dmduyuru`) == 0) return message.channel.send(embed.setDescription(`<a:847221779260637184:946134867790430288> DmDuyuru Devre Dışı!`)); 
    if (message.author.id !== "319827233042857985" && message.author.id !== "972460709231333426" && message.author.id !== "972461428407697409") return message.channel.send("Bu komutu sadece kurucum kullabilir.");
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.channel.send('Bir şey yazmak zorundasın.');

  message.delete();

  console.log(`Duyuru: "${message.author.username}#${message.author.discriminator}" "${mesaj}"`);
      client.users.forEach(u => {
u.send(embed.setDescription(mesaj).setFooter(`Carries Roleplay`))
})
message.channel.send(`🚀・Mesaj Başarıyla **` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + `** Bu kadar üyeye gönderildi!`);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['duyuru'],
  permLevel: 0
};
exports.help = {
  description: 'Mesajınızı botun bulunduğu sunucudaki insanlara duyurur.',
  name: 'duyur',
  usage: 'dmduyuru [mesaj]'
};
