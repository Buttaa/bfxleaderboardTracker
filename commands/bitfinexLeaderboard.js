const request = require('request');
const fs = require('fs');
const readLastLines = require('read-last-lines');
const readline = require('readline');
const numeral = require('numeral');


const path = 'YOUR_PATH/finexHistory/bitfinexHistory.txt'
const urlLeaderboard = 'https://api-pub.bitfinex.com/v2/rankings/plu:1w:tGLOBAL:USD/hist';
const urlBtcValue = 'https://api.bitfinex.com/v1/pubticker/btcusd';
const twitterArg = 2;
const valueArg = 6;



module.exports = {
    name: 'whale',
    description: 'checks if whales are long or short',

    execute(message, args){
        message.channel.send('writing into file, one second...');
        var reqIndex = 0;
        var counterJoe = 0;
        var counterJohn = 0;

    request((urlBtcValue), { json: true }, (err, res, body) =>{
            var unixConverter = new Date(body.timestamp * 1000)
            var date = unixConverter.getDate();
            var month = unixConverter.getMonth()+1;
            var hour = unixConverter.getHours();
            var minute = unixConverter.getMinutes();
            var seconds = unixConverter.getSeconds();

            var timeMerge = hour + ':' + minute + ':' + seconds + '   ' + date + '.' + month 

            fs.writeFileSync(path,'BTC price: ' + body.mid + '\t' + '\t' + '\t' + ' Time: ' + timeMerge + '\n', {flag:'a'}, function(err){
                console.log(err + ' inside req')
            })
        });

    request(urlLeaderboard, { json: true }, (err, res, body) => {
        if (err) { return console.log(err);}

        for(reqIndex; reqIndex< body.length; reqIndex++){
            if(body[reqIndex][twitterArg] == 'Joe007'){
                fs.writeFileSync(path, 'Twitter name: ' + body[reqIndex][twitterArg] + '\t' + '\t' + ' Profit: ' + body[reqIndex][valueArg] + ' USD' + '\n', {flag:'a'},  function(err){
                    if(err){
                        console.log(err)
                    }
                })

            } else if(body[reqIndex][twitterArg] == 'John_Brown'){
                fs.writeFileSync(path, 'Twitter name: ' + body[reqIndex][twitterArg] + '\t' + ' Profit: ' + body[reqIndex][valueArg] + ' USD' + '\n', {flag:'a'},  function(err){
                    if(err){
                        console.log(err)
                    }
                })

                //checking if these users don't appear on the leaderboard
            } else if(body[reqIndex][twitterArg] != 'John_Brown'){
                counterJohn = counterJohn + 1;
            } else if((body[reqIndex][twitterArg] != 'Joe007')){
                counterJoe = counterJoe + 1;
            }

            }

            //if these counters are not 0, it means that they didn't appear on the leaderboard and their position is unclear
            if(counterJohn != 0){
                fs.writeFileSync(path, 'Twitter name: ' + 'John_Brown' + '\t' + ' Profit: ' + 'currently unknown' + '\n', {flag:'a'},  function(err){
                    if(err){
                        console.log(err)
                    }
                })
            }

            if(counterJoe != 0){
                fs.writeFileSync(path, 'Twitter name: ' + 'Joe007' + '\t' + ' Profit: ' + 'currently unknown' + '\n', {flag:'a'},  function(err){
                    if(err){
                        console.log(err)
                    }
                })
            }
            


        });

        setTimeout(function(){
            readLastLines.read(path, 3)
        .then((lines) => message.channel.send('```' + lines + '```'));
        }, 1850);
        

    }
} 