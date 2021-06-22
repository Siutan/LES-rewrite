const request = require('request');

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

  getMatchHistory(summoner, api) {
  	document.getElementById("containerMatchHistory").addEventListener("click", () => {
  		api.urlCall("GET", "/lol-career-stats/v1/summoner-games/" + summoner.getPuuid(), null, (data) => {
			console.log(data)
		})
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
