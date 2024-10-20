const { execSync } = require('child_process');

function install(packageName) {
    console.log(`Installing ${packageName}...`);
    execSync(`npm install ${packageName}`, { stdio: 'inherit' });
}

function tryRequire(packageName) {
    try {
        return require(packageName);
    } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            install(packageName);
            return require(packageName); // Try again after installing
        } else {
            throw err;
        }
    }
}

// Automatically install and require 'express' and 'discord.js'
const express = tryRequire('express');
const Discord = tryRequire('discord.js');

// Example usage of express
const app = express();
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(3000, () => console.log('Express server running on port 3000'));

// Example usage of discord.js
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login('token'); // Replace with your actual Discord bot token

const express = require("express");
const app = express();
const keepAlive = require('./server'); // Import the keepAlive function

app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});

const Discord = require("discord.js");
const client = new Discord.Client();

var prefix = "."; // تعديل مهم جدا
var statuses = [`Made by Mert🌙`];
var timers = 2;
const owners = ["865268413336125480", "1291431700290605150"];

// Add your blacklisted user IDs here
const blacklistedUsers = [""]; // Replace with actual IDs

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setStatus("online");
  var timeing = Math.floor(timers * 1000);
  setInterval(function() {
    var lengthesof = statuses.length;
    var amounter = Math.floor(Math.random() * lengthesof);
    client.user.setActivity(statuses[amounter], { type: "" });
  }, timeing);
});

client.on("message", message => {
  if (message.content.toLowerCase().startsWith(prefix + "help".toLowerCase())) {
    message.react("✔");
    let help = new Discord.MessageEmbed()
      .setTimestamp()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setFooter(`Developed by Mert, `, client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(
        `> **${client.user.username} 's Help commands\n> Available Commands : " 6 " Command\n> Prefix : \`${prefix}\`**\n> **Language : English :flag_gb:**`
      )
      .addFields(
        {
          name: "Public",
          value: `\`${prefix}bc\` , \`${prefix}obc\`, \`${prefix}ping\``
        },
        {
          name: "Admins",
          value: `\`${prefix}setname\` , \`${prefix}setavatar\` `
        },
        {
          name: "Extra",
          value: `\`invite\` , \`help\``
        }
      );
    message.channel.send(help);
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "bc")) {
    message.delete();
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let noargs = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addField(`Error :x:`, `Please type your broadcast message !`)
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    if (!args) return message.channel.send(message.author, noargs);
    message.guild.members.cache
      .filter(m => m.presence.status !== "online")
      .forEach(m => {
        if (m.user.bot || blacklistedUsers.includes(m.user.id)) return; // Check blacklist
        m.send(`${args}\n ${m}`)
          .then(() => {
            console.log(`I Could Send To : ${m.user.tag} ✅`);
          })
          .catch(function() {
            console.log(`I Couldn't Send To : ${m.user.tag} ❌ `);
          });
      });
    let embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `... : \`${
          message.guild.members.cache.filter(
            m => m.presence.status !== "online"
          ).size
        }\` `
      )
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    message.channel
      .send(`جـاري الارسال الرساله الى جميع الاعضاء ..`)
      .then(me => {
        me.edit(message.author, embed);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "obc")) {
    message.delete();
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let noargs = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addField(`Error :x:`, `Please type your broadcast message !`)
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    if (!args) return message.channel.send(message.author, noargs);
    message.guild.members.cache
      .filter(m => m.presence.status !== "offline")
      .forEach(m => {
        if (m.user.bot || blacklistedUsers.includes(m.user.id)) return; // Check blacklist
        m.send(`${args}\n ${m}`)
          .then(() => {
            console.log(`I Could Send To : ${m.user.tag} ✅`);
          })
          .catch(function() {
            console.log(`I Couldn't Send To : ${m.user.tag} ❌ `);
          });
      });
    let embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `📬 : تـم ارسـال رسـالـتـك الـى : \`${
          message.guild.members.cache.filter(
            m => m.presence.status !== "offline"
          ).size
        }\` `
      )
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    message.channel
      .send(`جـاري الارسال الرساله الى جميع الاعضاء ..`)
      .then(me => {
        me.edit(message.author, embed);
      });
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("Pinging..").then(m => {
      m.edit(
        `\`\`\`javascript\nDiscord API : ${Math.round(
          client.ws.ping
        )} ms\n\`\`\` `
      );
    });
  }
   if (message.content.startsWith(prefix + "invite")) {
    message.channel.send("creating an invite link..").then(m => {
      let embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTitle(`Invite Me`)
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
       .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
      m.edit(embed
      );
    });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "setname")) {
    let args = message.content.split(" ");
    let botnameee = args.slice(1).join(" ");
    if (!owners.includes(message.author.id))
      return message.channel.send(
        `** :x: Only Owners Can   Use this Command **`
      );
    if (!botnameee)
      return message.channel.send(
        `** :x: Please Provide me a name for the bot !**`
      );
    client.user.setUsername(`${botnameee}`);
    message.channel.send(`Changing The bot's Name ...`).then(me => {
      me.edit(` Done !`);
    });
  }
  if (message.content.startsWith(prefix + "setavatar")) {
    let args = message.content.split(" ");
    let botnameee = args.slice(1).join(" ");
    if (!owners.includes(message.author.id))
      return message.channel.send(
        `** :x: Only Owners Can   Use this Command **`
      );
    if (!botnameee)
      return message.channel.send(
        `** :x: Please Provide me an avatar for the bot !**`
      );
    client.user.setAvatar(`${botnameee}`);
    message.channel.send(`Changing The bot's Avatar ...`).then(me => {
      me.edit(` Done !`);
    });
  }
});


keepAlive();
client.login(process.env.token);
