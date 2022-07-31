<h1>Twitter Bot for Twitch live updates</h1>

nodejs packages: <b>node-twitch</b> and <b>twitter-api-v2</b>

npm install node-twitch

npm install twitter-api-v2

- provide all specified information
```
//twitch developer account needed
const twitch = new TwitchApi({
	client_id: "",
	client_secret: ""
});

//twitter developer account needed
const twitterClient = new TwitterApi({
    appKey: '',
    appSecret: '',
    accessToken: '',
    accessSecret: '',
});
```

api request loop

- sleep timer of 1 minute to prevent cached api request



