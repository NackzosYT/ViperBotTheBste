const Discord = require('discord.js');  
const db = require('quick.db');  
const hastebin = require('hastebin-gen');  
const client = new Discord.Client();    
const Canvas = require('canvas');        
const fs = require("fs"); 
const getYoutubeID = require('get-youtube-id'); 
const moment = require("moment");   
const { Client, Util } = require('discord.js');  
const UserBlocked = new Set();  
const jimp = require('jimp');   
const math = require('math-expression-evaluator'); 
const stripIndents = require('common-tags').stripIndents;
const figlet = require('figlet'); 
const queue = new Map(); 
const zalgo = require('zalgolize');   
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const sql = require("sqlite");
 const dateFormat = require('dateformat'); 
 const pretty = require('pretty-ms') 
,ti={}  
,spee={}; 

const prefix = '&'

client.on('ready', () => {
client.user.setGame(`&help | ViperBot`,'https://www.twitch.tv/nackzos');
});












////////////كود كريدتس//////////



const credits = require('./Credits.json');
const creditsPath = './Credits.json';
client.on('message',async message => {
    if(message.author.bot || message.channel.type === 'dm') return;
    let args = message.content.split(' ');
    let author = message.author.id;
    if(!credits[author]) credits[author] = { messages: 0, credits: 0, xp: 0, daily: 86400000 };
    credits[author].messages += 1;
    credits[author].xp += 1;
    if(credits[author].xp === 5) {
        credits[author].xp = 0;
        credits[author].credits += 1;
        fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 4));
    }
    fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 4));
 
   
   if(args[0].toLowerCase() == `${prefix}credit` || args[0].toLowerCase() === `${prefix}credits`) {
       let mention = message.mentions.users.first() || message.author;
       let mentionn = message.mentions.users.first();
       if(!credits[mention.id]) return message.channel.send(`**❎ |** Failed To Find the **Needed Data**.`);
       if(!args[2]) {
        let creditsEmbed = new Discord.RichEmbed()
       .setColor("#36393e")
       .setAuthor(mention.username, mention.avatarURL)
       .setThumbnail(mention.avatarURL)
       .addField(`❯ الكردت`, `» \`${credits[mention.id].credits} $\`\n`, true)
       .addField(`❯ الرسائل`, `» \`${credits[mention.id].messages} 💬\``, true);
       message.channel.send(creditsEmbed);
       
       } else if(mentionn && args[2]) {
           if(isNaN(args[2])) return message.channel.send(`**❎ |** The **"Number"** You Entered **Isn't Correct**.`);
          if(mentionn.id === message.author.id) return message.channel.send(`**❎ |** You Can't Give **Credits** To **Yourself**.`);
           if(args[2] > credits[author].credits) return message.channel.send(`**❎ |** You don't have **Enough** credits to give to ${mentionn}`);
          let first = Math.floor(Math.random() * 9);
          let second = Math.floor(Math.random() * 9);
          let third = Math.floor(Math.random() * 9);
          let fourth = Math.floor(Math.random() * 9);
          let num = `${first}${second}${third}${fourth}`;
         
          message.channel.send(`**🛡 |** **Type** \`${num}\` To **Complete** the transfer!`).then(m => {
              message.channel.awaitMessages(r => r.author.id === message.author.id, { max: 1, time: 20000, errors:['time'] }).then(collected => {
                  let c = collected.first();
                  if(c.content === num) {
                          message.channel.send(`**✅ |** Successfully **Transfered** \`$${args[2]}\` !`);
                          m.delete();
                          c.delete();
                          credits[author].credits += (-args[2]);
                          credits[mentionn.id].credits += (+args[2]);
                          fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 4));
                  } else {
                          m.delete();
                  }
              });
          });
         
      } else {
          message.channel.send(`**❎ |** The **Syntax** should be like **\`${prefix}credits <Mention> [Ammount]\`**`);
      }
  } else if(args[0].toLowerCase() === `${prefix}daily`) {
      if(credits[author].daily !== 86400000 && Date.now() - credits[author].daily !== 86400000) {
          message.channel.send(`**❎ |** You already **Claimed** the daily ammount of credits since \`${pretty(Date.now() - credits[author].daily)}\`.`);
      } else {
          let ammount = getRandom(300, 500);
          credits[author].daily = Date.now();
          credits[author].credits += ammount;
          fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 4));
          message.channel.send(`**✅ |** \`${ammount}\`, Successfully **Claimed** Your daily ammount of credits!`);
      }
  }
});
/////////كود كريدتس//////////


/////برودكسات...//////
client.on("message", message => {
 
            if (message.content.startsWith(prefix + "obc")) {
                         if (!message.member.hasPermission("ADMINISTRATOR"))  return;
  let args = message.content.split(" ").slice(1);
  var argresult = args.join(' ');
  message.guild.members.filter(m => m.presence.status !== 'offline').forEach(m => {//حقوق دايموند كودز
 m.send(`${argresult}\n ${m}`);
})
 message.channel.send(`\`${message.guild.members.filter(m => m.presence.status !== 'online').size}\` : عدد الاعضاء المستلمين`);
 message.delete();
};    
});



client.on('message', async message => {  //itzZa1D & Toxic Codes
  let args = message.content.slice(3);   //itzZa1D & Toxic Codes
  if(message.content.startsWith(prefix + 'bc')) {  //itzZa1D & Toxic Codes
    if(!message.guild.members.get(message.author.id).hasPermission('ADMINISTRATOR')) return message.channel.send('Required Administrator Permission')
       message.guild.members.forEach(m => {  //itzZa1D & Toxic Codes
      
      m.send(args.replace('[user]', m).replace('[server]', m.guild.name).replace('[sender]', message.author.username))  //itzZa1D & Toxic Codes
    })
  }
}) //itzZa1D & Toxic Codes
///////////////////////////////////////




client.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);

    let args = message.content.split(" ").slice(1);

    if (command == "embed") {
        if (!message.channel.guild) return message.reply('** This command only for servers **');
        let say = new Discord.RichEmbed()
            .setDescription(args.join("  "))
            .setColor(0x23b2d6)
        message.channel.sendEmbed(say);
        message.delete();
    }
});


client.on('message',function(message) {
let args = message.content.split(" ").slice(1).join(" ");
if(message.content.startsWith(prefix + "say")) {
if(!args) return;
message.channel.send(`**# ${args}**`); 
}
});


 client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);
  
 

if (command == "za5") {
    let say = new Discord.RichEmbed()
        .setTitle('Text emboss :')
   message.channel.send(`**#** \n ${zalgo(args.join(' '))}`);
  }

});


 client.on('message', message => {
              if (!message.channel.guild) return;
      if(message.content =='&count')
      var IzRo = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setFooter(message.author.username, message.author.avatarURL)
      .setTitle('🌍| Members info')
      .addBlankField(true)
      .addField('Mmeber Count',`${message.guild.memberCount}`)
      message.channel.send(IzRo);
    });


client.on('message',async Epic => {
  if(Epic.content.startsWith(prefix + "vonline")) {
  if(!Epic.guild.member(Epic.author).hasPermissions('MANAGE_CHANNELS')) return Epic.reply(':x: **I Dont Have Permissions**');
  if(!Epic.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return Epic.reply(':x: **You Dont Have Permissions**');
  Epic.guild.createChannel(`Voice Online : [ ${Epic.guild.members.filter(m => m.voiceChannel).size} ]` , 'voice').then(c => {
    console.log(`Voice Online Is Activation In ${Epic.guild.name}`);
    c.overwritePermissions(Epic.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(() => {
      c.setName(`Voice Online :  ${Epic.guild.members.filter(m => m.voiceChannel).size} .`)
    },1000);
  });
  }
});



client.on("message", message => {
    if (message.content === (prefix + "help")) {
     const embed = new Discord.RichEmbed() 
         .setColor("#f8e400")
         .setThumbnail(message.author.avatarURL)
         .setDescription(`**
- ViperBot:leaves: 
- حمايه فائقه من التهكير والجحفله:no_mobile_phones: 
- استجابه سريعه وشغال 24 ساعه:arrows_counterclockwise: 
- اوامر مطوره وسهله الاستخدام:black_nib: 

- CreditsOrder
&credit | لمشاهده الكريدت الخاص بك او لتحويل كريدتس 
&daily | لكسب كريدتس يومي


- PublicOrder
&new | لفتح تكت
&close | لاغلاق تكت
&id | لاضهاء معلوماتك بصوره و رساله
&server | لمشاهده معلومات السيرفر
&avatar | لعرض صورتك او صوره شخص ما
&ping | لمشاهده سرعه البوت
&say | لتكرار كل شي تكتبه
&embed | لتكرار كلشي تكتبه بامبد
&za5 | لزخرفه الكلام
&count | عدد الاشخاص بالسيرفر
&colors | قائمه الوان
&color | يعطيك لون


- AdminOrder
&bc | برودكسات للجميع
&obc | برودكسات للاونلاين فقط
&setlog | نشاء روم اللوق
&clear | لمسح الشات
&antijoin <Days> | لتحديد ايام حسابات الي تريدها تدخل سيرفر
antijoin <on/off> | تفعيل او الغاء عدد ايام حسابات الي تدخل سيرفر
&autorole | لانشاء رتبه تلقائيه
&autoroleinfo | لروئيه معلومات الرتبه التلقائيه
&ban | لتبنيد شخص من سيرفر
&kick | لطرد شخص من سيرفر
&role | لاعطاء رتبه لعضو
&-role | لازاله رتبه من عضو
&temp on | لتشغيل رومات مؤقته
&temp off | لايقاف رومات مؤقته
&temptime | لتغيير وقت الرومات المؤقته
&mute | لاعطاء ميوت لعضو
&unmute | لازاله الميوت من عضو
&mc | لمنع الرسائل في روم
&unmc | لتمكين الرسائل في روم
&hch | لاخفاء روم
&sch | لاضهاء روم
&dr | لحذف جميع رتب السيرفر
&dc | لحذف جميع رتب السيرفر
&setwelcomer | لتمكين الترحيب بالصور المتعدده
&ccolors | صناعه الوان بالعدد الي تريده
&move | لسحب شخص لروم مالك
&mvall | لسحب الجميع لروم مالك


- MusicOrder
&play | لتشغيل اغنيه
&stop | لايقاف اغنيه
&vol | لتحكم بصوت اغنيه
&queue | لمعرفه قائمه تشغيل
&np | لمعرفه الاغنيه المشغله حاليا
&skip | لتخطي الاغنيه
&pause | ايقاف اغنيه مؤقت
&resume | مواصله تشغيل اغنيه
 
 
- BotOrder
&Support | سيرفر السبورت
&bot | معلومات البوت
&contact | مراسله صاحب البوت
By | <@!538100620238782464>

**`)
   message.author.sendEmbed(embed)
   
   }
   });
  
client.on('message', message => {
     if (message.content === (prefix + "help")) {
     let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#f8e400")
  .addField("Done:white_check_mark:" , " الرسالة انرسلت لك بالخاص ")
  message.channel.sendEmbed(embed);
    }
});



client.on('message' , message => {
if (message.author.bot) return;
if (message.content.startsWith(prefix + "contact")) {
if (!message.channel.guild) return;
let args = message.content.split(" ").slice(1).join(" ");
client.users.get("538100620238782464").send(
    "\n" + "**" + "● السيرفر :" + "**" +
    "\n" + "**" + "» " + message.guild.name + "**" +
    "\n" + "**" + " ● المرسل : " + "**" +
    "\n" + "**" + "» " + message.author.tag + "**" +
    "\n" + "**" + " ● الرسالة : " + "**" +
    "\n" + "**" + args + "**");


}
    
});




client.on("message", message => {
    if (message.content === "&support") {
         message.channel.send("Done:white_check_mark: الرسالة انرسلت لك بالخاص ");
     const embed = new Discord.RichEmbed()
         .setColor("RANDOM")
         .setFooter('© ViperBot جميع القوق محفوظة 2019 لــ')
         .addField('سيرفر الدعم الفني', `https://discord.gg/TsRXyxR`)
     message.author.send({embed});
    }
   });


/////كود ايدي بصوره////

client.on('message', message => {
    if(message.content == ('&id')) {    
 
             if (message.channel.type === 'dm') return message.reply('This Command Is Not Avaible In Dm\'s :x:');   
            var Canvas = module.require('canvas');
            var jimp = module.require('jimp');
    
     const w = ['./ID1.png','./ID2.png','./ID3.png','./ID4.png','./ID5.png'];
    
             let Image = Canvas.Image,
                 canvas = new Canvas(802, 404),
                 ctx = canvas.getContext('2d');
             ctx.patternQuality = 'bilinear';
             ctx.filter = 'bilinear';
             ctx.antialias = 'subpixel';
             ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
             ctx.shadowOffsetY = 2;
             ctx.shadowBlur = 2;
             fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
                 if (err) return console.log(err);
                 let BG = Canvas.Image;
                 let ground = new Image;
                 ground.src = Background;
                 ctx.drawImage(ground, 0, 0, 802, 404);
    
     })
                                let user = message.mentions.users.first();
          var men = message.mentions.users.first();
             var heg;
             if(men) {
                 heg = men
             } else {
                 heg = message.author
             }
           var mentionned = message.mentions.members.first();
              var h;
             if(mentionned) {
                 h = mentionned
             } else {
                 h = message.member
             }
             var ment = message.mentions.users.first();
             var getvalueof;
             if(ment) {
               getvalueof = ment;
             } else {
               getvalueof = message.author;
             }//ما خصك ,_,
                                           let url = getvalueof.displayAvatarURL.endsWith(".webp") ? getvalueof.displayAvatarURL.slice(5, -20) + ".png" : getvalueof.displayAvatarURL;
                                             jimp.read(url, (err, ava) => {
                                                 if (err) return console.log(err);
                                                 ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                                                     if (err) return console.log(err);
                            
                                                                                           //Avatar
                                                             let Avatar = Canvas.Image;
                                                             let ava = new Avatar;
                                                             ava.src = buf;
                                                             ctx.beginPath();
                                                           ctx.drawImage(ava, 335, 3, 160, 169);
                                                                            //wl
                                                     ctx.font = '35px Arial Bold';
                                                     ctx.fontSize = '40px';
                                                     ctx.fillStyle = "#dadada";
                                                     ctx.textAlign = "center";
                                                    
                            
                                                     ctx.font = '30px Arial Bold';//Name ,_,
                                                     ctx.fontSize = '30px';
                                                     ctx.fillStyle = "#ffffff";
                                                                             ctx.fillText(`${getvalueof.username}`,655, 170);
                                                                            
                                                                        
                                                          moment.locale('ar-ly');        
                                            
                                            
                                                                    ctx.font = '30px Arial';
                                                     ctx.fontSize = '30px';
                                                     ctx.fillStyle = "#ffffff";
                                                                             ctx.fillText(`${moment(h.joinedAt).fromNow()}`,150, 305);
                                                              
                                                              
                                                                                                     ctx.font = '30px Arial';
                                                     ctx.fontSize = '30px';
                                                     ctx.fillStyle = "#ffffff";
                                                                 ctx.fillText(`${moment(heg.createdTimestamp).fromNow()}`,150, 170); 
                            
                                                       let status;
     if (getvalueof.presence.status === 'online') {
         status = 'online';
     } else if (getvalueof.presence.status === 'dnd') {
         status = 'dnd';
     } else if (getvalueof.presence.status === 'idle') {
         status = 'Idle';
     } else if (getvalueof.presence.status === 'offline') {
         status = 'Offline';
     }
     
     
                                          ctx.cont = '35px Arial';
                                          ctx.fontSize = '30px';
                                          ctx.filleStyle = '#ffffff'
                                          ctx.fillText(`${status}`,655,305)
                  
                                                                   ctx.font = 'regular 30px Cairo';
                                                                   ctx.fontSize = '30px';
                                                                   ctx.fillStyle = '#ffffff'
                                                         ctx.fillText(`${h.presence.game === null ? "Dont Play" : h.presence.game.name}`,390,390);
                            
                               ctx.font = '35px Arial';
                                                                   ctx.fontSize = '30px';
                                                                   ctx.fillStyle = '#ffffff'
                                                                   ctx.fillText(`#${heg.discriminator}`,390,260)
                            
                                 ctx.beginPath();
                                 ctx.stroke();
                               message.channel.sendFile(canvas.toBuffer());
                            
                            
                          
                            
                             })
                            
                             })
 }
 });
////كود ايدي بصوره/////



/////مانع الحسابات الوهميه.//////
let antijoin = JSON.parse(fs.readFileSync('./antijoin.json' , 'utf8'));
/*يحتاج تعرف بكج const fs = require('fs')
طبعا لو مو معرف البكج ^
+ تثبت البكج npm i fs
*/
client.on('message', message => {
    if(message.content.startsWith(prefix + "antijoin on")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
antijoin[message.guild.id] = {
onoff: 'On',
}
message.channel.send(`**✅ The AntiJoin Is __𝐎𝐍__ !**`)
          fs.writeFile("./antijoin.json", JSON.stringify(antijoin), (err) => {
            if (err) return console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }

        })


client.on('message', message => {
    if(message.content.startsWith(prefix + "antijoin off")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
antijoin[message.guild.id] = {
onoff: 'Off',
}
message.channel.send(`**⛔ The AntiJoin Is __𝐎𝐅𝐅__ !**`)
          fs.writeFile("./antijoin.json", JSON.stringify(antijoin), (err) => {
            if (err) return console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }

        })
         client.on('message', message => {
          if (!message.channel.guild) return;


   if(message.content.startsWith(prefix + "setJoin")) {
          let time = message.content.split(" ").slice(1).join(" ");
       if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
       if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
if (!time) return message.channel.send('Please Type The Account Created Time [Days]');
let embed = new Discord.RichEmbed()
.setTitle('**Done The AntiJoin Code Has Been Setup**')
.addField('Account Create Time:', `${time}.`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
antijoin[message.guild.id] = {
created: time,
onoff: 'On',
}
fs.writeFile("./antijoin.json", JSON.stringify(antijoin), (err) => {
if (err) console.error(err)
})
   }})

client.on("guildMemberAdd", async member => {
  if(!antijoin[member.guild.id]) antijoin[member.guild.id] = {
    onoff: 'Off'
  }
  if(antijoin[member.guild.id].onoff === 'Off') return;
  if(!member.user.bot) return;
    let accounttime = `${antijoin[member.guild.id].created}`
    let moment2 = require('moment-duration-format'),
        moment = require("moment"),
        date = moment.duration(new Date() - member.user.createdAt).format("d");
  
    if(date < accounttime) {
      member.ban(`Member account age is lower than ${antijoin[member.guild.id].created} days.`)
    }
  });
/////مانع الحسابات الوهميه.//////


//////اوتو رول/////
let ar = JSON.parse(fs.readFileSync(`./Data/AutoRole.json`, `utf8`))
client.on('guildMemberAdd', member => {
if(!ar[member.guild.id]) ar[member.guild.id] = {
onoff: 'Off',
role: 'Member'
}
if(ar[member.guild.id].onoff === 'Off') return;
member.addRole(member.guild.roles.find(`name`, ar[member.guild.id].role)).catch(console.error)
})
client.on('message', message => {
if(!message.guild) return
if(!ar[message.guild.id]) ar[message.guild.id] = {
onoff: 'Off',
role: 'Member'
}
if(message.content.startsWith(prefix + `autorole`)) {
let perms = message.member.hasPermission(`MANAGE_ROLES`)
if(!perms) return message.reply(`You don't have permissions, required permission : Manage Roles.`)
let args = message.content.split(" ").slice(1)
if(!args.join(" ")) return message.reply(`${prefix}autorle toggle/setrole [ROLE NAME]`)
let state = args[0]
if(!state.trim().toLowerCase() == 'toggle' || !state.trim().toLowerCase() == 'setrole') return message.reply(`Please type a right state, ${prefix}modlogs toggle/setrole [ROLE NAME]`)
if(state.trim().toLowerCase() == 'toggle') {
if(ar[message.guild.id].onoff === 'Off') return [message.channel.send(`**The Autorole Is __𝐎𝐍__ !**`), ar[message.guild.id].onoff = 'On']
if(ar[message.guild.id].onoff === 'On') return [message.channel.send(`**The Autorole Is __𝐎𝐅𝐅__ !**`), ar[message.guild.id].onoff = 'Off']
}
if(state.trim().toLowerCase() == 'set') {
let newRole = message.content.split(" ").slice(2).join(" ")
if(!newRole) return message.reply(`${prefix}autorole setrole [ROLE NAME]`)
if(!message.guild.roles.find(`name`,newRole)) return message.reply(`I Cant Find This Role.`)
ar[message.guild.id].role = newRole
message.channel.send(`**The AutoRole Has Been Changed to ${newRole}.**`)
}
  }
if(message.content === prefix + 'autoroleinfo') {
let perms = message.member.hasPermission(`MANAGE_GUILD`)
if(!perms) return message.reply(`You don't have permissions.`)
var embed = new Discord.RichEmbed()
.addField(`Autorole : :sparkles:  `, `
State : __${ar[message.guild.id].onoff}__
Role : __${ar[message.guild.id].role}__`)
.setColor(`BLUE`)
message.channel.send({embed})
}
fs.writeFile("./Data/AutoRole.json", JSON.stringify(ar), (err) => {
if (err) console.error(err)
});
})
//////اوتو رول//////
/////////////welcome//////////
const sWlc = {}
client.on('message', message => {
if(message.channel.type === "dm") return;
if(message.author.bot) return;
  if(!sWlc[message.guild.id]) sWlc[message.guild.id] = {
    channel: "welcome"
}
const channel = sWlc[message.guild.id].channel
  if (message.content.startsWith(prefix + "setwelcomer")) {
    if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
    let newChannel = message.content.split(' ').slice(1).join(" ")
    if(!newChannel) return message.reply(`**${prefix}setwelcomer فقط اسم الروم بدون **`)
    sWlc[message.guild.id].channel = newChannel
    message.channel.send(`**${message.guild.name}'s channel has been changed to ${newChannel}**`);
  }
});

client.on("guildMemberAdd", member => {
      if(!sWlc[member.guild.id]) sWlc[member.guild.id] = {
    channel: "welcome"
  }
  const channel = sWlc[member.guild.id].channel
    const sChannel = sWlc[member.guild.id].channel
    let welcomer = member.guild.channels.find('name', sChannel);
    let memberavatar = member.user.avatarURL
      if (!welcomer) return;
      if(welcomer) {
         moment.locale('ar-ly');
         var h = member.user;
        let heroo = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(h.avatarURL)
        .setAuthor(h.username,h.avatarURL)
        .addField(': تاريخ دخولك الدسكورد',`${moment(member.user.createdAt).format('D/M/YYYY h:mm a')} **\n** \`${moment(member.user.createdAt).fromNow()}\``,true)            
         .addField(': تاريخ دخولك السيرفر',`${moment(member.joinedAt).format('D/M/YYYY h:mm a ')} \n\`\`${moment(member.joinedAt).startOf(' ').fromNow()}\`\``, true)      
         .setFooter(`${h.tag}`,"https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif")
     welcomer.send({embed:heroo});          
         
      var Canvas = require('canvas')
      var jimp = require('jimp')
     const w = ['wlc1.png','wlc2.png','wlc3.png','wlc4.png'];
      
              let Image = Canvas.Image,
                  canvas = new Canvas(557, 241),
                  ctx = canvas.getContext('2d');
  
              fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
                  if (err) return console.log(err)
                  let BG = Canvas.Image;
                  let ground = new Image;
                  ground.src = Background;
                  ctx.drawImage(ground, 0, 0, 557, 241);
      
      })
      
                      let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".gif" : member.user.displayAvatarURL;
                      jimp.read(url, (err, ava) => {
                          if (err) return console.log(err);
                          ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                              if (err) return console.log(err);
      
                                    ctx.font = '30px Arial Bold';
                              ctx.fontSize = '20px';
                              ctx.fillStyle = "#FFFFFF";
                                ctx.fillText(member.user.username, 245, 150);
                              
                              //NAMEً
                              ctx.font = '30px Arial';
                              ctx.fontSize = '28px';
                              ctx.fillStyle = "#FFFFFF";
      ctx.fillText(` `, 245, 80);
    
                              //AVATARً
                              let Avatar = Canvas.Image;
                              let ava = new Avatar;
                              ava.src = buf;
                              ctx.beginPath();
                 ctx.arc(120.8, 120.5, 112.3, 0, Math.PI*2, true);
                   ctx.closePath();
                   
                                 ctx.clip();

                        ctx.drawImage(ava, 7, 8, 227, 225);
                              ctx.closePath();

                            
    welcomer.sendFile(canvas.toBuffer())
      

      })
      })
      
      }
      });
/////////////welcome//////////












////////معلومات سيرفر////////////
client.on('message', function(msg) {
    if(msg.content.startsWith (prefix  + 'server')) {
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(msg.guild.iconURL)
      .setTitle(`Showing Details Of  **${msg.guild.name}*`)
      .addField('🌐** نوع السيرفر**',`[** __${msg.guild.region}__ **]`,true)
      .addField('🏅** __الرتب__**',`[** __${msg.guild.roles.size}__ **]`,true)
      .addField('🔴**__ عدد الاعضاء__**',`[** __${msg.guild.memberCount}__ **]`,true)
      .addField('🔵**__ عدد الاعضاء الاونلاين__**',`[** __${msg.guild.members.filter(m=>m.presence.status == 'online').size}__ **]`,true)
      .addField('📝**__ الرومات الكتابية__**',`[** __${msg.guild.channels.filter(m => m.type === 'text').size}__** ]`,true)
      .addField('🎤**__ رومات الصوت__**',`[** __${msg.guild.channels.filter(m => m.type === 'voice').size}__ **]`,true)
      .addField('👑**__ الأونـر__**',`**${msg.guild.owner}**`,true)
      .addField('🆔**__ ايدي السيرفر__**',`**${msg.guild.id}**`,true)
      .addField('📅**__ تم عمل السيرفر في__**',msg.guild.createdAt.toLocaleString())
      msg.channel.send({embed:embed});
    }
  });
////////معلومات سيرفر////////////


//////انشاء اللوان والوان مرهم////////
client.on('message', message => {
  if(message.content === prefix + 'colors') {
  if(!message.channel.guild) return message.channel.send('**This Commnad only For Servers !**'); 
let menu = new Discord.RichEmbed()
.setImage('https://b.top4top.net/p_1002p20mv1.png')
.setFooter('Colors Menu')
message.channel.sendEmbed(menu)
}
            });

client.on('message', message => {
            let args = message.content.split(' ').slice(1);
            if(message.content.split(' ')[0] == `${prefix}color`){
            const embedd = new Discord.RichEmbed()
            .setFooter('Requested by '+message.author.username, message.author.avatarURL)
            .setDescription(`**لا يوجد لون بهذا الأسم ** ❌ `)
            .setColor(`RANDOM`)
           
            if(!isNaN(args) && args.length > 0)
           
           
            if    (!(message.guild.roles.find("name",`${args}`))) return  message.channel.sendEmbed(embedd);
           
           
            var a = message.guild.roles.find("name",`${args}`)
             if(!a)return;
            const embed = new Discord.RichEmbed()
           
            .setFooter('Requested by '+message.author.username, message.author.avatarURL)
            .setDescription(`**Done , تم تغير لونك . ✅ **`)
           
            .setColor(`${a.hexColor}`)
            message.channel.sendEmbed(embed);
            if (!args)return;
            setInterval(function(){})
               let count = 0;
               let ecount = 0;
            for(let x = 1; x < 201; x++){
           
            message.member.removeRole(message.guild.roles.find("name",`${x}`))
           
            }
             message.member.addRole(message.guild.roles.find("name",`${args}`));
           
           
            }
            });
			
client.on('message', ra3d => {
                        let args = ra3d.content.split(" ").slice(1).join(" ")
if(ra3d.content.startsWith(prefix + 'ccolors')) {
    if(!args) return ra3d.channel.send('`How Many Colors??`');
             if (!ra3d.member.hasPermission('MANAGE_ROLES')) return ra3d.channel.sendMessage('**You Dont Have Permission `MANAGE_ROLES`**'); 
              ra3d.channel.send(`**✅ |Created __${args}__ Colors**`);
                  setInterval(function(){})
                    let count = 0;
                    let ecount = 0;
          for(let x = 1; x < `${parseInt(args)+1}`; x++){
            ra3d.guild.createRole({name:x,
              color: 'RANDOM'})
              }
            }
       });

//////انشاء اللوان والوان مرهم////////




//////طرد عضو من روم//////
client.on("message", message => {
    const command = message.content.split(" ")[0];

    if(command == prefix+"kv"){

        if (!message.guild.member(message.author).hasPermission('MOVE_MEMBERS') || !message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
            return message.reply('you do not have permission to perform this action!');
        }

        var member = message.guild.members.get(message.mentions.users.array()[0].id);
        if(!message.mentions.users){
            message.reply("please mention the member")
            return;
        }

    if(!member.voiceChannel){
    message.reply("i can't include voice channel for member!")
    return;
    }
              message.guild.createChannel('voicekick', 'voice').then(c => {
                member.setVoiceChannel(c).then(() => {
                    c.delete(305).catch(console.log)
        


    
      });
     });
    }
});
//////طرد عضو من روم//////



//////مسح جميع رومات ومسح جميع ال/رتب//////
client.on('message', omar => {
if(omar.content.split(' ')[0] == prefix + 'dc') {  // delete all channels
if (!omar.channel.guild) return;
if(!omar.guild.member(omar.author).hasPermission("MANAGE_CHANNELS")) return omar.reply("**You Don't Have ` MANAGE_CHANNELS ` Permission**");
if(!omar.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return omar.reply("**I Don't Have ` MANAGE_CHANNELS ` Permission**");
omar.guild.channels.forEach(m => {
m.delete();
});// omar jedol / Codes
}// omar jedol / Codes
if(omar.content.split(' ')[0] == prefix + 'dr') { // delete all roles
if (!omar.channel.guild) return;
if(!omar.guild.member(omar.author).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return omar.reply("**You Don't Have ` MANAGE_ROLES_OR_PERMISSIONS ` Permission**");
if(!omar.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return omar.reply("**I Don't Have ` MANAGE_ROLES_OR_PERMISSIONS ` Permission**");
omar.guild.roles.forEach(m => {
m.delete();
});// omar jedol / Codes
omar.reply("✅ `Success Deleted All Roles - Ranks`")
}// omar jedol / Codes
});

//////مسح جميع رومات ومسح جميع ال/رتب//////








 ///////اخفاء الرومات و اضهارها//////
client.on('ready', () => {
	console.log('I am ready!'); 
  });

client.on('message', message => {
      if(message.content === prefix + "hch") {
      if(!message.channel.guild) return;
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You Dont Have Perms :x:');
             message.channel.overwritePermissions(message.guild.id, {
             READ_MESSAGES: false
 })
              message.channel.send('Channel Hided Successfully ! :white_check_mark:  ')
 }
});


client.on('message', message => {
      if(message.content === prefix + "sch") {
      if(!message.channel.guild) return;
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(':x:');
             message.channel.overwritePermissions(message.guild.id, {
             READ_MESSAGES: true
 })
              message.channel.send('Done  ')
 }
});
///////اخفاء الرومات و اضهارها//////






/////سحب عشو وجميع اعضاء/////
client.on('message', message => {
    if(message.content.startsWith(prefix + 'mvall')) {
     if (!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send('**:x: You Dont Have Perms `MOVE_MEMBERS`**');
       if(!message.guild.member(client.user).hasPermission("MOVE_MEMBERS")) return message.reply("**:x: I Dont Have Perms `MOVE_MEMBERS`**");
    if (message.member.voiceChannel == null) return message.channel.send(`**You Have To Be In Room Voice**`)
     var author = message.member.voiceChannelID;
     var m = message.guild.members.filter(m=>m.voiceChannel)
     message.guild.members.filter(m=>m.voiceChannel).forEach(m => {
     m.setVoiceChannel(author)
     })
     message.channel.send(`**:white_check_mark: Success Moved All To Your Channel**`)


     }
       });
	   
client.on('message', message => {
if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'move')) {
 if (message.member.hasPermission("MOVE_MEMBERS")) {
 if (message.mentions.users.size === 0) {
 return message.channel.send("``Use : " +prefix+ "move @User``")
}
if (message.member.voiceChannel != null) {
 if (message.mentions.members.first().voiceChannel != null) {
 var authorchannel = message.member.voiceChannelID;
 var usermentioned = message.mentions.members.first().id;
var embed = new Discord.RichEmbed()
 .setTitle("Succes!")
 .setColor("#000000")
 .setDescription(`✅ You Have Moved <@${usermentioned}> To Your Channel`)
var embed = new Discord.RichEmbed()
.setTitle(`You are Moved in ${message.guild.name}`)
 .setColor("RANDOM")
.setDescription(`**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`)
 message.guild.members.get(usermentioned).setVoiceChannel(authorchannel).then(m => message.channel.send(embed))
message.guild.members.get(usermentioned).send(embed)
} else {
message.channel.send("`You Cant Move"+ message.mentions.members.first() +" `The User Should Be In channel To Move It`")
}
} else {
 message.channel.send("**``You Should Be In Room Voice To Move SomeOne``**")
}
} else {
message.react("❌")
 }}});
/////سحب عشو وجميع اعضاء/////






////كود ايدي////
client.on('message', message => {       ///Toxic Codes
  if(message.content.startsWith(prefix + "id")) {
    var year = message.createdAt.getFullYear()
    var month = message.createdAt.getMonth()
    var day = message.createdAt.getDate()
         let embed = new Discord.RichEmbed()
         .setAuthor(message.author.username, message.author.avatarURL)
      .setThumbnail(message.author.avatarURL)
        .addField("**اسمك:**",  '**[ ' + `${message.author.username}` + ' ]**')
          .setThumbnail(message.author.avatarURL)
                   .setFooter(`${message.author.username}`, 'https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif')
      .addField('الكود الخاص بك:', message.author.discriminator)
      .addField("**عدد الايام منذ افتتاح حسابك:**", message.author.createdAt.getDate())
        .addField("** تم افتتاح حسابك عام:**", message.createdAt.getFullYear())
            .addField("** عدد الشهور منذ افتتاح حسابك:**", message.createdAt.getMonth())
    
      message.channel.send({embed});
        }
    }); ///Toxic Codes
////كود ايدي////


















//////كود اعطاء ميوت وفكه/////
const mmss = require('ms');
client.on('message', async message => {
    let muteReason = message.content.split(" ").slice(3).join(" ");
    let mutePerson = message.mentions.users.first();
    let messageArray = message.content.split(" ");
    let muteRole = message.guild.roles.find("name", "Muted");
    let time = messageArray[2];
    if(message.content.startsWith(prefix + "mute")) {
        if(!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send('**للأسف لا تمتلك صلاحية** `MUTE_MEMBERS`' );
        if(!mutePerson) return message.channel.send("**- منشن الشخص يلي تبي تعطيه الميوت**");
        if(mutePerson === message.author) return message.channel.send('**- ماتقدر تعطي نفسك ميوت**');
        if(mutePerson === client.user) return message.channel.send('**- ماتقدر تعطي البوت ميوت :)**');
        if(message.guild.member(mutePerson).roles.has(muteRole.id)) return message.channel.send('**- هذا الشخص ميوتد بالفعل**');
        if(!muteRole) return message.guild.createRole({ name: "Muted", permissions: [] });
        if(!time) return message.channel.send("**- اكتب الوقت**");
        if(!time.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('**- Error in this duration maybe the bot not support this duration**');
        if(!muteReason) return message.channel.send("**- اكتب السبب**");
        message.guild.member(mutePerson).addRole(muteRole);
        message.channel.send(`**:white_check_mark: ${mutePerson} has been muted ! :zipper_mouth: **`)
        message.delete()
        let muteEmbed = new Discord.RichEmbed()
        .setTitle(`New Muted User`)
        .setThumbnail(message.guild.iconURL)
        .addField('- Muted By:',message.author,true)
        .addField('- Muted User:', `${mutePerson}`)
        .addField('- Reason:',muteReason,true)
        .addField('- Duration:',`${mmss(mmss(time), {long: true})}`)
        .setFooter(message.author.username,message.author.avatarURL);
        let incidentchannel = message.guild.channels.find(`name`, "incidents");
        if(!incidentchannel) return message.channel.send("Can't find incidents channel.");
        incidentchannel.sendEmbed(muteEmbed)
        mutePerson.send(`**You Are has been muted in ${message.guild.name} reason: ${muteReason}**`)
        .then(() => { setTimeout(() => {
           message.guild.member(mutePerson).removeRole(muteRole);
       }, mmss(time));
    });
    }
});



client.on('message', async message =>{
if (message.author.omar) return;
if (!message.content.startsWith(prefix)) return;
if(!message.channel.guild) return message.channel.send('**This Command For Servers Only ! **').then(m => m.delete(5000));
if(!message.member.hasPermission('MANAGE_ROLES'));
if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("**I Don't Have `MANAGE_ROLES` Permission**").then(msg => msg.delete(6000))
var command = message.content.split(" ")[0];
command = command.slice(prefix.length);
var args = message.content.split(" ").slice(1);
if(command === `unmute`) {
if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.sendMessage("**You Dont Have MANAGE_ROLES Permssions**:x: ").then(msg => msg.delete(6000))


let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if(!toMute) return message.channel.sendMessage("**Mention Someone Please**:x: ");

let role = message.guild.roles.find (r => r.name === "Muted");

if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("**This Person Is Not Muted ! **:x:")

await toMute.removeRole(role)

message.channel.sendMessage(`**${toMute} Has been unmuted !**:white_check_mark:`);
message.delete();
let mutedEmbed = new Discord.RichEmbed()
.setDescription("» New UnMute User «")
.setColor("#bc0000")
.addField("Unmuted", `${Warned} with ID ${Warned.id}`)
.addField("Unmuted By", `<@${message.member.id}> with ID ${message.member.id}`)
.addField("Unmuted In", message.channel)
.addField("Time & Date", `${message.createdAt}`)
.setFooter("MarsMC")
let incidentchannel = message.guild.channels.find(`name`, "incidents");
if(!incidentchannel) return message.channel.send("Can't find incidents channel.");
return;

}
}); 
//////كود اعطاء ميوت وفكه/////










/////كود دعوه بوت//////
client.on('message', message => {
        if (message.content === "&invite") {
            if(!message.channel.guild) return;
        let embed = new Discord.RichEmbed()
        .setAuthor(` ${message.author.username} `, message.author.avatarURL)      
        .setTitle(`➡ Click Here `)
        .setURL(`https://discordapp.com/oauth2/authorize?client_id=539194846435344405&permissions=8&scope=bot`)
        .setThumbnail(" https://cdn.discordapp.com/avatars/377904849783750667/6c76e412f18c142dfd711d05fb363869.png?size=2048")        
     message.channel.sendEmbed(embed);
       }
   });
   
   client.on('message', message => {
        if (message.content === "&inv") {
            if(!message.channel.guild) return;
        let embed = new Discord.RichEmbed()
        .setAuthor(` ${message.author.username} `, message.author.avatarURL)      
        .setTitle(`➡ Click Here `)
        .setURL(`https://discordapp.com/oauth2/authorize?client_id=539194846435344405&permissions=8&scope=bot`)
        .setThumbnail(" https://cdn.discordapp.com/avatars/377904849783750667/6c76e412f18c142dfd711d05fb363869.png?size=2048")        
     message.channel.sendEmbed(embed);
       }
   });

/////كود دعوه بوت//////






/////////كود انشاء روم كتابي وصوتي///////
 client.on('message', message => {
if (message.content.startsWith(prefix+"cvo")) {
    var args = message.content.split(" ").slice(1);
    var argrst = args.join(' ');
                message.guild.createChannel(`${argrst}`,'voice')
         
        }
});
 
client.on('message', message => {
if (message.content.startsWith(prefix+"cch")) {
    var args = message.content.split(" ").slice(1);
    var argrst = args.join(' ');
                message.guild.createChannel(`${argrst}`, 'text')
      }
});
/////////كود انشاء روم كتابي وصوتي///////












/////كود فتح وتفيل شات////
client.on('message', message => {

if(message.content.startsWith(prefix + 'mc')) {
                        if(!message.channel.guild) return message.reply(' هذا الامر فقط للسيرفرات !!');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' ليس لديك صلاحيات');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false

           }).then(() => {
               message.reply("تم تقفيل الشات ✅ ")
           });
             }
if(message.content.startsWith(prefix + 'unmc')) {
    if(!message.channel.guild) return message.reply(' هذا الامر فقط للسيرفرات !!');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('ليس لديك صلاحيات');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true

           }).then(() => {
               message.reply("تم فتح الشات✅")
           });
             }



});
/////كود فتح وتفيل شات////






client.on('message', message => {
if (message.content.startsWith("&bot")) {
message.channel.send({
embed: new Discord.RichEmbed()
   .setAuthor(client.user.username,client.user.avatarURL)
   .setThumbnail(client.user.avatarURL)
   .setColor('RANDOM')
   .setTitle('``INFO ViperBot`` ')
   .addField('``My Ping``' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true)
   .addField('``servers``', [client.guilds.size], true)
   .addField('``channels``' , `[ ${client.channels.size} ]` , true)
   .addField('``Users``' ,`[ ${client.users.size} ]` , true)
   .addField('``My Name``' , `[ ${client.user.tag} ]` , true)
   .addField('``My ID``' , `[ ${client.user.id} ]` , true)
   .addField("**Servers:**" , `[ ${client.guilds.size} ]`)
   .addField("**Users:**", `[ ${client.users.size} ]`)
   .addField("**Channels:**", ` [ ${client.channels.size} ]`)
         .addField('``My Prefix``' , `[ & ]` , true)
         .addField('``My Language``' , `[ JavaScript ]` , true)
         .addField('``Bot Version``' , `[ v1.0 ]` , true)
         .setFooter('By | <@538100620238782464>')
})
}
});





///////كود كيك///////
    client.on('message', message => {
          if (message.author.kick) return;
          if (!message.content.startsWith(prefix)) return;
        
          let command = message.content.split(" ")[0];
          command = command.slice(prefix.length);
        
          let args = message.content.split(" ").slice(1);
        
          if (command == "kick") {
                       if(!message.channel.guild) return;
        
          if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("You Don't Have KICK_MEMBERS Permission").then(msg => msg.delete(5000));
          if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("I Don't Have KICK_Members Permission");
          let user = message.mentions.users.first();
          let reason = message.content.split(" ").slice(2).join(" ");
        
          if (message.mentions.users.size < 1) return message.reply("منشن شخص");
          if(!reason) return message.reply ("اكتب سبب الطرد");
          if (!message.guild.member(user)
          .bannable) return message.reply("لايمكنني طرد شخص اعلى من رتبتي");
        
          message.guild.member(user).kick(7, user);
        
          const Kickembed = new Discord.RichEmbed()
          .setTitle('**New Kicked User !**')
          .setColor("RANDOM")
          .setTimestamp()
          .addField("Kicked User:",  `[ + ${user.tag} + ]`)
          .addField("Kicked By:", `[  + ${message.author.tag} +  ]`)
          .addField("Reason:", `[ + ${reason} +  ]`)
          .addField("Kicked In :", `[${message.channel.name}]`)
          .addField("Time & Date :", `[${message.createdAt}]`)
          .setFooter(message.author.tag,message.author.avatarURL);
          message.guild.channels.find('name',  'incidents').sendEmbed(Kickembed)
        message.channel.send(`**:white_check_mark: ${user} has been kicked ! :airplane:**`)
        user.send(`**:airplane: You are has been kicked in ${message.guild.name} reason: ${reason}**`)
            message.delete()
        }
        });
///////كود كيك///////








////////الباند////////
client.on('message', async message => {
    var moment = require('moment');
    var mmss = require('ms')
    let date = moment().format('Do MMMM YYYY , hh:mm');
    let User = message.mentions.users.first();
    let Reason = message.content.split(" ").slice(3).join(" ");
    let messageArray = message.content.split(" ");
    let time = messageArray[2];
    if(message.content.startsWith(prefix + "ban")) {
       if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("**You dont have ban_members permission :/ **");
       if(!User) message.channel.send("**Mention Someone**");
       if(User.id === client.user.id) return message.channel.send("**Why you want to ban me ? :/**");
       if(User.id === message.guild.owner.id) return message.channel.send("**Nice try man :> you cant ban the ownership**");
       if(!time) return message.channel.send("**- اكتب الوقت**");
       if(!time.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('**- Error in this Duration**');
       if(!Reason) message.channel.send("**- اكتب Reason**");
       let banEmbed = new Discord.RichEmbed()
       .setAuthor(`New Banned User !`)
       .setThumbnail(message.guild.iconURL || message.guild.avatarURL)
       .addField('- Banned By: ',message.author.tag,true)
       .addField('- Banned User:', `${User}`)
       .addField('- Reason:',Reason,true)
       .addField('- Time & Date:', `${message.createdAt}`)
       .addField('- Duration:',time,true)
       .setFooter(message.author.tag,message.author.avatarURL);
       let incidentchannel = message.guild.channels.find(`name`, "incidents");
  if(!incidentchannel) return message.channel.send("Can't find incidents channel.");
  incidentchannel.send(banEmbed);
  message.channel.send(`**:white_check_mark: ${User} has been banned :airplane: **`).then(() => message.guild.member(User).ban({reason: Reason}))
  User.send(`**:airplane: You are has been banned in ${message.guild.name} reason: ${Reason} by: ${message.author.tag} :airplane:**`)
       .then(() => { setTimeout(() => {
           message.guild.unban(User);
       }, mmss(time));
    });
   }
  });

////////الباند////////







////////اللوق//////////
client.on('message', message=>{ //Toxic Codes    //  PremiumBot
    if(message.author.bot) return; //Toxic Codes    //  PremiumBot
    if(!message.channel.guild) return;
    if(message.content.startsWith(prefix+'setlog')) { //Toxic Codes    //  PremiumBot
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("**تحتاج الى `MANAGE_CHANNELS`**");
    let log = message.guild.channels.find("name", "log") //Toxic Codes    //  PremiumBot
    if(log) return message.reply("**يوجد بالفعل روم اللوق**")  //Toxic Codes    //  PremiumBot
    if(!log) {  //Toxic Codes    //  PremiumBot
    message.guild.createChannel("log", "text").then(c=> { //Toxic Codes    //  PremiumBot
        c.overwritePermissions(message.guild.id, { //Toxic Codes    //  PremiumBot
            SEND_MESSAGES: false
    })
})
message.channel.send("**✅ ,تم انشاء روم اللوق بنجــاح**")
    }
    } //Toxic Codes    //  PremiumBot
     })
client.on('error', console.error);
 
client.on('messageDelete', message => { //Toxic Codes    //  PremiumBot
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return; //Toxic Codes    //  PremiumBot
    if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return; //Toxic Codes    //  PremiumBot
    if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return; //Toxic Codes    //  PremiumBot
 
    var logChannel = message.guild.channels.find(c => c.name === 'log'); //Toxic Codes    //  PremiumBot
    if(!logChannel) return; //Toxic Codes    //  PremiumBot
 
    let messageDelete = new Discord.RichEmbed() //Toxic Codes    //  PremiumBot
    .setTitle('**[MESSAGE DELETE]**') //Toxic Codes    //  PremiumBot
    .setColor('RED') //Toxic Codes    //  PremiumBot
    .setThumbnail(message.author.avatarURL) //Toxic Codes    //  PremiumBot
    .setDescription(`**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``)
    .setTimestamp() //Toxic Codes    //  PremiumBot
    .setFooter(message.guild.name, message.guild.iconURL) //Toxic Codes    //  PremiumBot
 
    logChannel.send(messageDelete);
});
client.on('messageUpdate', (oldMessage, newMessage) => { //Toxic Codes    //  PremiumBot
 
    if(oldMessage.author.bot) return;
    if(!oldMessage.channel.type === 'dm') return;
    if(!oldMessage.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!oldMessage.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
 
    var logChannel = oldMessage.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    if(oldMessage.content.startsWith('https://')) return; //Toxic Codes    //  PremiumBot
 
    let messageUpdate = new Discord.RichEmbed()
    .setTitle('**[MESSAGE EDIT]**')
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor('BLUE')
    .setDescription(`**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``)
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL)
 
    logChannel.send(messageUpdate);
});
 
 
// Roles Logs //Toxic Codes    //  PremiumBot
client.on('roleCreate', role => {
 
    if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = role.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    role.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let roleCreate = new Discord.RichEmbed()
        .setTitle('**[ROLE CREATE]**')
        .setThumbnail(userAvatar) //Toxic Codes    //  PremiumBot
        .setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('GREEN')
        .setTimestamp()
        .setFooter(role.guild.name, role.guild.iconURL) //Toxic Codes    //  PremiumBot
  //Toxic Codes    //  PremiumBot
        logChannel.send(roleCreate);
    })
});
client.on('roleDelete', role => { //Toxic Codes    //  PremiumBot
 
    if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = role.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    role.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let roleDelete = new Discord.RichEmbed()
        .setTitle('**[ROLE DELETE]**')
        .setThumbnail(userAvatar) //Toxic Codes    //  PremiumBot
        .setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('RED')
        .setTimestamp() //Toxic Codes    //  PremiumBot
        .setFooter(role.guild.name, role.guild.iconURL)
 
        logChannel.send(roleDelete); //Toxic Codes    //  PremiumBot
    })
});
client.on('roleUpdate', (oldRole, newRole) => {
 
    if(!oldRole.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = oldRole.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
  //Toxic Codes    //  PremiumBot
    oldRole.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
  //Toxic Codes    //  PremiumBot
        if(oldRole.name !== newRole.name) {
            let roleUpdateName = new Discord.RichEmbed()
            .setTitle('**[ROLE NAME UPDATE]**') //Toxic Codes    //  PremiumBot
            .setThumbnail(userAvatar) //Toxic Codes    //  PremiumBot
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL)
 
            logChannel.send(roleUpdateName); //Toxic Codes    //  PremiumBot
        }
        if(oldRole.hexColor !== newRole.hexColor) { //Toxic Codes    //  PremiumBot
            if(oldRole.hexColor === '#000000') { //Toxic Codes    //  PremiumBot
                var oldColor = '`Default`'; //Toxic Codes    //  PremiumBot
            }else {
                var oldColor = oldRole.hexColor;
            } //Toxic Codes    //  PremiumBot //Toxic Codes    //  PremiumBot
            if(newRole.hexColor === '#000000') { //Toxic Codes    //  PremiumBot
                var newColor = '`Default`'; //Toxic Codes    //  PremiumBot
            }else {
                var newColor = newRole.hexColor; //Toxic Codes    //  PremiumBot
            } //Toxic Codes    //  PremiumBot
            let roleUpdateColor = new Discord.RichEmbed() //Toxic Codes    //  PremiumBot
            .setTitle('**[ROLE COLOR UPDATE]**') //Toxic Codes    //  PremiumBot
            .setThumbnail(userAvatar) //Toxic Codes    //  PremiumBot
            .setColor('BLUE') //Toxic Codes    //  PremiumBot
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp() //Toxic Codes    //  PremiumBot
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL)
  //Toxic Codes    //  PremiumBot
            logChannel.send(roleUpdateColor);
        }
        if(oldRole.permissions !== newRole.permissions) { //Toxic Codes    //  PremiumBot
            let roleUpdate = new Discord.RichEmbed() //Toxic Codes    //  PremiumBot
            .setTitle('**[UPDATE ROLE PERMISSIONS]**') //Toxic Codes    //  PremiumBot
            .setThumbnail(userAvatar) //Toxic Codes    //  PremiumBot
            .setColor('BLUE')
            .setDescription(`**\n**:first_place: Successfully \`\`CHANGED\`\` **${oldRole.name}** Permissions!\n\n**Old Permissions:** \`\`${oldRole.permissions}\`\`\n**New Permissions:** \`\`${newRole.permissions}\`\`\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL)
           
            logChannel.send(roleUpdate) //Toxic Codes    //  PremiumBot
        }
    })
});
 
 
// Channels Log
client.on('channelCreate', channel => { //Toxic Codes    //  PremiumBot
  //Toxic Codes    //  PremiumBot //Toxic Codes    //  PremiumBot
    if(!channel.guild) return;
    if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = channel.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    if(channel.type === 'text') { //Toxic Codes    //  PremiumBot
        var roomType = 'Text';
    }else
    if(channel.type === 'voice') { //Toxic Codes    //  PremiumBot
        var roomType = 'Voice';
    }else
    if(channel.type === 'category') { //Toxic Codes    //  PremiumBot
        var roomType = 'Category';
    }
 
    channel.guild.fetchAuditLogs().then(logs => { //Toxic Codes    //  PremiumBot
        var userID = logs.entries.first().executor.id; //Toxic Codes    //  PremiumBot
        var userAvatar = logs.entries.first().executor.avatarURL;
  //Toxic Codes    //  PremiumBot
        let channelCreate = new Discord.RichEmbed() //Toxic Codes    //  PremiumBot
        .setTitle('**[CHANNEL CREATE]**') //Toxic Codes    //  PremiumBot
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('GREEN')
        .setTimestamp()
        .setFooter(channel.guild.name, channel.guild.iconURL)
 
        logChannel.send(channelCreate);
    })
}); //Toxic Codes    //  PremiumBot
client.on('channelDelete', channel => { //Toxic Codes    //  PremiumBot
    if(!channel.guild) return;
    if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = channel.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return; //Toxic Codes    //  PremiumBot
 
    if(channel.type === 'text') { //Toxic Codes    //  PremiumBot
        var roomType = 'Text';
    }else
    if(channel.type === 'voice') { //Toxic Codes    //  PremiumBot
        var roomType = 'Voice';
    }else
    if(channel.type === 'category') { //Toxic Codes    //  PremiumBot
        var roomType = 'Category';
    }
 
    channel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let channelDelete = new Discord.RichEmbed()
        .setTitle('**[CHANNEL DELETE]**')
        .setThumbnail(userAvatar) //Toxic Codes    //  PremiumBot
        .setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('RED')
        .setTimestamp()
        .setFooter(channel.guild.name, channel.guild.iconURL)
 
        logChannel.send(channelDelete); //Toxic Codes    //  PremiumBot
    })
});
client.on('channelUpdate', (oldChannel, newChannel) => {
    if(!oldChannel.guild) return;
 
    var logChannel = oldChannel.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    if(oldChannel.type === 'text') {
        var channelType = 'Text';
    }else
    if(oldChannel.type === 'voice') {
        var channelType = 'Voice';
    }else
    if(oldChannel.type === 'category') {
        var channelType = 'Category';
    }
	
    oldChannel.guild.fetchAuditLogs().then(logs => { //Toxic Codes    //  PremiumBot
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
  //Toxic Codes    //  PremiumBot
        if(oldChannel.name !== newChannel.name) {
            let newName = new Discord.RichEmbed()
            .setTitle('**[CHANNEL EDIT]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp() //Toxic Codes    //  PremiumBot
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL) //Toxic Codes    //  PremiumBot
 
            logChannel.send(newName); //Toxic Codes    //  PremiumBot
        }
        if(oldChannel.topic !== newChannel.topic) { //Toxic Codes    //  PremiumBot
            let newTopic = new Discord.RichEmbed() //Toxic Codes    //  PremiumBot
            .setTitle('**[CHANNEL EDIT]**') //Toxic Codes    //  PremiumBot
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic || 'NULL'}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic || 'NULL'}\`\`\`\n**Channel:** ${oldChannel} (ID: ${oldChannel.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)
 
            logChannel.send(newTopic);
        }
    })
});
 
 
// Guild Logs
client.on('guildBanAdd', (guild, user) => {
 
    if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = guild.channels.find(c => c.name === 'log'); //Toxic Codes    //  PremiumBot
    if(!logChannel) return; //Toxic Codes    //  PremiumBot
 
    guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(userID === client.user.id) return;
 
        let banInfo = new Discord.RichEmbed()
        .setTitle('**[BANNED]**')
        .setThumbnail(userAvatar)
        .setColor('DARK_RED')
        .setDescription(`**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL)
 
        logChannel.send(banInfo);
    })
});
client.on('guildBanRemove', (guild, user) => {
    if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return; //Toxic Codes    //  PremiumBot
    if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = guild.channels.find(c => c.name === 'log'); //Toxic Codes    //  PremiumBot
    if(!logChannel) return;
 
    guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let unBanInfo = new Discord.RichEmbed()
        .setTitle('**[UNBANNED]**')
        .setThumbnail(userAvatar)
        .setColor('GREEN')
        .setDescription(`**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL)
 
        logChannel.send(unBanInfo);
    })
});
client.on('guildMemberUpdate', (oldMember, newMember) => { //Toxic Codes    //  PremiumBot
    var logChannel = oldMember.guild.channels.find(c => c.name === 'log'); //Toxic Codes    //  PremiumBot
    if(!logChannel) return;
 
    oldMember.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id; //Toxic Codes    //  PremiumBot
        var userAvatar = logs.entries.first().executor.avatarURL;
        var userTag = logs.entries.first().executor.tag;
 
        if(oldMember.nickname !== newMember.nickname) {
            if(oldMember.nickname === null) {
                var oldNM = '\`\`اسمه الاصلي\`\`';
            }else {
                var oldNM = oldMember.nickname;
            }
            if(newMember.nickname === null) {
                var newNM = '\`\`اسمه الاصلي\`\`'; //Toxic Codes    //  PremiumBot
            }else {
                var newNM = newMember.nickname;
            }
 
            let updateNickname = new Discord.RichEmbed()
            .setTitle('**[UPDATE MEMBER NICKNAME]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldMember.guild.name, oldMember.guild.iconURL)
  //Toxic Codes    //  PremiumBot
            logChannel.send(updateNickname);
        }
        if(oldMember.roles.size < newMember.roles.size) {
            let role = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first();
 
            let roleAdded = new Discord.RichEmbed()
            .setTitle('**[ADDED ROLE TO MEMBER]**') //Toxic Codes    //  PremiumBot
            .setThumbnail(oldMember.guild.iconURL)
            .setColor('GREEN')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar) //Toxic Codes    //  PremiumBot
 
            logChannel.send(roleAdded);
        }
        if(oldMember.roles.size > newMember.roles.size) {
            let role = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first();
 
            let roleRemoved = new Discord.RichEmbed()
            .setTitle('**[REMOVED ROLE FROM MEMBER]**')
            .setThumbnail(oldMember.guild.iconURL)
            .setColor('RED')
            .setDescription(`**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar) //Toxic Codes    //  PremiumBot
 
            logChannel.send(roleRemoved);
        }
    })
    if(oldMember.guild.owner.user.id !== newMember.guild.owner.user.id) {
        let newOwner = new Discord.RichEmbed()
        .setTitle('**[UPDATE GUILD OWNER]**')
        .setThumbnail(oldMember.guild.iconURL)
        .setColor('GREEN')
        .setDescription(`**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`)
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL)
 
        logChannel.send(newOwner);
    }
});
client.on('guildMemberAdd', member => {
  var logChannel = member.guild.channels.find(c => c.name === 'log'); //Toxic Codes    //  PremiumBot
  if(!logChannel) return;
  //Toxic Codes    //  PremiumBot
  let newMember = new Discord.RichEmbed()
  .setTitle('**[NEW MEMBER ADDED]**') //Toxic Codes    //  PremiumBot
  .setThumbnail(member.user.avatarURL)
  .setColor('GREEN')
  .setDescription(`**\n**:arrow_lower_right: Joined **${member.user.username}** To the server!\n\n**User:** <@${member.user.id}> (ID: ${member.user.id})\n**Days In Discord:** ${Days(member.user.createdAt)}`)
  .setTimestamp()
  .setFooter(member.user.tag, member.user.avatarURL)
 
  logChannel.send(newMember);
});
function Days(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
} //Toxic Codes    //  PremiumBot
client.on('guildMemberRemove', member => { //Toxic Codes    //  PremiumBot
  var logChannel = member.guild.channels.find(c => c.name === 'log'); //Toxic Codes    //  PremiumBot
  if(!logChannel) return; //Toxic Codes    //  PremiumBot
 
  let leaveMember = new Discord.RichEmbed()
  .setTitle('**[LEAVE MEMBER]**')
  .setThumbnail(member.user.avatarURL)
  .setColor('GREEN')
  .setDescription(`**\n**:arrow_upper_left: Leave **${member.user.username}** From the server.\n\n**User:** <@${member.user.id}> (ID: ${member.user.id})`) //Toxic Codes    //  PremiumBot
  .setTimestamp() //Toxic Codes    //  PremiumBot
  .setFooter(member.user.tag, member.user.avatarURL)
  //Toxic Codes    //  PremiumBot
  logChannel.send(leaveMember);
});
 
 
// Voice Logs
client.on('voiceStateUpdate', (voiceOld, voiceNew) => {
 
    if(!voiceOld.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!voiceOld.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = voiceOld.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    voiceOld.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userTag = logs.entries.first().executor.tag;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
// Server Muted Voice
        if(voiceOld.serverMute === false && voiceNew.serverMute === true) {
            let serverMutev = new Discord.RichEmbed()
            .setTitle('**[VOICE MUTE]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png')
            .setColor('RED')
            .setDescription(`**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverMutev);
        }
// Server UnMuted Voice
        if(voiceOld.serverMute === true && voiceNew.serverMute === false) {
            let serverUnmutev = new Discord.RichEmbed()
            .setTitle('**[VOICE UNMUTE]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png')
            .setColor('GREEN')
            .setDescription(`**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverUnmutev);
        }
// Server Deafen Voice
        if(voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
            let serverDeafv = new Discord.RichEmbed()
            .setTitle('**[VOICE DEAFEN]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png')
            .setColor('RED')
            .setDescription(`**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverDeafv);
        }
// Server UnDeafen Voice
        if(voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
            let serverUndeafv = new Discord.RichEmbed() //Toxic Codes    //  PremiumBot
            .setTitle('**[VOICE UNDEAFEN]**')
            .setThumbnail('https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png')
            .setColor('GREEN')
            .setDescription(`**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverUndeafv); //Toxic Codes    //  PremiumBot
        }
    })
// Join Voice Channel
    if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceOld.voiceChannel) {
        let voiceJoin = new Discord.RichEmbed()
        .setTitle('**[JOIN VOICE ROOM]**')
        .setColor('GREEN')
        .setThumbnail(voiceOld.user.avatarURL)
        .setDescription(`**\n**:arrow_lower_right: Successfully \`\`JOIN\`\` To Voice Channel.\n\n**Channel:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
        .setTimestamp()
        .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)
 
        logChannel.send(voiceJoin);
    }
// Leave Voice Channel
    if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceNew.voiceChannel) {
        let voiceLeave = new Discord.RichEmbed()
        .setTitle('**[LEAVE VOICE ROOM]**')
        .setColor('GREEN')
        .setThumbnail(voiceOld.user.avatarURL)
        .setDescription(`**\n**:arrow_upper_left: Successfully \`\`LEAVE\`\` From Voice Channel.\n\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
        .setTimestamp()
        .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)
 
        logChannel.send(voiceLeave); //Toxic Codes    //  PremiumBot
    }
// Changed Voice Channel
    if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && voiceNew.voiceChannel && voiceOld.voiceChannel != null) {
        let voiceLeave = new Discord.RichEmbed()
        .setTitle('**[CHANGED VOICE ROOM]**')
        .setColor('GREEN')
        .setThumbnail(voiceOld.user.avatarURL)
        .setDescription(`**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
        .setTimestamp()
        .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)
 
        logChannel.send(voiceLeave);
    } //Toxic Codes    //  PremiumBot
}); //Toxic Codes    //  PremiumBot //Toxic Codes    //  PremiumBot //Toxic Codes    //  PremiumBot //Toxic Codes    //  PremiumBot //Toxic Codes    //  PremiumBot
////////اللوق//////////




///////////////////////////////////
client.on("guildMemberAdd", member => {
  member.createDM().then(function (channel) {
  return channel.send(`:heart:  ولكم نورت السيرفر:heart: 
:crown:اسم العضو  ${member}:crown:  
انت العضو رقم ${member.guild.memberCount} `) 
}).catch(console.error)
})





client.on('message', message => {  
            if(!message.channel.guild) return; 
var args = message.content.split(' ').slice(1).join(' '); 
  if(message.content.startsWith(prefix + "Dev")) {
 if (message.author.id !== '538100620238782464') return message.reply('** هذا الأمر قفط لصاحب البوت و شكراًً **') 
message.channel.sendMessage('جار ارسال الرسالة |✅') 
client.users.forEach(m =>{ 
m.sendMessage(args) 
}) 
} 
});



client.on('guildCreate', guild => {
  var embed = new Discord.RichEmbed()
  .setColor(0x5500ff)
.setDescription(`**شكراً لك لإضافه البوت الى سيرفرك &help | &invite**`)
      guild.members.send(embed)
});




  
  client.on('message' , message => {
  if(message.author.bot) return;
  if(message.content.startsWith(prefix + "ping")) {
 message.channel.send('Pong..Bot.').then((msg) => {
      msg.edit(`\`\`\`javascript\nTime taken: ${msg.createdTimestamp - message.createdTimestamp} ms.\nDiscord API: ${Math.round(client.ping)} ms.\`\`\``);//حقوق دايموند كودز
 })
  }  
 });
  //////////////////////////////////





/*
البكجآت
npm install discord.js
npm install ytdl-core
npm install get-youtube-id
npm install youtube-info
npm install simple-youtube-api
npm install queue
*/

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`in ${client.guilds.size} servers `)
    console.log(`[ ] ${client.users.size}`)
    client.user.setStatus("idle")
});
client.on('ready', () => {
     client.user.setActivity(".#ViperBot",{type: 'Server'});

});

client.on('message', async msg => {
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;
  const args = msg.content.split(' ');
  const searchString = args.slice(1).join(' ');
  const url = args[1] ? args[1] .replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(msg.guild.id);
  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length)
  if (command === `play`) {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.channel.send('يجب توآجد حضرتك بروم صوتي .');
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has('CONNECT')) {
      return msg.channel.send('لا يتوآجد لدي صلاحية للتكلم بهذآ الروم');
    }
    if (!permissions.has('SPEAK')) {
      return msg.channel.send('لا يتوآجد لدي صلاحية للتكلم بهذآ الروم');
    }

    if (!permissions.has('EMBED_LINKS')) {
      return msg.channel.sendMessage("**يجب توآفر برمشن `EMBED LINKS`لدي **rl")
      }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id);
        await handleVideo(video2, msg, voiceChannel, true);
      }
      return msg.channel.send(` **${playlist.title}** تم الإضآفة إلى قأئمة التشغيل`);
    } else {
      try {

        var video = await youtube.getVideo(url);

      } catch (error) {
        try {
                          var fast = {};
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;
          const embed1 = new Discord.RichEmbed()
              .setDescription(`**الرجآء من حضرتك إختيآر رقم المقطع** :
${videos.map(video2 => `[**${++index}**] **${video2.title}**`).join('\n')}`)
          .setFooter(`${msg.guild.name}`)
            .setThumbnail('https://e.top4top.net/p_1001lsv3w1.png')

          msg.channel.sendEmbed(embed1).then(message =>{

            message.delete(15000)

          });
          try {
            var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
              maxMatches: 1,
              time: 20000,
              errors: ['time']
            })

            }catch(err) {
            console.error(err);
            return msg.channel.send('لم يتم إختيآر مقطع صوتي');
            }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.send(':x: لا يتوفر نتآئج بحث ');
        }
    }

      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === `skip`) {
    if (!msg.member.voiceChannel) return msg.channel.send('أنت لست بروم صوتي .');
    if (!serverQueue) return msg.channel.send('لا يتوفر مقطع لتجآوزه');
    serverQueue.connection.dispatcher.end('تم تجآوز هذآ المقطع');
    return undefined;
  } else if (command === `stop`) {
    if (!msg.member.voiceChannel) return msg.channel.send('أنت لست بروم صوتي .');
    if (!serverQueue) return msg.channel.send('لا يتوفر مقطع لإيقآفه');
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end('تم إيقآف هذآ المقطع');
    return undefined;
  } else if (command === `vol`) {
    if (!msg.member.voiceChannel) return msg.channel.send('أنت لست بروم صوتي .');
    if (!serverQueue) return msg.channel.send('لا يوجد شيء شغآل.');
    if (!args[1]) return msg.channel.send(`:loud_sound: مستوى الصوت **${serverQueue.volume}**`);
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);
    return msg.channel.send(`:speaker: تم تغير الصوت الي **${args[1]}**`);
  } else if (command === `np`) {
    if (!serverQueue) return msg.channel.send('لا يوجد شيء حالي ف العمل.');
    const embedNP = new Discord.RichEmbed()
  .setDescription(`:notes: الان يتم تشغيل : **${serverQueue.songs[0].title}**`)
    return msg.channel.sendEmbed(embedNP);
  } else if (command === `replay`) {
    if (!serverQueue) return msg.channel.send('لا يوجد شيء حالي ف العمل.');
    const embedNP = new Discord.RichEmbed()
  .setDescription(`سيتم اعاده تشغيل الفديو :**${serverQueue.songs[0].title}**`)
  msg.channel.send({embed: embedNP})
     return handleVideo(video, msg, msg.member.voiceChannel);

  } else if (command === `queue`) {
    if (!serverQueue) return msg.channel.send('لا يوجد شيء حالي ف العمل.');
    let index = 0;
    const embedqu = new Discord.RichEmbed()
.setDescription(`**Songs Queue**
${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}
**الان يتم تشغيل** ${serverQueue.songs[0].title}`)
    return msg.channel.sendEmbed(embedqu);
  } else if (command === `pause`) {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.send('تم إيقاف الموسيقى مؤقتا!');
    }
    return msg.channel.send('لا يوجد شيء حالي ف العمل.');
  } else if (command === "resume") {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.send('استأنفت الموسيقى بالنسبة لك !');
    }
    return msg.channel.send('لا يوجد شيء حالي في العمل.');
  }

  return undefined;
async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`,
    time:`${video.duration.hours}:${video.duration.minutes}:${video.duration.seconds}`,
    eyad:`${video.thumbnails.high.url}`,
    best:`${video.channel.title}`,
    bees:`${video.raw.snippet.publishedAt}`,
    shahd:`${video.raw.kind}`,
    zg:`${video.raw.snippet.channelId}`,
        views:`${video.raw.views}`,
        like:`${video.raw.likeCount}`,
        dislike:`${video.raw.dislikeCount}`,
        hi:`${video.raw.id}`
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);
    queueConstruct.songs.push(song);
    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(msg.guild.id);
      return msg.channel.send(`لا أستطيع دخول هذآ الروم ${error}`);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    else return msg.channel.send(` **${song.title}** تم اضافه الاغنية الي القائمة!`);
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);
  const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
    .on('end', reason => {
      if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on('error', error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    fetchVideoInfo(`${song.hi}`, function (err,  idk) {
  if (err) throw new Error(err);
  console.log( idk);
      const yyyy = {}
  if(!yyyy[msg.guild.id]) yyyy[msg.guild.id] = {
    like: `${ idk.likeCount}`,
    dislike: `${ idk.dislikeCount}`
  }
  serverQueue.textChannel.send({embed : new Discord.RichEmbed()
  .setTitle(`**${ idk.title}**`)
  .setURL( idk.url)
  .addField('Time The Video :' , `${song.time}`, true)
  .addField('Channel Name :' , `${song.best}`, true)
  .addField('Channel ID :' , `${song.zg}`, true)
  .addField('Video Created at :' , `${ idk.datePublished}`, true)
  .addField('Views :' , `${ idk.views}`, true)
  .addField('Like👍 :' , `${ idk.likeCount}`, true)
  .addField('dislike👎 :' , `${ idk.dislikeCount}`, true)
  .addField('comments :' , `${ idk.commentCount}`, true)
  .setImage(`${song.eyad}`)
  .setThumbnail('http://cdn.akhbaar24.com/430e061a-f89a-43c7-86d9-82fae5f7c495.jpg')
  .setColor('#ff0000')
  .setTimestamp()
  }).then(love => {
    love.react('👍').then(r=>{
    love.react('👎').then(r =>{
    love.react('🙌').then(r=> {
    let likee = (reaction, user) => reaction.emoji.name === '👍' && user.id === msg.author.id;
    let dislikee = (reaction, user) => reaction.emoji.name === '👎' && user.id === msg.author.id;
    let cnn = (reaction, user) => reaction.emoji.name === '🙌' && user.id === msg.author.id;

    let ll = love.createReactionCollector(likee , {max:5});
    let dd = love.createReactionCollector(dislikee , {max:5});
    let cn = love.createReactionCollector(cnn , {max:5});

        ll.on("collect", r => {
          yyyy[msg.guild.id].like++;
  love.edit({embed : new Discord.RichEmbed()
  .setTitle(`**${ idk.title}**`)
  .setURL( idk.url)
  .addField('Time The Video :' , `${song.time}`, true)
  .addField('Channel Name :' , `${song.best}`, true)
  .addField('Channel ID :' , `${song.zg}`, true)
  .addField('Video Created at :' , `${ idk.datePublished}`, true)
  .addField('Views :' , `${ idk.views}`, true)
  .addField('Like👍 :' , `${yyyy[msg.guild.id].like}`, true)
  .addField('dislike👎 :' , `${ idk.dislikeCount}`, true)
  .addField('comments :' , `${ idk.commentCount}`, true)
  .setImage(`${song.eyad}`)
  .setThumbnail('http://cdn.akhbaar24.com/430e061a-f89a-43c7-86d9-82fae5f7c495.jpg')
  .setColor('#ff0000')
  .setTimestamp()
});
    })

    dd.on("collect", r => {
      yyyy[msg.guild.id].dislike++;
  love.edit({embed : new Discord.RichEmbed()
  .setTitle(`**${ idk.title}**`)
  .setURL( idk.url)
  .addField('Time The Video :' , `${song.time}`, true)
  .addField('Channel Name :' , `${song.best}`, true)
  .addField('Channel ID :' , `${song.zg}`, true)
  .addField('Video Created at :' , `${ idk.datePublished}`, true)
  .addField('Views :' , `${ idk.views}`, true)
  .addField('Like👍 :' , `${ idk.likeCount}`, true)
  .addField('dislike👎 :' , `${yyyy[msg.guild.id].dislike}`, true)
  .addField('comments :' , `${ idk.commentCount}`, true)
  .setImage(`${song.eyad}`)
  .setThumbnail('http://cdn.akhbaar24.com/430e061a-f89a-43c7-86d9-82fae5f7c495.jpg')
  .setColor('#ff0000')
  .setTimestamp()
});
})
    cn.on("collect", r => {
  love.edit({embed : new Discord.RichEmbed()
  .setTitle(`**${ idk.title}**`)
  .setURL( idk.url)
  .addField('Time The Video :' , `${song.time}`, true)
  .addField('Channel Name :' , `${song.best}`, true)
  .addField('Channel ID :' , `${song.zg}`, true)
  .addField('Video Created at :' , `${ idk.datePublished}`, true)
  .addField('Views :' , `${ idk.views}`, true)
  .addField('Like👍 :' , `${ idk.likeCount}`, true)
  .addField('dislike👎 :' , `${ idk.dislikeCount}`, true)
  .addField('comments :' , `${ idk.commentCount}`, true)
  .setImage(`${song.eyad}`)
  .setThumbnail('http://cdn.akhbaar24.com/430e061a-f89a-43c7-86d9-82fae5f7c495.jpg')
  .setColor('#ff0000')
  .setTimestamp()
});
})
})
})
})
})
})
}
});




   
   client.on('message', message => {
    let args = message.content.split(' ').slice(1);
    if(message.content.startsWith(prefix + 'role')) {
        if(!message.member.hasPermission('MANAGE_ROLES')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `MANAGE_ROLES`' );
    let member = message.mentions.users.first();
    let role = args.join(' ').replace(member, '').replace(args[0], '').replace(' ', '');
    console.log(role);
    if(member) {
         if(role.startsWith('-')) {
           let roleRe = args.join(' ').replace(member, '').replace(args[0], '').replace('-', '').replace(' ', '');
           console.log(roleRe);
           let role1 = message.guild.roles.find('name', roleRe);
           console.log(`hi`);
    const ee =new Discord.RichEmbed()
    .setDescription('**:x: I can’t find the role.**')
    .setFooter('Requested By '+message.author.username,message.author.avatarURL)
    if(!role1) return message.channel.send(ee);                message.guild.member(member).removeRole(role1.id);
    
                const e = new Discord.RichEmbed()
    
            .setDescription(':white_check_mark:** Pull Role For **'+member+'**,** '+'**'+'-'+role1.name+'**')
           .setFooter('Requested By '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
            message.channel.send(e)
       } else if(!role.startsWith('-')) {
           let roleRe = args.join(' ').replace(member, '').replace(args[0], '').replace('-', '').replace(' ', '');
           let role1 = message.guild.roles.find('name', roleRe);
    const ee =new Discord.RichEmbed()
    .setDescription('**:x: I can’t find the role.**')
    .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
    if(!role1) return message.channel.send(ee);                message.guild.member(member).removeRole(role1);
           const e = new Discord.RichEmbed()
    
           .setDescription(':white_check_mark:** Pull Role For **'+member+'**,** '+'**'+'+'+role1.name+'**')
           .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
            message.channel.send(e)
       } else {
           message.reply(`يجب عليك كتابة اسم الرتبة`);
       }
    }
    else if(args[0] == 'all') {
    if(role.startsWith('B')) {
    let roleRe = args.join(' ').replace(member, '').replace(args[0], '').replace('-', '').replace(' ', '');
    let role1 = message.guild.roles.find('name', roleRe);
              message.channel.send(`الرجاء الانتظار حتى يتم الانتهاء من الامر`).then(msg =>{
      message.guild.members.forEach(m => {
       message.guild.member(m).removeRole(role1.id);
    });
    msg.edit(`** :white_check_mark:   Done...\n**` +role1.name+`** Has Pull From __${message.guild.members.size}__ Member**`);
    });
    }
    if(role) {
    let role1 = message.guild.roles.find('name', role);
    if(!role1) return;
    message.channel.send(`الرجاء الانتظار حتى يتم الانتهاء من الامر`).then(msg => {
    message.guild.members.forEach(m => {
       message.guild.member(m).removeRole(role1);
    });
    msg.edit(`** :white_check_mark:   Done...\n**` +  role1.name+`** Has Pull To __${message.guild.members.size}__ Members **`);
    });
    }
    } else if(args[0] == 'humans') {
    if(role.startsWith('B')) {
    let roleRe = args.join(' ').replace(member, '').replace(args[0], '').replace('-', '').replace(' ', '');
    let role1 = message.guild.roles.find('name', roleRe);
              message.channel.send(`الرجاء الانتظار حتى يتم الانتهاء من الامر`).then(msg =>{
      message.guild.members.forEach(m => {
       message.guild.member(m).removeRole(role1.id);
    });
    msg.edit(`** :white_check_mark:   Done...\n**` +role1.name+`** Has Pull From __${message.guild.members.size}__ Member**`);
    });
    }
    
    if(role) {
    let role1 = message.guild.roles.find('name', role);
    
    const ee =new Discord.RichEmbed()
    .setDescription('I Cann’t Find This Role')
    .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
    if(!role1) return message.channel.send(ee);
    message.channel.send(`الرجاء الانتظار حتى يتم الانتهاء من الامر`).then(msg => {
       message.guild.members.filter(m =>m.user.bot == false).forEach(m => {
           message.guild.member(m).removeRole(role1);
       });
    msg.edit(`** :white_check_mark:   Done...**`);
    });
    }
    } else if(args[0] == 'bots') {
    if(role.startsWith('B')) {
    let roleRe = args.join(' ').replace(member, '').replace(args[0], '').replace('-', '').replace(' ', '');
    let role1 = message.guild.roles.find('name', roleRe);
              message.channel.send(`الرجاء الانتظار حتى يتم الانتهاء من الامر`).then(msg =>{
      message.guild.members.forEach(m => {
       message.guild.member(m).removeRole(role1.id);
    });
    msg.edit(`** :white_check_mark:  Done...**`);
    });
    }
    if(role) {
    let role1 = message.guild.roles.find('name', role);
    const ee =new Discord.RichEmbed()
    .setDescription('I Cann’t Find This Role')
    .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
    if(!role1) return message.channel.send(ee);
    message.channel.send(`الرجاء الانتظار حتى يتم الانتهاء من الامر`).then(msg => {
       message.guild.members.filter(m =>m.user.bot == true).forEach(m => {
           message.guild.member(m).removeRole(role1);
       });
    msg.edit(`** :white_check_mark:  Done...\n**` +role1.name+`** rank has been pull To __${message.guild.members.size}__ Member**`);
    });
    }
    }
    }
    });




 // clear

client.on('message', message => {//Toxic Codes
   if(!message.channel.guild) return;//Toxic Codes
if(message.content.startsWith(prefix + 'clear')) {//Toxic Codes
if(!message.channel.guild) return message.channel.send('**This Command is Just For Servers**').then(m => m.delete(5000));//Toxic Codes
if(!message.member.hasPermission('MANAGE_MESSAGES')) return      message.channel.send('**You Do not have permission** `MANAGE_MESSAGES`' );//Toxic Codes
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);//Toxic Codes
let request = `Requested By ${message.author.username}`;//Toxic Codes
message.channel.send(`**ViperBot**`).then(msg => {//Toxic Codes
msg.react('?')//Toxic Codes
.then(() => msg.react('?'))//Toxic Codes
.then(() =>msg.react('?'))//Toxic Codes
//Toxic Codes
let reaction1Filter = (reaction, user) => reaction.emoji.name === '?' && user.id === message.author.id;//Toxic Codes
let reaction2Filter = (reaction, user) => reaction.emoji.name === '?' && user.id === message.author.id;//Toxic Codes
//Toxic Codes
let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });//Toxic Codes
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });//Toxic Codes
reaction1.on("collect", r => {//Toxic Codes
message.channel.send(`Chat will delete`).then(m => m.delete(5000));//Toxic Codes
var msg;//Toxic Codes
        msg = parseInt();//Toxic Codes
//Toxic Codes
      message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);//Toxic Codes
      message.channel.sendMessage("", {embed: {//Toxic Codes
        title: "`` Chat Deleted ``",//Toxic Codes
        color: 0x06DF00,//Toxic Codes
        footer: {//Toxic Codes
//Toxic Codes
        }//Toxic Codes//Toxic Codes
      }}).then(msg => {msg.delete(3000)});//Toxic Codes
//Toxic Codes
})//Toxic Codes
reaction2.on("collect", r => {//Toxic Codes
message.channel.send(`**Chat deletion cancelled**`).then(m => m.delete(5000));//Toxic Codes
msg.delete();//Toxic Codes
})//Toxic Codes
})//Toxic Codes
}//Toxic Codes
});//Toxic Codes
//Toxic Codes
client.on("message", message => {//Toxic Codes
            var args = message.content.substring(prefix.length).split(" ");//Toxic Codes
            if (message.content.startsWith(prefix + "clear")) {//Toxic Codes
 if (!args[1]) {//Toxic Codes
                                let x5bz1 = new Discord.RichEmbed()//Toxic Codes
                                .setDescription("&clear <number>")//Toxic Codes
                                .setColor("RANDOM")//Toxic Codes
                                message.channel.sendEmbed(x5bz1);//Toxic Codes
                            } else {//Toxic Codes
                            let messagecount = parseInt(args[1]);//Toxic Codes
                            message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));//Toxic Codes
                                                          message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));//Toxic Codes
                            message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));//Toxic Codes
                            let x5bz2 = new Discord.RichEmbed()
                                                            .setColor("RANDOM")//Toxic Codes
                                .setDescription(":white_check_mark: | Delete " + args[1] + " Message!")//Toxic Codes
                                                                                        message.delete("..");//Toxic Codes
                                message.channel.sendEmbed(x5bz2);//Toxic Codes
                            }//Toxic Codes
                          }//Toxic Codes
});//Toxic Codes

//Toxic Codes





const temp = JSON.parse(fs.readFileSync('./temp.json', 'utf8'));
client.on('message', async message => {
 if(message.channel.type === "dm") return;
  if(message.author.bot) return;
   if(!temp[message.guild.id]) temp[message.guild.id] = {
    time: "3000",
     category : 'click here',
      channel : 'click here'
       }
        if(message.content.startsWith('&temp on')){
         if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
          var ggg= message.guild.createChannel('click here', 'category').then(cg => {
           var ccc =message.guild.createChannel('click here', 'voice').then(ch => {
            ch.setParent(cg)
             message.channel.send('**Done ,**')
              client.on('message' , message => {
               if(message.content === '&temp off') {
                if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
                 cg.delete()
                  ch.delete()
                   message.channel.send('**Done ,**')
                    }
                     });
                      const time = temp[message.guild.id].time
                       client.on('message' , message => {
                        if (message.content.startsWith(prefix + "temptime")) {
                         if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
                          let newTime= message.content.split(' ').slice(1).join(" ")
                          if(!newTime) return message.reply(`**${prefix}temptime <time>  \`1000 = 1s\`**`)
	                 if(isNaN(newTime)) return message.reply(`** The Time Be Nambers :face_palm: **`);
	                if(newTime < 1) return message.reply(`**The Time Be Up \`3000s\`**`)
                       temp[message.guild.id].time = newTime
                      message.channel.send(`**Temp Rooms Time Change To \`${newTime}\`**`);
                     }
                    });
                   client.on('voiceStateUpdate', (old, neww) => {
                  let newUserChannel = neww.voiceChannel
                 let oldUserChannel = old.voiceChannel
                temp[message.guild.id].category = cg.id
               temp[message.guild.id].channel = ch.id
              let channel = temp[message.guild.id].channel
             let category = temp[message.guild.id].category
            if(oldUserChannel === undefined && newUserChannel !== undefined && newUserChannel.id == channel) {
           neww.guild.createChannel(neww.displayName , 'voice').then(c => {
          c.setParent(category)
         let scan = setTimeout(()=>{
        if(!neww.voiceChannel) {
       c.delete();
      client.channels.get(channel).overwritePermissions(neww, {
     CONNECT:true,
    SPEAK:true
   })
  }
 }, temp[neww.guild.id].time);
  c.overwritePermissions(neww, {
   CONNECT:true,
    SPEAK:true,
     MANAGE_CHANNEL:true,
      MUTE_MEMBERS:true,
       DEAFEN_MEMBERS:true,
	MOVE_MEMBERS:true,
	 VIEW_CHANNEL:true
	  })
	   neww.setVoiceChannel(c)
            })
             client.channels.get(channel).overwritePermissions(neww, {
	      CONNECT:false,
	       SPEAK:false
		})
               }
              })
             })
           })
          }
         fs.writeFile("./temp.json", JSON.stringify(temp), (err) => {
        if(err) console.error(err)
       })
      });



	
	
	
client.on("message", (message) => {

if (message.content.toLowerCase().startsWith(prefix + `new`)) {
     const reason = message.content.split(" ").slice(1).join(" ");
     if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`وتعطيها للي تريده يشوف التكت \`Support Team\`لازم تساوي رتبه اسمها`);
     if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`لديك بالفعل تذكرة مفتوحة.`);
     message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
         let role = message.guild.roles.find("name", "Support Team");
         let role2 = message.guild.roles.find("name", "@everyone");
         c.overwritePermissions(role, {
             SEND_MESSAGES: true,
             READ_MESSAGES: true
         });
         c.overwritePermissions(role2, {
             SEND_MESSAGES: false,
             READ_MESSAGES: false
         });
         c.overwritePermissions(message.author, {
             SEND_MESSAGES: true,
             READ_MESSAGES: true
         });
         message.channel.send(`:white_check_mark: تم إنشاء تذكرتك, #${c.name}.`);
         const embed = new Discord.RichEmbed()
             .setColor(0xCF40FA)
             .addField(`مهلا ${message.author.username}!`, `يرجى محاولة شرح سبب فتح هذه التذكرة بأكبر قدر ممكن من التفاصيل. سيكون لدينا ** فريق الدعم ** قريباً لمساعدتك.`)
             .setTimestamp();
         c.send({
             embed: embed
         });
     }).catch(console.error);
 }


if (message.content.toLowerCase().startsWith(prefix + `close`)) {
     if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`لا يمكنك استخدام أمر الإغلاق خارج قناة التذكرة.`);

     message.channel.send(`لايمكنك عكس هذا الاجراء سوف تنتهي المهلة في غضون 10 ثوانٍ ويتم إلغاؤها. \`&close\` : هل أنت واثق؟ بعد التأكيد ، لا يمكنك عكس هذا الإجراء! للاغلاق اكتب`)
         .then((m) => {
      message.channel.awaitMessages(response => response.content === '&close', {
                     max: 1,
                     time: 10000,
                     errors: ['time'],
                 })
                 .then((collected) => {
                     message.channel.delete();
                 })
                 .catch(() => {
                     m.edit('انتهى إغلاق التذاكر ، لم يتم إغلاق التذكرة.').then(m2 => {
                         m2.delete();
                     }, 3000);
                 });
         });
 }

});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
var guilds = {};
client.on('guildBanAdd', function(guild) {
            const rebellog = client.channels.find("name", "log"),
            Onumber = 10,
  Otime = 10000
guild.fetchAuditLogs({
    type: 22
}).then(audit => {
    let banner = audit.entries.map(banner => banner.executor.id)
    let bans = guilds[guild.id + banner].bans || 0
    guilds[guild.id + banner] = {
        bans: 0
    }
      bans[guilds.id].bans += 3;
if(guilds[guild.id + banner].bans >= Onumber) {
try {
let roles = guild.members.get(banner).roles.array();
guild.members.get(banner).removeRoles(roles);

} catch (error) {
console.log(error)
try {
guild.members.get(banner).removeRoles(roles);
  rebellog.send(`<@!${banner.id}>
حآول العبث بالسيرفر @everyone`);
guild.owner.send(`<@!${banner.id}>
حآول العبث بالسيرفر ${guild.name}`)
    setTimeout(() => {
 guilds[guild.id].bans = 0;
  },Otime)
} catch (error) {
console.log(error)
}
}
}
})
});
 let channelc = {};
  client.on('channelCreate', async (channel) => {
  const rebellog = client.channels.find("name", "log"),
  Oguild = channel.guild,
  Onumber = 10,
  Otime = 10000;
  const audit = await channel.guild.fetchAuditLogs({limit: 1});
  const channelcreate = audit.entries.first().executor;
  console.log(` A ${channel.type} Channel called ${channel.name} was Created By ${channelcreate.tag}`);
   if(!channelc[channelcreate.id]) {
    channelc[channelcreate.id] = {
    created : 0
     }
 }
 channelc[channelcreate.id].created += 3;
 if(channelc[channelcreate.id].created >= Onumber ) {
let roles = guild.members.get(banner).roles.array();
guild.members.get(banner).removeRoles(roles);
rebellog.send(`<@!${channelcreate.id}>
حآول العبث بالسيرفر @everyone`);
channel.guild.owner.send(`<@!${channelcreate.id}>
حآول العبث بالسيرفر ${channel.guild.name}`)
}
  setTimeout(() => {
 channelc[channelcreate.id].created = 0;
  },Otime)
  });

let channelr = {};
  client.on('channelDelete', async (channel) => {
  const rebellog = client.channels.find("name", "log"),
  Oguild = channel.guild,
  Onumber = 10,
  Otime = 10000;
  const audit = await channel.guild.fetchAuditLogs({limit: 1});
  const channelremover = audit.entries.first().executor;
  console.log(` A ${channel.type} Channel called ${channel.name} was deleted By ${channelremover.tag}`);
   if(!channelr[channelremover.id]) {
    channelr[channelremover.id] = {
    deleted : 0
     }
 }
 channelr[channelremover.id].deleted += 3;
 if(channelr[channelremover.id].deleted >= Onumber ) {
let roles = guild.members.get(banner).roles.array();
guild.members.get(banner).removeRoles(roles);
rebellog.send(`<@!${channelremover.id}>
حآول العبث بالسيرفر @everyone`);
channel.guild.owner.send(`<@!${channelremover.id}>
حآول العبث بالسيرفر ${channel.guild.name}`)
}
  setTimeout(() => {
 channelr[channelremover.id].deleted = 0;
  },Otime)
  });

	


client.login(process.env.BOT_TOKEN); 
