const url = require("url");
const path = require("path");
const fs=require('fs');
const Discord=require("discord.js");
const client=new Discord.Client();
const Discord1=require("discord.js");
const client2=new Discord1.Client();

const db = require('quick.db')
const chalk = require("chalk");
const moment = require("moment");
const express = require('express');

const app = express();
const passport = require("passport");
const session = require("express-session");
const MemoryStore = require("memorystore")(session)
const Strategy = require("passport-discord").Strategy;
const helmet = require("helmet");


const md = require("marked");
const request = require('request')
require("moment-duration-format");

module.exports = (client) => {
  
  const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);
  const templateDir = path.resolve(`${dataDir}${path.sep}templates`);
  app.use("/public", express.static(path.resolve(`${dataDir}${path.sep}public`)));
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  
  passport.use(new Strategy({
    clientID: client.appInfo.id,
    clientSecret: client.config.dashboard.oauthSecret,
    callbackURL: client.config.dashboard.callbackURL,
    scope: ["identify", "guilds"]
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  }));
  
  app.use(session({
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: client.config.dashboard.sessionSecret,
    resave: false,
    saveUninitialized: false,
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());
  app.locals.domain = client.config.dashboard.domain;
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");
  var bodyParser = require("body-parser");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  
  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  }

  const renderTemplate = (res, req, template, data = {}) => {
      
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
  };
  
  app.get("/login", (req, res, next) => {
  
   
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
    
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/";
    }
    next();
  },
  passport.authenticate("discord"));

  
  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/autherror" }), (req, res) => {
       
      client.users.fetch(req.user.id).then(async a => {
      client.channels.cache.get("872185291182600192").send(new Discord.MessageEmbed().setAuthor(a.username, a.avatarURL({dynamic: true})).setThumbnail(a.avatarURL({dynamic: true})).setColor("GREEN").setDescription(`[**${a.username}**#${a.discriminator}](https://f-bot.cf) isimli kullanıcı **siteye** giriş yaptı.`).addField("Username", a.username).addField("User ID", a.id).addField("User Discriminator", a.discriminator))
      
      })
    if (req.user.id === client.appInfo.owner.id) {
      req.session.isAdmin = true;
    } else {
      req.session.isAdmin = false;
    }
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);
    } else {
      res.redirect("/");
    }
  });
  
  app.get("/autherror", (req, res) => {
    renderTemplate(res, req, "autherror.ejs");
  });
  
  app.get("/logout", function(req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
    });
  });
  
  app.get("/", (req, res) => {
 
    renderTemplate(res, req, "index.ejs");
    
  });
 
  app.get("/dashboard", checkAuth, (req, res) => {
  const perms = Discord.Permissions
 renderTemplate(res, req, "dashboard.ejs", {perms});
  });
   app.get("/dashboard", checkAuth, (req, res) => {
  const perms = Discord.Permissions
 renderTemplate(res, req, "blocks/head.ejs", {perms});
  });
   
   app.get("/profile", checkAuth, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    
    const sunucu = client.guilds.cache.get(req.params.guildID);
  const db = require('quick.db')
 const moment = require("moment");
 client.users.fetch(req.user.id).then(async a => {
 const member = a;
const gün = moment(member.createdAt).format('DD')
const ay = moment(member.createdAt).format('MM')
  const yıl = moment(member.createdAt).format('YYYY HH:mm:ss')
   var f =''
 if(member.presence.activities.map(a=>a.state)) f=member.presence.activities.map(a=>a.state)
 if(member.presence.activities.map(a=>a.state) =='') f='Yok'
    
  renderTemplate(res, req, "profile.ejs", {guild,sunucu,db,member,moment,gün,ay,yıl,f});
 
    });
  });
     app.get("/settings", checkAuth, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    
    const sunucu = client.guilds.cache.get(req.params.guildID);
  const db = require('quick.db')
 const moment = require("moment");
 client.users.fetch(req.user.id).then(async a => {
 const member = a;
const gün = moment(member.createdAt).format('DD')
const ay = moment(member.createdAt).format('MM')
  const yıl = moment(member.createdAt).format('YYYY HH:mm:ss')
   var f =''
 if(member.presence.activities.map(a=>a.state)) f=member.presence.activities.map(a=>a.state)
 if(member.presence.activities.map(a=>a.state) =='') f='Yok'
    
  renderTemplate(res, req, "settings.ejs", {guild,sunucu,db,member,moment,gün,ay,yıl,f});
 
    });
  });

   

  
 

   app.get("/dashboard/:guildID/manage", checkAuth,async (req, res, args) => {
    const guild = client.guilds.cache.get(req.params.guildID);
     const perms = Discord.Permissions
    const roles = guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
    const sunucu = client.guilds.cache.get(req.params.guildID);
  const db = require('quick.db')
  const canvacord = require("canvacord");

    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
       
    if (!isManaged && !req.session.isAdmin) res.redirect("/");

/*const renkyeşil = #00ee00
const renkkırmızı = #ff0000
const renkbeyaz = #ffffff
const renkmavi = #1e90ff
const renksarı = #ffff00
const renkturuncu = #ff7f24
const renkmor = #bf3eff
const renkturkuvas = #00f5ff
const renkpembe = #ff34b3*/
    
 client.users.fetch(req.user.id).then(async a => {
   const ms = require('ms')
 const member = a;
   const renk = await db.fetch(`seviyearkarenk_${guild.id}`)
const bar = await db.fetch(`seviyebarrenk_${guild.id}`)
  let xp = await db.fetch(`verilecekxp_${guild.id}`)
  let seviyerol = await db.fetch(`svrol_${guild.id}`)
  let rollvl = await db.fetch(`rollevel_${guild.id}`)
  var xpToLvl = await db.fetch(`xpToLvl_${req.user.id}_${guild.id}`);
  let kxp = await db.fetch(`xp_${req.user.id}_${guild.id}`)
  let klvl = await db.fetch(`lvl_${req.user.id}_${guild.id}`)-1
   let statuss = ""
if(member.presence.status === "dnd")
  {
  statuss = "#f04747"  
  }
 if(member.presence.status === "idle")
  {
  statuss = "#ffff00"  
  }
    if(member.presence.status === "online")
  {
  statuss = "#1afa1a"  
  }
 if(member.presence.status === "offline")
  {
  statuss = "#747f8d"  
  }
   
 const entry = await guild.fetchAuditLogs({limit:1, type: "ALL"}).then(entry => entry.entries.first())
  const entry1 = await guild.fetchAuditLogs({limit:2, type: "ALL"}).then(entry1 => entry1.entries.array()[1])
  const entry2 = await guild.fetchAuditLogs({limit:3, type: "ALL"}).then(entry1 => entry1.entries.array()[2])
  const entry3 = await guild.fetchAuditLogs({limit:4, type: "ALL"}).then(entry1 => entry1.entries.array()[3])
   const entry4 = await guild.fetchAuditLogs({limit:5, type: "ALL"}).then(entry1 => entry1.entries.array()[4])

  let aa = ""
      let b = ""
let c = ""
let d = ""
let e = ""
      let f = ""
      if(entry === undefined)
{ aa = "Hata oluştu"}
   else {
   if(entry.action === "MESSAGE_DELETE")
    {
     aa = `${entry.executor.username}#${entry.executor.discriminator} ${entry.extra.channel.name} adlı kanaldan ${entry.target.username} adlı kişinin mesajını sildi. `
 
    }
   else if(entry.action === "MEMBER_ROLE_UPDATE")
    {
aa = `${entry.executor.username}#${entry.executor.discriminator} ${entry.target.username} adlı kişinin rollerini değiştirdi. `
      
        
    }
    else if(entry.action === "CHANNEL_CREATE")
    {
  aa = `${entry.executor.username}#${entry.executor.discriminator} ${entry.target.name} adlı kanalı açtı. `
      
        
    }
   else if(entry.action === "CHANNEL_DELETE")
    {
  aa = `${entry.executor.username}#${entry.executor.discriminator} bir kanalı kanalı sildi. `
      
        
    }
    else if(entry.action === "ROLE_CREATE")
    {
aa = `${entry.executor.username}#${entry.executor.discriminator} ${entry.target.name} adlı rolü açtı. `
      
        
    }
     else if(entry.action === "ROLE_DELETE")
    {
aa = `${entry.executor.username}#${entry.executor.discriminator} bir rolü sildi. `
      
        console.log("channel.create")
    }
  else{
   aa = `${entry.executor.username}#${entry.executor.discriminator} loga düştü.`
  }}
   
   
   //////////////////////////////////
 if(entry1 === undefined)
{}
   else {
   if(entry1.action === "MESSAGE_DELETE")
    {
     b = `${entry1.executor.username}#${entry1.executor.discriminator} ${entry1.extra.channel.name} adlı kanaldan ${entry1.target.username} adlı kişinin mesajını sildi. `
 
    }
   else if(entry1.action === "MEMBER_ROLE_UPDATE")
    {
b = `${entry1.executor.username}#${entry1.executor.discriminator} ${entry1.target.username} adlı kişinin rollerini değiştirdi. `
      
        
    }
    else if(entry1.action === "CHANNEL_CREATE")
    {
  b = `${entry1.executor.username}#${entry1.executor.discriminator} ${entry1.target.name} adlı kanalı açtı. `
      
        
    }
   else if(entry1.action === "CHANNEL_DELETE")
    {
  b = `${entry1.executor.username}#${entry1.executor.discriminator} bir kanalı kanalı sildi. `
      
        
    }
    else if(entry1.action === "ROLE_CREATE")
    {
b = `${entry1.executor.username}#${entry1.executor.discriminator} ${entry1.target.name} adlı rolü açtı. `
      
        
    }
     else if(entry1.action === "ROLE_DELETE")
    {
b = `${entry1.executor.username}#${entry1.executor.discriminator} bir rolü sildi. `
      
       
    }
  else{
   b = `${entry1.executor.username}#${entry1.executor.discriminator} loga düştü.`
  }}
   
   ////////////////
     if(entry2 === undefined)
{}
   else {
  if(entry2.action === "MESSAGE_DELETE")
    {
     c = `${entry2.executor.username}#${entry2.executor.discriminator} ${entry2.extra.channel.name} adlı kanaldan ${entry2.target.username} adlı kişinin mesajını sildi. `
 
    }
   else if(entry2.action === "MEMBER_ROLE_UPDATE")
    {
c = `${entry2.executor.username}#${entry2.executor.discriminator} ${entry2.target.username} adlı kişinin rollerini değiştirdi. `
      
        
    }
    else if(entry2.action === "CHANNEL_CREATE")
    {
  c = `${entry2.executor.username}#${entry2.executor.discriminator} ${entry2.target.name} adlı kanalı açtı. `
      
        
    }
   else if(entry2.action === "CHANNEL_DELETE")
    {
  c = `${entry2.executor.username}#${entry2.executor.discriminator} bir kanalı kanalı sildi. `
      
        
    }
    else if(entry2.action === "ROLE_CREATE")
    {
c = `${entry2.executor.username}#${entry2.executor.discriminator} ${entry2.target.name} adlı rolü açtı. `
      
        
    }
     else if(entry2.action === "ROLE_DELETE")
    {
c = `${entry2.executor.username}#${entry2.executor.discriminator} bir rolü sildi. `
      
       
    }
  else{
   c = `${entry2.executor.username}#${entry2.executor.discriminator} loga düştü.`
  }}
   
   //////////////////////////
    if(entry3 === undefined)
{}
   else {
   if(entry3.action === "MESSAGE_DELETE")
    {
     d = `${entry3.executor.username}#${entry3.executor.discriminator} ${entry3.extra.channel.name} adlı kanaldan ${entry3.target.username} adlı kişinin mesajını sildi. `
 
    }
   else if(entry3.action === "MEMBER_ROLE_UPDATE")
    {
d = `${entry3.executor.username}#${entry3.executor.discriminator} ${entry3.target.username} adlı kişinin rollerini değiştirdi. `
      
        
    }
    else if(entry3.action === "CHANNEL_CREATE")
    {
  d = `${entry3.executor.username}#${entry3.executor.discriminator} ${entry3.target.name} adlı kanalı açtı. `
      
        
    }
   else if(entry3.action === "CHANNEL_DELETE")
    {
  d = `${entry3.executor.username}#${entry3.executor.discriminator} bir kanalı kanalı sildi. `
      
        
    }
    else if(entry3.action === "ROLE_CREATE")
    {
d = `${entry3.executor.username}#${entry3.executor.discriminator} ${entry3.target.name} adlı rolü açtı. `
      
        
    }
     else if(entry3.action === "ROLE_DELETE")
    {
d = `${entry3.executor.username}#${entry3.executor.discriminator} bir rolü sildi. `
      
       
    }
  else{
   d = `${entry3.executor.username}#${entry3.executor.discriminator} loga düştü.`
  }
   }
   ///////////////////////////////
    if(entry4 === undefined)
{}
   else {
   if(entry4.action === "MESSAGE_DELETE")
    {
     f = `${entry4.executor.username}#${entry4.executor.discriminator} ${entry4.extra.channel.name} adlı kanaldan ${entry4.target.username} adlı kişinin mesajını sildi. `
 
    }
   else if(entry4.action === "MEMBER_ROLE_UPDATE")
    {
f = `${entry4.executor.username}#${entry4.executor.discriminator} ${entry4.target.username} adlı kişinin rollerini değiştirdi. `
      
        
    }
    else if(entry4.action === "CHANNEL_CREATE")
    {
  f = `${entry4.executor.username}#${entry4.executor.discriminator} ${entry4.target.name} adlı kanalı açtı. `
      
        
    }
   else if(entry4.action === "CHANNEL_DELETE")
    {
  f = `${entry4.executor.username}#${entry4.executor.discriminator} bir kanalı kanalı sildi. `
      
        
    }
    else if(entry4.action === "ROLE_CREATE")
    {
f = `${entry4.executor.username}#${entry4.executor.discriminator} ${entry4.target.name} adlı rolü açtı. `
      
        
    }
     else if(entry4.action === "ROLE_DELETE")
    {
f = `${entry4.executor.username}#${entry4.executor.discriminator} bir rolü sildi. `
      
       
    }
  else{
   f = `${entry4.executor.username}#${entry4.executor.discriminator} loga düştü.`
  }
   }
    renderTemplate(res, req, "guild/manage.ejs", {perms,guild,sunucu,db,member,statuss,kxp,klvl,xpToLvl,roles,entry,aa,b,c,d,e,f});
   
   
       });
  });
    app.get("/dashboard/:guildID/fun/cekilis", checkAuth, async (req, res) => {
        const guild = client.guilds.cache.get(req.params.guildID);
   const ms = require('ms')
    const sunucu = client.guilds.cache.get(req.params.guildID);
  const db = require('quick.db')
     const barrenk = db.fetch(`seviyebarrenk_${guild.id}`)
    const a = db.fetch(`çekiliş_${guild.id}.channel`)
      let giveawayChannel = guild.channels.cache.find(channel => channel.id === a );
      
 
   let giveawayDuration = db.fetch(`çekiliş_${guild.id}.time`)
   

    let giveawayNumberWinners = db.fetch(`çekiliş_${guild.id}.winner`)
    client.users.fetch(req.user.id).then(async a => {
const member = a
    let giveawayPrize = db.fetch(`çekiliş_${guild.id}.prize`)
  client.giveawaysManager.start(giveawayChannel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: parseInt(giveawayNumberWinners),
            hostedBy: member,
            messages: {
            giveaway: "🎉 **ÇEKİLİŞ** 🎉",
                giveawayEnded: "🎉 **ÇEKİLİŞ SONLANDI** 🎉",
                timeRemaining: "Kalan süre: **{duration}**!",
                inviteToParticipate: "🎉 emojisine basarak katıl!",
                winMessage: "🎉 Tebrikler, {winners}! **{prize}** ödülünü kazandınız!",
                embedFooter: "Çekiliş",
                noWinner: "bir kazanan belirlenemedi!",
                hostedBy: "Çekilişi yapan: {user}",
                winners: "kazanan(lar)",
                endedAt: "Bitiş tarihi",
units: {
                    seconds: "Saniye",
                    minutes: "Dakika",
                    hours: "Saat",
                    days: "Gün",
                    pluralS: false 
                }
            }
        });
       });
 res.redirect(`/dashboard/${req.params.guildID}/fun`);
    });
  app.post("/dashboard/:guildID/manage", checkAuth, async (req, res) => {
    
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    let ayar = req.body
    if (ayar === {}) return;

    if (ayar['prefix']) db.set(`prefix_${guild.id}`, ayar['prefix'])
     if (ayar['kYasak']) {
        db.push(`yasakK_${guild.id}`, ayar['kYasak'])
              
         }
    
    
    res.redirect("/dashboard/"+req.params.guildID+"/manage");
  });
     app.get("/dashboard/:guildID/general/rr", checkAuth, async (req, res) => {
        const guild = client.guilds.cache.get(req.params.guildID);
   
    const sunucu = client.guilds.cache.get(req.params.guildID);
  const db = require('quick.db')
    
const roles =  await db.fetch(`rr_${guild.id}`);
 
       const kanal = guild.channels.cache.find(channel => channel.id === roles.channel );
         const emoji = await db.fetch(`rre_${guild.id}`);
   let emb = new Discord.MessageEmbed()
      .setColor("#FF5349")
      .setDescription(roles.text || `Bu rolü almak için emojiye bas :  <@&${roles.role}> `);
      
     
       kanal.send(emb).then(msg => {
      msg.react(roles.emoji);
        function random(length) {
    let string =
      "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    let secret = "";
    for (let i = length; i > 0; i--) {
      const random = Math.floor(Math.random() * string.length);
      const char = string.charAt(random);
      string = string.replace(char, "");
      secret += char;
    }
    return secret;
  }
 
   let string = random(24);
      roles.id = string
      roles.msg = msg.id
      roles.url = msg.url
      db.set(`rolereactions_${guild.id}_${msg.id}`, roles);
        db.set(`rolereactions_${guild.id}_${msg.id}.role`, roles.role);  
    });
      
      
      
  

    res.redirect(`/dashboard/${req.params.guildID}/general`);
  });
    app.get("/dashboard/:guildID/general/kanalkoruma/reset", checkAuth, (req, res) => {
 const guild = client.guilds.cache.get(req.params.guildID);
    db.delete(`kalog${guild.id}`)

    res.redirect(`/dashboard/${req.params.guildID}/general`);
  });
     app.get("/dashboard/:guildID/general/antispam/reset", checkAuth, (req, res) => {
 const guild = client.guilds.cache.get(req.params.guildID);
    db.delete(`antispamr_${guild.id}`)

    res.redirect(`/dashboard/${req.params.guildID}/general`);
  });
  
      app.get("/dashboard/:guildID/general/rr/reset", checkAuth, (req, res) => {
 const guild = client.guilds.cache.get(req.params.guildID);
    db.delete(`rr_${guild.id}.emoji`)
       db.delete(`rr_${guild.id}.text`)
       db.delete(`rr_${guild.id}.channel`)
       db.delete(`rr_${guild.id}.role`)
    res.redirect(`/dashboard/${req.params.guildID}/general`);
  });
     app.get("/dashboard/:guildID/fun/cekilis/reset", checkAuth, (req, res) => {
 const guild = client.guilds.cache.get(req.params.guildID);
    db.delete(`çekiliş_${guild.id}.time`)
       db.delete(`çekiliş_${guild.id}.winner`)
       db.delete(`çekiliş_${guild.id}.prize`)
       db.delete(`çekiliş_${guild.id}.channel`)
    res.redirect(`/dashboard/${req.params.guildID}/fun`);
  });
       app.get("/dashboard/:guildID/manage/login/reset", checkAuth, (req, res) => {
 const guild = client.guilds.cache.get(req.params.guildID);
    db.delete(`hgmesaj_${guild.id}`)
          db.delete(`hgdmmesaj_${guild.id}`)
          db.delete(`hglog_${guild.id}`)
          db.delete(`çıkışlog_${guild.id}`)
          db.delete(`girişlog_${guild.id}`)
         db.delete(`hglogarka_${guild.id}`)
              db.delete(`hglogarkaresim_${guild.id}`)
         

    res.redirect(`/dashboard/${req.params.guildID}/logs`);
  });
       app.get("/dashboard/:guildID/manage/otorol/reset", checkAuth, (req, res) => {
 const guild = client.guilds.cache.get(req.params.guildID);
    db.delete(`rolK_${guild.id}`)
          db.delete(`otorol_${guild.id}`)
     

    res.redirect(`/dashboard/${req.params.guildID}/logs`);
  });
    app.get("/dashboard/:guildID/manage/message/reset", checkAuth, (req, res) => {
 const guild = client.guilds.cache.get(req.params.guildID);
    db.delete(`mesajsilmelog_${guild.id}`)
          db.delete(`mesajgüncellemelog_${guild.id}`)
     

    res.redirect(`/dashboard/${req.params.guildID}/logs`);
  });
       app.get("/dashboard/:guildID/manage/channel/reset", checkAuth, (req, res) => {
 const guild = client.guilds.cache.get(req.params.guildID);
    db.delete(`kanalaçmalog_${guild.id}`)
          db.delete(`kanalsilmelog_${guild.id}`)
     

    res.redirect(`/dashboard/${req.params.guildID}/logs`);
  });
         app.get("/dashboard/:guildID/manage/role/reset", checkAuth, (req, res) => {
 const guild = client.guilds.cache.get(req.params.guildID);
    db.delete(`rolaçmalog_${guild.id}`)
          db.delete(`rolsilmelog_${guild.id}`)
               db.delete(`rolgüncellemelog_${guild.id}`)
          db.delete(`roldeğiştirmelog_${guild.id}`)
     

    res.redirect(`/dashboard/${req.params.guildID}/logs`);
  });

       app.get("/dashboard/:guildID/manage/ban/reset", checkAuth, (req, res) => {
 const guild = client.guilds.cache.get(req.params.guildID);
    db.delete(`banlog_${guild.id}`)
          db.delete(`banaçmalog_${guild.id}`)
     

    res.redirect(`/dashboard/${req.params.guildID}/logs`);
  });
    app.get("/dashboard/:guildID/manage/name/reset", checkAuth, (req, res) => {
 const guild = client.guilds.cache.get(req.params.guildID);
    db.delete(`isimlog_${guild.id}`)

    res.redirect(`/dashboard/${req.params.guildID}/logs`);
  });
  app.get("/dashboard/:guildID/manage/istek/reset", checkAuth, (req, res) => {
 const guild = client.guilds.cache.get(req.params.guildID);
    db.delete(`ilog_${guild.id}`)

    res.redirect(`/dashboard/${req.params.guildID}/logs`);
  });
    app.get("/dashboard/:guildID/manage/bug/reset", checkAuth, (req, res) => {
 const guild = client.guilds.cache.get(req.params.guildID);
    db.delete(`buglog_${guild.id}`)

    res.redirect(`/dashboard/${req.params.guildID}/logs`);
  });
       app.get("/dashboard/:guildID/manage/emoji/reset", checkAuth, (req, res) => {
 const guild = client.guilds.cache.get(req.params.guildID);
    db.delete(`emojiaçmalog_${guild.id}`)
          db.delete(`emojisilmelog_${guild.id}`)
     

    res.redirect(`/dashboard/${req.params.guildID}/logs`);
  });
    app.get("/dashboard/:guildID/loglar/hgb/sifirla", checkAuth, (req, res) => {
 const guild = client.guilds.cache.get(req.params.guildID);
    db.delete(`hglogarkaresim_${guild.id}`)
     
    res.redirect(`/dashboard/${req.params.guildID}/logs`);
  });
   app.get("/dashboard/:guildID/manage/:ayarID/sifirla", checkAuth, (req, res) => {
    if (db.has(`${req.params.guildID}.${req.params.ayarID}`) ===  false || req.params.ayarID === "resim" && db.fetch(`${req.params.guildID}.${req.params.ayarID}`) === "https://img.revabot.tk/99kd63vy.png") return res.json({"hata":req.params.ayarID.charAt(0).toUpperCase()+req.params.ayarID.slice(1)+" ayarı "+client.users.cache.get(req.params.guildID).tag+" adlı kullanıcıda ayarlı olmadığı için sıfırlanamaz."});
    db.delete(`${req.params.guildID}.${req.params.ayarID}`)
    res.redirect(`/dashboard/${req.params.guildID}/manage`);
  });
      app.get("/dashboard/:guildID/komut-yasak/sil", checkAuth, async (req, res) => {
res.redirect("/dashboard/"+req.params.guildID+"/manage");
});
  app.get("/dashboard/:guildID/komut-yasak/sil/:cmdID", checkAuth, async (req, res) => {
const guild = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.json({"hata":"Bot "+req.params.sunucuID+" ID adresine sahip bir sunucuda bulunmuyor."});
const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});


var komutf = req.params.cmdID;


if(!db.fetch(`yasakK_${req.params.guildID}`).includes(komutf)) {
res.json({"hata":`Yasaklanan komut bulunamadı veya silinmiş.`});
} else {

let x = komutf
let arr = []
db.fetch(`yasakK_${req.params.guildID}`).forEach(v => {
if (v !== x) {
arr.push(v)
}
})
  

db.set(`yasakK_${req.params.guildID}`, arr)
  
}

res.redirect("/dashboard/"+req.params.guildID+"/manage");
});
    app.post("/dashboard/:guildID/fun", checkAuth,  (req, res) => {
    const db = require('quick.db')
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isLanaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isLanaged && !req.session.isAdmin) res.redirect("/");
    let ayar = req.body
    if (ayar === {}) return;
   
        if (ayar['çw']) 
    {db.set(`çekiliş_${guild.id}.winner`,ayar['çw'])
   }
  if (ayar['çö']) 
    {db.set(`çekiliş_${guild.id}.prize`,ayar['çö'])
  }
        if (ayar['çt']) 
    {db.set(`çekiliş_${guild.id}.time`,ayar['çt'])
  }
         if (ayar['çk']) 
    {db.set(`çekiliş_${guild.id}.channel`,ayar['çk'])
 }
    res.redirect("/dashboard/"+req.params.guildID+"/fun");
  });
    app.get("/dashboard/:guildID/fun", checkAuth, async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    const db = require('quick.db')
      const Discord2=require("discord.js");
      let çekilişlog = ""
  if (db.has(`çekiliş_${guild.id}.channel`) === true) {
çekilişlog = client.channels.cache.get(db.fetch(`çekiliş_${guild.id}.channel`)).name
}

    if (!guild) return res.status(404);
    const isLanaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isLanaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/fun.ejs", {guild,db,fs,client2,çekilişlog});
  
  });
    app.post("/dashboard/:guildID/general", checkAuth,  (req, res) => {
    const db = require('quick.db')
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isLanaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isLanaged && !req.session.isAdmin) res.redirect("/");
       let ayar = req.body
    if (ayar === {}) return;
    if (ayar['asr']) 
    {db.set(`antispamr_${guild.id}`,ayar['asr'])
   }

  if (ayar['seviyelog']) 
    {db.set(`svlog_${guild.id}`,ayar['seviyelog'])
   }
 
   if (ayar['rrk']) 
    {db.set(`rr_${guild.id}.channel`,ayar['rrk'])
  }
       if (ayar['rrr']) 
    {db.set(`rr_${guild.id}.role`,ayar['rrr'])
 }
   if (ayar['emoji']) db.set(`rr_${guild.id}.emoji`, ayar['emoji'])   
  if (ayar['yazı']) db.set(`rr_${guild.id}.text`, ayar['yazı'])
    
    if (ayar['gmesaj']) db.set(`girişm_${guild.id}`, ayar['gmesaj'],)
    
     if (ayar['cmesaj']) db.set(`çikişm_${guild.id}`, ayar['cmesaj'],)
    
    if (ayar['hoşgeldinmesaj']) db.set(`hoşgeldinm_${guild.id}`, ayar['hoşgeldinmesaj'],)
            
      if (ayar['kanalkorumak']) 
    {db.set(`kalog${guild.id}`,ayar['kanalkorumak'])
 }
           if (ayar['lvl2'] === 'aktif') {
db.set(`seviyeacik_${guild.id}`, ayar['lvl2'])
            
}
if (!ayar['lvl2']) {
db.delete(`seviyeacik_${guild.id}`)

}
    if (ayar['renk']) {
db.set(`${guild.id}.renk`, ayar['renk'])
    
}

if (ayar['resim']) {
db.set(`${guild.id}.resim`, ayar['resim'])

  
}
   if (ayar['kanalk']=== 'aktif') {
db.set(`kanalk_${guild.id}`, ayar['kanalk'])
            
}
if (!ayar['kanalk']){
db.delete(`kanalk_${guild.id}`)

}

    
      if (ayar['spamk']=== 'aktif') {
db.set(`antispam_${guild.id}`, ayar['spamk'])
             
}
if (!ayar['spamk']){
db.delete(`antispam_${guild.id}`)
  
}
     
               if (ayar['rolek']=== 'aktif') {
db.set(`rolk_${guild.id}`, "acik")
            
}
if (!ayar['rolek']){
db.delete(`rolk_${guild.id}`)
  
}
   
     if (ayar['reklam']=== 'aktif') {
db.set(`reklamFiltre_${guild.id}`, "acik")
             
}
if (!ayar['reklam']){
db.delete(`reklamFiltre_${guild.id}`)
 
}
             if (ayar['küfür']=== 'aktif') {
db.set(`küfürengel_${guild.id}`, "acik")
          
}
if (!ayar['küfür']){
db.delete(`küfürengel_${guild.id}`)
 
}
    
    res.redirect("/dashboard/"+req.params.guildID+"/general");
  });
  app.get("/dashboard/:guildID/general", checkAuth,async (req, res, args) => {
    const guild = client.guilds.cache.get(req.params.guildID);
     const perms = Discord.Permissions
    const roles = guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
    const sunucu = client.guilds.cache.get(req.params.guildID);
  const db = require('quick.db')
  const canvacord = require("canvacord");

    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
       
    if (!isManaged && !req.session.isAdmin) res.redirect("/");

/*const renkyeşil = #00ee00
const renkkırmızı = #ff0000
const renkbeyaz = #ffffff
const renkmavi = #1e90ff
const renksarı = #ffff00
const renkturuncu = #ff7f24
const renkmor = #bf3eff
const renkturkuvas = #00f5ff
const renkpembe = #ff34b3*/
    
 client.users.fetch(req.user.id).then(async a => {
   const ms = require('ms')
 const member = a;
   const renk = await db.fetch(`seviyearkarenk_${guild.id}`)
const bar = await db.fetch(`seviyebarrenk_${guild.id}`)
  let xp = await db.fetch(`verilecekxp_${guild.id}`)
  let seviyerol = await db.fetch(`svrol_${guild.id}`)
  let rollvl = await db.fetch(`rollevel_${guild.id}`)
  var xpToLvl = await db.fetch(`xpToLvl_${req.user.id}_${guild.id}`);
  let kxp = await db.fetch(`xp_${req.user.id}_${guild.id}`)
  let klvl = await db.fetch(`lvl_${req.user.id}_${guild.id}`)-1
   let statuss = ""
if(member.presence.status === "dnd")
  {
  statuss = "#f04747"  
  }
 if(member.presence.status === "idle")
  {
  statuss = "#ffff00"  
  }
    if(member.presence.status === "online")
  {
  statuss = "#1afa1a"  
  }
 if(member.presence.status === "offline")
  {
  statuss = "#747f8d"  
  }
   let rrrol = ""
   let rrkanal = ""
   let kanalog = ""
   let muterol = ""
      let seviyelog = ""
       if (db.has(`rr_${guild.id}.role`) === true) {
rrrol = guild.roles.cache.get(db.fetch(`rr_${guild.id}.role`)).name
}
         if (db.has(`rr_${guild.id}.channel`) === true) {
rrkanal = client.channels.cache.get(db.fetch(`rr_${guild.id}.channel`)).name
}
   if (db.has(`kalog${guild.id}`) === true) {
kanalog = client.channels.cache.get(db.fetch(`kalog${guild.id}`)).name
}
     if (db.has(`antispamr_${guild.id}`) === true) {
muterol = guild.roles.cache.get(db.fetch(`antispamr_${guild.id}`)).name
}
      if (db.has(`svlog_${guild.id}`) === true) {
seviyelog = client.channels.cache.get(db.fetch(`svlog_${guild.id}`)).name
}
    renderTemplate(res, req, "guild/general.ejs", {perms,guild,sunucu,db,member,statuss,kxp,klvl,xpToLvl,roles,rrkanal,rrrol,kanalog,muterol,seviyelog});
   
   
       });
  });
   
  app.post("/dashboard/:guildID/logs", checkAuth,  (req, res) => {
    const db = require('quick.db')
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isLanaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isLanaged && !req.session.isAdmin) res.redirect("/");
    let ayar = req.body
    if (ayar === {}) return;
   
    if (ayar['prefix']) db.set(`prefix_${guild.id}`, ayar['prefix'])
    
  if (ayar['otorol']) db.set(`otorol_${guild.id}`, ayar['otorol'])
    
    if (ayar['gmesaj']) db.set(`girism_${guild.id}`, ayar['gmesaj'])
    
     if (ayar['cmesaj']) db.set(`cikism_${guild.id}`, ayar['cmesaj'])

     if (ayar['hgs']=== 'aktif') {
db.set(`hglogarka_${guild.id}`, "resimli")
           
}
if (!ayar['hgs']){
db.delete(`hglogarka_${guild.id}`)
  
}
    if (ayar['hoşgeldinmesaj']){
db.set(`hgmesaj_${guild.id}`,ayar['hoşgeldinmesaj'])
  
}
    if (ayar['hgresim']) {
db.set(`hglogarkaresim_${guild.id}`, ayar['hgresim'])
    }
        if (ayar['girisk']) 
    {db.set(`girişlog_${guild.id}`,ayar['girisk'])
   }
      if (ayar['çıkışk']) 
    {db.set(`çıkışlog_${guild.id}`,ayar['çıkışk'])
  }
 if (ayar['hoşgeldink']) 
    {db.set(`hglog_${guild.id}`,ayar['hoşgeldink'])
   }
    if (ayar['dmmesaj']) 
    {db.set(`hgdmmesaj_${guild.id}`,ayar['dmmesaj'])
   }      
 if (ayar['otorol']) 
    {db.set(`otorol_${guild.id}`,ayar['otorol'])
    }      
    if (ayar['otorolkanalk']) 
    {db.set(`otorollog_${guild.id}`,ayar['otorolkanalk'])
   } 
   if (ayar['kanalaçmak']) 
    {db.set(`kanalaçmalog_${guild.id}`,ayar['kanalaçmak'])
    } 
    if (ayar['kanalsilmek']) 
    {db.set(`kanalsilmelog_${guild.id}`,ayar['kanalsilmek'])
   } 
    if (ayar['rolaçmak']) 
    {db.set(`rolaçmalog_${guild.id}`,ayar['rolaçmak'])
   } 
    if (ayar['rolsilmek']) 
    {db.set(`rolsilmelog_${guild.id}`,ayar['rolsilmek'])
   } 
    if (ayar['rolgüncellemek']) 
    {db.set(`rolgüncellemelog_${guild.id}`,ayar['rolgüncellemek'])
    } 
    if (ayar['roldeğiştirmek']) 
    {db.set(`roldeğiştirmelog_${guild.id}`,ayar['roldeğiştirmek'])
   }                        
    if (ayar['mesajsilk']) 
    {db.set(`mesajsilmelog_${guild.id}`,ayar['mesajsilk'])
  } 
    if (ayar['mesajeditk']) 
    {db.set(`mesajgüncellemelog_${guild.id}`,ayar['mesajeditk'])
    } 
        if (ayar['bank']) 
    {db.set(`banlog_${guild.id}`,ayar['bank'])
   } 
    if (ayar['banaçk']) 
    {db.set(`banaçmalog_${guild.id}`,ayar['banaçk'])
    } 
      if (ayar['isimlogk']) 
    {db.set(`isimlog_${guild.id}`,ayar['isimlogk'])
   } 
    if (ayar['isteklogk']) 
    {db.set(`ilog_${guild.id}`,ayar['isteklogk'])
    } 
    if (ayar['buglogk']) 
    {db.set(`buglog_${guild.id}`,ayar['buglogk'])
 } 
     if (ayar['emojiaçmalog']) 
    {db.set(`emojiaçmalog_${guild.id}`,ayar['emojiaçmalog'])
    } 
     if (ayar['emojisilmelog']) 
    {db.set(`emojisilmelog_${guild.id}`,ayar['emojisilmelog'])
   } 
    
    res.redirect("/dashboard/"+req.params.guildID+"/logs");
  });
    app.get("/dashboard/:guildID/logs", checkAuth, async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    const db = require('quick.db')
      const Discord2=require("discord.js");
      let mesajsilmekanal = ""
       let mesajgüncellemekanal = ""
let girişlog = ""
let çıkışlog = ""
let hglog = ""
let otorolrol = ""
let otorolkanal = ""
let kanalaçmalog = ""
let kanalsilmelog = ""
let rolaçmalog = ""
let rolsilmelog = ""
let rolgüncellemelog = ""
let roldeğiştirmelog = ""
let banlog = ""
let banaçmalog = ""
let isimlog = ""
let isteklog = ""
let buglog = ""
let emojiaçmalog = ""
let emojisilmelog = ""
      if (db.has(`mesajsilmelog_${guild.id}`) === true) {
 mesajsilmekanal = client.channels.cache.get(db.fetch(`mesajsilmelog_${guild.id}`)).name
}
       if (db.has(`mesajgüncellemelog_${guild.id}`) === true) {
mesajgüncellemekanal = client.channels.cache.get(db.fetch(`mesajgüncellemelog_${guild.id}`)).name
}
      if (db.has(`girişlog_${guild.id}`) === true) {
girişlog = client.channels.cache.get(db.fetch(`girişlog_${guild.id}`)).name
}
    
         if (db.has(`çıkışlog_${guild.id}`) === true) {
çıkışlog = client.channels.cache.get(db.fetch(`çıkışlog_${guild.id}`)).name
}
      if (db.has(`hglog_${guild.id}`) === true) {
hglog = client.channels.cache.get(db.fetch(`hglog_${guild.id}`)).name
}
       if (db.has(`otorol_${guild.id}`) === true) {
otorolrol = guild.roles.cache.get(db.fetch(`otorol_${guild.id}`)).name
}
         if (db.has(`otorollog_${guild.id}`) === true) {
otorolkanal = client.channels.cache.get(db.fetch(`otorollog_${guild.id}`)).name
}
          if (db.has(`kanalaçmalog_${guild.id}`) === true) {
kanalaçmalog = client.channels.cache.get(db.fetch(`kanalaçmalog_${guild.id}`)).name
}
        if (db.has(`kanalsilmelog_${guild.id}`) === true) {
kanalsilmelog = client.channels.cache.get(db.fetch(`kanalsilmelog_${guild.id}`)).name
}
          if (db.has(`rolaçmalog_${guild.id}`) === true) {
rolaçmalog = client.channels.cache.get(db.fetch(`rolaçmalog_${guild.id}`)).name
}
         if (db.has(`rolsilmelog_${guild.id}`) === true) {
rolsilmelog = client.channels.cache.get(db.fetch(`rolsilmelog_${guild.id}`)).name
}
           if (db.has(`rolgüncellemelog_${guild.id}`) === true) {
rolgüncellemelog = client.channels.cache.get(db.fetch(`rolgüncellemelog_${guild.id}`)).name
}
        if (db.has(`roldeğiştirmelog_${guild.id}`) === true) {
roldeğiştirmelog = client.channels.cache.get(db.fetch(`roldeğiştirmelog_${guild.id}`)).name
}
      
         if (db.has(`banlog_${guild.id}`) === true) {
banlog = client.channels.cache.get(db.fetch(`banlog_${guild.id}`)).name
}
         if (db.has(`banaçmalog_${guild.id}`) === true) {
banaçmalog = client.channels.cache.get(db.fetch(`banaçmalog_${guild.id}`)).name
}
          if (db.has(`isimlog_${guild.id}`) === true) {
isimlog = client.channels.cache.get(db.fetch(`isimlog_${guild.id}`)).name
}
  
      
       if (db.has(`ilog_${guild.id}`) === true) {
isteklog = client.channels.cache.get(db.fetch(`ilog_${guild.id}`)).name
}
       if (db.has(`buglog_${guild.id}`) === true) {
buglog = client.channels.cache.get(db.fetch(`buglog_${guild.id}`)).name
}
                if (db.has(`emojiaçmalog_${guild.id}`) === true) {
emojiaçmalog = client.channels.cache.get(db.fetch(`emojiaçmalog_${guild.id}`)).name
}
         if (db.has(`emojisilmelog_${guild.id}`) === true) {
emojisilmelog = client.channels.cache.get(db.fetch(`emojisilmelog_${guild.id}`)).name
}
     
    if (!guild) return res.status(404);
    const isLanaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isLanaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/logs.ejs", {guild,db,fs,client2,mesajsilmekanal,mesajgüncellemekanal,girişlog,çıkışlog,hglog,otorolrol,otorolkanal,kanalsilmelog,kanalaçmalog,rolaçmalog,rolsilmelog,rolgüncellemelog,roldeğiştirmelog,banlog,banaçmalog,isimlog,isteklog,buglog,emojiaçmalog,emojisilmelog});
  
  });

  
  app.get("/dashboard/:guildID/leave", checkAuth, async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    await guild.leave();
    res.redirect("/dashboard");
  });
  
  app.get("/dashboard/:guildID/reset", checkAuth, async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
        db.delete(`çekiliş_${guild.id}.time`)
       db.delete(`çekiliş_${guild.id}.winner`)
       db.delete(`çekiliş_${guild.id}.prize`)
       db.delete(`çekiliş_${guild.id}.channel`)
    db.delete(`kanalklog_${guild.id}`)
    db.delete(`prefix_${guild.id}`)
     db.delete(`rr_${guild.id}.channel`)
 db.delete(`rr_${guild.id}.role`)
     db.delete(`rr_${guild.id}.prefix`)
     db.delete(`rr_${guild.id}.text`)
     db.delete(`antispamr_${guild.id}`)
     db.delete(`prefix_${guild.id}`)

    res.redirect("/dashboard/"+req.params.guildID+"/manage");
  });
  
    app.get("/commands", async (req, res) => {
    
    renderTemplate(res, req, "commands.ejs", {md});
  });
  
  app.get("/stats", (req, res) => {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const members = client.guilds.cache.reduce((p, c) => p + c.memberCount, 0);
    const textChannels = client.channels.cache.filter(c => c.type === "text").size;
    const voiceChannels = client.channels.cache.filter(c => c.type === "voice").size;
    const guilds = client.guilds.cache.size;
    renderTemplate(res, req, "stats.ejs", {
      stats: {
        servers: guilds,
        members: members,
        text: textChannels,
        voice: voiceChannels,
        uptime: duration,
        memoryUsage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
        dVersion: Discord.version,
        nVersion: process.version
      }
    });
  });

  app.get("/dashboard", checkAuth, (req, res) => {
    const perms = Discord.EvaluatedPermissions;
   
    renderTemplate(res, req, "dashboard.ejs", {perms});
  });

  app.get("/dashboard", checkAuth, (req, res) => {
    const perms = Discord.EvaluatedPermissions;
      renderTemplate(res, req, "blocks/head.ejs", {perms});
 
  });
  
  app.get("/admin", checkAuth, (req, res) => {
    if (!req.session.isAdmin) return res.redirect("/");
    renderTemplate(res, req, "admin.ejs");
  });

app.get("/dashboard/:guildID/members", checkAuth, async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.status(404);
    renderTemplate(res, req, "guild/members.ejs", {
      guild: guild,
      members: guild.members.cache.array()
    });
  });
  
  app.get("/dashboard/:guildID/members/list", checkAuth, async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.status(404);
    if (req.query.fetch) {
      await guild.fetchMembers();
    }
    const totals = guild.members.size;
    const start = parseInt(req.query.start, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 50;
    let members = guild.members.cache;
    
    if (req.query.filter && req.query.filter !== "null") {
      members = members.filter(m=> {
        m = req.query.filterUser ? m.user : m;
        return m["displayName"].toLowerCase().includes(req.query.filter.toLowerCase());
      });
    }
    
    if (req.query.sortby) {
      members = members.sort((a, b) => a[req.query.sortby] > b[req.query.sortby]);
    }
    const memberArray = members.array().slice(start, start+limit);
    
    const returnObject = [];
    for (let i = 0; i < memberArray.length; i++) {
      const m = memberArray[i];
      returnObject.push({
        id: m.id,
        status: m.user.presence.status,
        bot: m.user.bot,
        username: m.user.username,
        displayName: m.displayName,
        tag: m.user.tag,
        discriminator: m.user.discriminator,
        joinedAt: m.joinedTimestamp,
        createdAt: m.user.createdTimestamp,
        highestRole: {
          hexColor: m.hexColor
        },
        memberFor: moment.duration(Date.now() - m.joinedAt).format(" D [days], H [hrs], m [mins], s [secs]"),
        roles: m.roles.cache.map(r=>({
          name: r.name,
          id: r.id,
          hexColor: r.hexColor
        }))
      });
    }
    res.json({
      total: totals,
      page: (start/limit)+1,
      pageof: Math.ceil(members.size / limit),
      members: returnObject
    });
  });
  app.get("/dashboard/:guildID/stats", checkAuth, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/stats.ejs", {guild});
  });
  
  client.site = app.listen(client.config.dashboard.port);
};
 
