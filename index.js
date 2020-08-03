const discord = require("discord.js");
const bot = new discord.Client();
const config = require('./config.json');
const token = config.token;
const prefix = '!';
bot.on('ready',() =>{
    bot.user.setActivity("Patrolling the halls for any bad eggs");
    console.log("janitor bot online")
})

bot.on('message', msg =>{
    let args = msg.content.substring(prefix.length).split(' ');
    if(!msg.author.bot && msg.content.startsWith(prefix)){
        switch(args[0]){
            case 'janitor':
                if(!msg.mentions.members.first() && !args[2]){
                    let messageid = args[2]
                    const specuser = new discord.MessageEmbed()
                        .setTitle("Specify a user/message to report to the janitor!")
                        .setColor("RED")
                        .setAuthor(bot.user.tag, bot.user.avatarURL({
                            dynamic: false,
                            format: 'png',
                            size: 512
                        }))
                        .setTimestamp()
                    msg.channel.send({
                        embed: specuser
                    })
                }else{
                    const banishEmb = new discord.MessageEmbed()
                        .setTitle(`Banish ${msg.mentions.members.first().displayName} to the janitorium?`)
                        console.log(args[0])
                        .setDescription(msg.channel.messages.fetch(args[2]))
                        .setColor("GREEN")
                        .setTimestamp()
                        .setAuthor(bot.user.tag, bot.user.avatarURL({
                            dynamic: false,
                            format: 'png',
                            size: 512
                        }))
                    msg.channel.send({
                        embed: banishEmb
                    }).then(function(message){
                        message.react("👍").then(() => message.react("👎"));
                        console.log(message.reactions.cache.map())
                        setTimeout(() => {
                            let downvotes = message.reactions.cache.filter(rx => rx.emoji.name == '👎')
                            let upvotes = message.reactions.cache.filter(rx => rx.emoji.name == '👍')
                            console.log(downvotes.first().count);
                            console.log(upvotes.first().count);
                            if(downvotes.first().count > upvotes.first().count){
                                console.log(false);
                            }else{
                                const banishing = new discord.MessageEmbed()
                                    .setTitle(`Banishing ${msg.mentions.members.first().displayName} to the janitorium.`)
                                    .setColor("GREEN")
                                    .setTimestamp()
                                    .setAuthor(bot.user.tag, bot.user.avatarURL({
                                        dynamic: false,
                                        format: 'png',
                                        size: 512
                                    }))
                                msg.channel.send({
                                    embed: banishing
                                })
                                let janitorrole = msg.guild.roles.cache.find(r => r.name === 'Janitor');
                                msg.mentions.members.first().roles.add(janitorrole);
                            }
                        }, 5000);
                        
                    })
                }
            break;
            case 'hornypolice':
                if(!msg.mentions.members.first()){
                    const specuser = new discord.MessageEmbed()
                        .setTitle("Specify a user to report to the horny police!")
                        .setColor("RED")
                        .setAuthor(bot.user.tag, bot.user.avatarURL({
                            dynamic: false,
                            format: 'png',
                            size: 512
                        }))
                        .setTimestamp()
                    msg.channel.send({
                        embed: specuser
                    })
                }else{
                    const banishEmb = new discord.MessageEmbed()
                        .setTitle(`Banish ${msg.mentions.members.first().displayName} to horny jail?`)
                        .setDescription("You have 30 seconds to vote")
                        .setColor("GREEN")
                        .setTimestamp()
                        .setAuthor(bot.user.tag, bot.user.avatarURL({
                            dynamic: false,
                            format: 'png',
                            size: 512
                        }))
                    msg.channel.send({
                        embed: banishEmb
                    }).then(function(message){
                        message.react("👍").then(() => message.react("👎"));
                        console.log(message.reactions.cache.map())
                        setTimeout(() => {
                            let downvotes = message.reactions.cache.filter(rx => rx.emoji.name == '👎')
                            let upvotes = message.reactions.cache.filter(rx => rx.emoji.name == '👍')
                            console.log(downvotes.first().count);
                            console.log(upvotes.first().count);
                            if(downvotes.first().count > upvotes.first().count){
                                console.log(false);
                            }else{
                                const banishing = new discord.MessageEmbed()
                                    .setTitle(`Banishing ${msg.mentions.members.first().displayName} to horny jail.`)
                                    .setColor("GREEN")
                                    .setTimestamp()
                                    .setAuthor(bot.user.tag, bot.user.avatarURL({
                                        dynamic: false,
                                        format: 'png',
                                        size: 512
                                    }))
                                msg.channel.send({
                                    embed: banishing
                                })
                                let janitorrole = msg.guild.roles.cache.find(r => r.name === 'Horny Jail');
                                msg.mentions.members.first().roles.add(janitorrole);
                            }
                        }, 30000);
                        
                    })
                }
            break;
        }
    }
})
bot.login(token)