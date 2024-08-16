# League_of_Legends_Metrics_Viewer

## Project Description

What we want to create is a web application made for League of Legends players. Our application, the "League of Legends Matchup Calculator," or LOLMC, is a user-friendly tool that would calculate and predict team matchups based on extensive historical champion data, including strengths, weaknesses, performance statistics, and synergy between each champion. Users of the app can input their team composition, and then our application can analyze the matchup against their opponents, and look at factors such as lane dominance, jungle control, team fight capability, and late-game scaling to see which side is more likely to win.

The application will provide both a percentage-based win prediction and insights for strategy adjustments. "League of Legends Matchup Calculator" serves as a resource for new players looking to gain a slight competitive edge, allowing them to make informed decisions on champion picks and bans. Whether preparing for ranked play, tournaments, or casual games with friends, this web application is a great tool for any League of Legends player aiming to enhance their understanding of team dynamics and increase their win rate.

## Installations

Within the Google Cloud Platform vm, the following commands need to be run

```
sudo su
apt-get update
apt-get install nodejs
apt-get install npm
mkdir myproj
cd myproj
npm init
npm install express --save
npm install -g express-generator
npx express --view=ejs
npm install
npm install mysql2 --save
npm install body-parser --save
npm install path --save
nano server.js

```


## Running Project

The project can only run within the Google Cloud Platform (this is because the database is stored on the Google Cloud + for some reason the run command won't work on and local ide)

1) Go to Google Platform Cloud
2) Go to "SQL" -> Click "Connect to VM" on the desired SQL database
3) Go to "Compute Engine" -> Click on "VM Instances" -> Start the VM
4) While in "VM Instances," click on "SSH" located under "Connect" 
5) cd into the "lol-proj" (may have to first call "sudo su" to access correct directory)
6) then run the following command to turn on server

```
nano server.js
```

7) Copy the External IP to display the project (can be found in the VM Instances or on terminal after running "nano server.js"

Following in these steps will let you be able to run this application

