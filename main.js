const TwitchApi = require("node-twitch").default;

const twitch = new TwitchApi({
	client_id: "5dqcvke26e4ugwxjhyufg90b1k4f6e",
	client_secret: "873kkemfgs6q9mj4jm45l85wh57o4y"
});

let status = ""
let has_been_offline = false
has_been_online = false

async function getStream(){
    while(true){
        const streams = await twitch.getStreams({ channel: "xqc" });
        if(streams.data.length > 0){
            status = "live"
            has_been_online = true
            if(has_been_offline == true){
                has_been_offline = false
                //tweet
                tweet_stream("is now live")
            }
            
        }else{
            has_been_offline = true
            status = "offline"
            if(has_been_online == true){
                has_been_online = false
                //tweet
                tweet_stream("is now offline")
            }
        }
    }
}

function tweet_stream(message){
    //tweet
    console.log(message)
}

getStream();

