const request = require('request');
const jp = require('jsonpath');
const champions = require('../static/data/champions.json')

class change {
  constructor() {
      this.autoacceptInt = false;
  }

  updateProfile(summoner) {
    document.getElementById('profileImg').src = `http://ddragon.leagueoflegends.com/cdn/11.12.1/img/profileicon/${summoner.getIcon()}.png`;
    document.getElementById('profileUser').innerHTML = summoner.getNick();
    document.getElementById('profileLevel').innerHTML = summoner.getLevel();
    document.getElementById('profileNextXp').innerHTML = summoner.getXPNext();
    document.getElementById('profileLastXp').innerHTML = summoner.getXPLast();
    document.getElementById('be').innerHTML = summoner.getBE();
    document.getElementById('rp').innerHTML = summoner.getRP();
    document.getElementById('oe').innerHTML = summoner.getOE();
    document.getElementById('rg').innerHTML = summoner.getRG();
    document.getElementById('ch').innerHTML = summoner.getCH();
    document.getElementById('ke').innerHTML = summoner.getKE();
    document.getElementById('profileXpLine').style = "width: " + (summoner.getXPLast() / summoner.getXPNext()) * 100 + "%";
    document.getElementById('statuss').value = summoner.getStatus();
  }

  // Testing Purposes Only
  addAramEvent(api) {
    document.getElementById('aramBoost').addEventListener("click", () => {
        api.call("POST", "aramBoost");
    });
  }

  addAutoAcceptEvent(api) {
    document.getElementById('autoaccept').addEventListener("change", (e) => {
        if (e.target.checked) {
            if (this.autoacceptInt) {
                clearInterval(this.autoacceptInt);
            }
            this.autoacceptInt = setInterval(() => {
                let req = api.call("GET", "gamePhase");
                if(req) {
                    if(req == "ReadyCheck") {
                        api.cally("POST", "acceptMatch");
                    }
                }
            }, 1000);
        } else {
            clearInterval(this.autoacceptInt);
        }
    });
  }

  addStatusEvent(api) {
    document.getElementById('saveavail').addEventListener("click", () => {
        let ppp = document.getElementById('availability').value;

        api.call("PUT", "me", {json: {"availability": ppp}});
    });
  }

  addStatusTextEvent(api) {
    document.getElementById('savestatus').addEventListener("click", () => {
        let ppp = document.getElementById('statuss').value;

        api.call("PUT", "me", {json: {"statusMessage": ppp}});
    });
  }

  saveIcon(api) {
    document.getElementById('saveicon').addEventListener("click", () => {
        let ppp = document.getElementById('iconn').value;

        api.call("PUT", "me", {json: {"icon": ppp}});
    });
  }

  // converts milliseconds to minutes & seconds cuz riot doesnt like simplicity
  millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

  getMatchHistory(summoner, api) {
  		api.urlCall("GET", "/lol-career-stats/v1/summoner-games/" + summoner.getPuuid(), null, (data) => {
        if (index < 0) {
          console.log('out of bounds')
        } else {
          // variables
          var a = document.getElementById('matches')
          var winLoss = "";
          var victoryCSS = "";
          var champ = "";
          var role;
          console.log(data)
          for (var index = data.length - 1; index > data.length - 20; index--) {
            
            // more variables
            var get_champion = jp.query(data, `$.${index}.championId`) // Champion played
            var get_victory = jp.query(data, `$.${index}.stats["CareerStats.js"].victory`) // win or loss
            var get_role = jp.query(data, `$.${index}.lane`) // lane assignment
            var get_kill = jp.query(data, `$.${index}.stats["CareerStats.js"].kills`) // total kills
            var get_death = jp.query(data, `$.${index}.stats["CareerStats.js"].deaths`) // total deaths
            var get_assist = jp.query(data, `$.${index}.stats["CareerStats.js"].assists`) // total assists
            var get_creeps = jp.query(data, `$.${index}.stats["CareerStats.js"].csScore`) // total cs
            var get_gold = jp.query(data, `$.${index}.stats["CareerStats.js"].goldEarned`) // total gold earned
            var get_gameTime = jp.query(data, `$.${index}.stats["CareerStats.js"].timePlayed`) // game time in milliseconds (based on your client)
          
            // idk why i did this i dont think i needed it
            let championList = champions.data

            // searches champion.json for a matching name to the id from get_champion
            for (var i in championList) {
              if (championList[i].key == get_champion) {
                champ = championList[i].id
              }
            }

            // makes 0 or 1 into understandable text
            if (get_victory != '0') { // 1 = win, 0 = loss
              winLoss = "WIN"
              victoryCSS = "match-victory"
            } else {
              winLoss = "LOSS"
              victoryCSS = "match-defeat"

            }

            // lane assignments
            if (get_role == "TOP") {
              role = "Position_Gold-Tot.png"
            } else if (get_role == "JUNGLE") {
              role = "Position_Gold-Jungle.png"
            } else if (get_role == "MID") {
              role = "Position_Gold-Mid.png"
            } else if (get_role == "BOTTOM") {
              role = "Position_Gold-Bot.png"
            }

            // match history card thats being pushed to the DOM
            var tag = `<div class="match-list--match ${victoryCSS}"><div class="left"> <div class="played"> <div class="position"> <div class="position--inner"> <img id="posImg" src="./static/icons/positions/${role}" height="19" width="19"> </div> </div> <div class="champion"> <div class="champion--inner" style="background-image: url(http://ddragon.leagueoflegends.com/cdn/11.13.1/img/champion/${champ}.png);"> <img src="http://ddragon.leagueoflegends.com/cdn/11.13.1/img/champion/${champ}.png" alt=""> </div> </div> </div> <div class="info"> <div class="result">${winLoss}</div> <div class="queueType">Ranked Solo/Duo</div> <div class="time">${this.millisToMinutesAndSeconds(get_gameTime)}</div> </div> <div class="scoreboard"> <div class="items"> <div class="item"> <img src="http://ddragon.leagueoflegends.com/cdn/11.13.1/img/item/6672.png" alt=""> </div> <div class="item"> <img src="http://ddragon.leagueoflegends.com/cdn/11.13.1/img/item/3006.png" alt=""> </div> <div class="item"> <img src="http://ddragon.leagueoflegends.com/cdn/11.13.1/img/item/3046.png" alt=""> </div> <div class="item"> <img src="http://ddragon.leagueoflegends.com/cdn/11.13.1/img/item/3031.png" alt=""> </div> <div class="item"> <img src="http://ddragon.leagueoflegends.com/cdn/11.13.1/img/item/3036.png" alt=""> </div> <div class="item"> <img src="http://ddragon.leagueoflegends.com/cdn/11.13.1/img/item/3033.png" alt=""> </div> <div class="item"> <img src="http://ddragon.leagueoflegends.com/cdn/11.13.1/img/item/2140.png" alt=""> </div> </div> <div class="score"> <span class="score--kda">${get_kill} / ${get_death} / ${get_assist}</span> <span class="score--cs">${get_creeps}</span> <span class="score--gold">${get_gold}</span> </div> </div> </div>  </div>`

            // i should probably rename this variable
            a.innerHTML = a.innerHTML + tag + '</br>' // please this new line (</br>) is very important dont lose it

          }
        }
        
		})
  }

  removeLoader() {
    document.getElementById('loading').style = "display: none";
    document.getElementById('ploading').style = "display: none";
    document.getElementById('container').style = "";
    document.getElementById('containerMatchHistory').style = "";
  }

  addLoader() {
    document.getElementById('loading').style = "";
    document.getElementById('ploading').style = "";
    document.getElementById('container').style = "display: none";
    document.getElementById('containerMatchHistory').style = "display: none";
  }
}

module.exports = change;
