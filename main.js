const TwitchApi = require("node-twitch").default;
const {TwitterApi} = require('twitter-api-v2');

const twitch = new TwitchApi({
	client_id: "5dqcvke26e4ugwxjhyufg90b1k4f6e",
	client_secret: "873kkemfgs6q9mj4jm45l85wh57o4y"
});


const twitterClient = new TwitterApi({
    appKey: 'g0QYJmnau6xt3b9Cb3uREUbDb',
    appSecret: 'tJJBL4YA8mODVeXedlVF6oMXhaFfWxo81O2LjBUGmuUisDG4Ef',
    accessToken: '1383828146265362432-cVDxmaGxUKVyl2c6IUU0PNiobpcU4V',
    accessSecret: 'I3YqpmuRWLMUI01bwLTkBLHls06yZChbjM6lt9gn4mahg',
});

let status = ""
let has_been_offline = false
let has_been_online = false
let name = "teststream10234"
let link = "https://www.twitch.tv/" + name
let saved_game = ""

async function getStream(){
    while(true){
        const streams = await twitch.getStreams({ channel: name });
        if(streams.data.length > 0){
            status = "live"
            has_been_online = true
            if(has_been_offline == true){
                has_been_offline = false
                //tweet
                tweet_stream(name + " is now live! join the stream: " + link)
            }

            let current_game = streams.data[0]["game_name"]

            if(current_game != saved_game){
                //tweet
                if(current_game != "Just Chatting"){
                    twitterClient.v1.tweet(name + " is now playing " + current_game + "!")
                }
                
                saved_game = current_game
            }
            
        }else{
            has_been_offline = true
            status = "offline"
            if(has_been_online == true){
                has_been_online = false
                //tweet
                tweet_stream(name + " is now offline")
                saved_game = ""
            }
        }
        await sleep(60000)
    }
}

function tweet_stream(message){
    //tweet
    twitterClient.v1.tweet(message)
}

getStream();



function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}