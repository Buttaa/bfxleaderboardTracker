# bitfinex leaderboard Tracker
Tracks the position of two publicly known traders on BFX

Uses **Bitfinex Exchange API** to get information about the leaderboard, which allows to track traders about their position and profits. The code is very unorganized as I wanted to get it done asap and know what is being done during these market crashes.
Additionally it posts the results into a desired **discord server**.

### The logic is simple: 
If the bitcoin price increases and so do their profits, they must be long. If the absolute value of their profits doesn't increase by the same percentage amount the price did, they have reduced their position and it's time to pay attention


### Requirements to get started
1) 'PATH' of bitfinexHistory.txt in bitfinexLeaderboard.js file
2) 'yourBotToken' , your discord Bots token in discMain.js file

Simply type '!whale' in the discord channel

![image](https://user-images.githubusercontent.com/26490734/77089701-71370280-6a06-11ea-83cc-f02844c116e8.png)
                             

### required modules: discord.js, discord.js-commando , request , fs ,readline


