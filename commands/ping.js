module.exports = {
    name: 'ping',
    description: 'says ping',

    execute(message, args){
        message.channel.send('12');
    }
}
