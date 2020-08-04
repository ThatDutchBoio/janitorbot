const discord = require("discord.js");
const bot = new discord.Client();
const config = require('./config.json');
const token = config.token;
const prefix = '!';
bot.on('ready',() =>{
    bot.user.setActivity("Patrolling the halls for any bad eggs");
    console.log("janitor bot online")
})
function getMessage(msg,channel,args){
    let message = msg.channel.messages.fetch(`${args[2]}`)
    .then(message => {
        return message.content();
    })
    .catch(error => console.log('error'))
}
bot.on('message', msg =>{
    let args = msg.content.substring(prefix.length).split(' ');
    if(!msg.author.bot && msg.content.startsWith(prefix)){
        switch(args[0]){
            case 'janitor':

                if(!msg.mentions.members.first() && !args[2]){
                   
                    const specuser = new discord.MessageEmbed()
                        .setTitle("Specify a user and reason to report to the janitor!")
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
                }else if(msg.mentions.members.first() != undefined && args[2] != undefined){
                    let reason = msg.content.substring(args[1].length+10,msg.content.length)
                    const banishEmb = new discord.MessageEmbed()
                    banishEmb.setTitle(`Banish ${msg.mentions.members.first().displayName} to the janitorium?`)
                        console.log(args[0])
                        banishEmb.setDescription(reason)
                        
                        banishEmb.setColor("GREEN")
                        banishEmb.setTimestamp()
                        banishEmb.setAuthor(bot.user.tag, bot.user.avatarURL({
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
                        }, 30000);
                        
                    })
                }else if(args[2] == ""){
                    const specifyId = new discord.MessageEmbed()
                        .setTitle("Specify a reason!")
                        .setColor("RED")
                        .setAuthor(bot.user.tag, bot.user.avatarURL({
                            dynamic: false,
                            format: 'png',
                            size: 512
                        }))
                        .setTimestamp()
                    msg.channel.send({
                        embed: specifyId
                    })
                }
            break;
            case 'hornypolice':
                
                if(!msg.mentions.members.first() && !args[2]){
                   
                    const specuser = new discord.MessageEmbed()
                        .setTitle("Specify a user and reason to report to the horny police!")
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
                }else if(msg.mentions.members.first() != undefined && args[2] != undefined){
                    let reason = msg.content.substring(args[1].length+13,msg.content.length)
                    const banishEmb = new discord.MessageEmbed()
                    banishEmb.setTitle(`Banish ${msg.mentions.members.first().displayName} to horny jail?`)
                        console.log(args[0])
                        banishEmb.setDescription(reason)
                        
                        banishEmb.setColor("GREEN")
                        banishEmb.setTimestamp()
                        banishEmb.setAuthor(bot.user.tag, bot.user.avatarURL({
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
                }else if(args[2] == undefined){
                    const specifyId = new discord.MessageEmbed()
                        .setTitle("Specify a reason!")
                        .setColor("RED")
                        .setAuthor(bot.user.tag, bot.user.avatarURL({
                            dynamic: false,
                            format: 'png',
                            size: 512
                        }))
                        .setTimestamp()
                    msg.channel.send({
                        embed: specifyId
                    })
                }
            break;
        }
    }
})
bot.login(token)