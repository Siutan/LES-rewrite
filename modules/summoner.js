class summoner {
    constructor() {
        this.icon = "1"; // Summoner Icon
        this.nick = "Unnamed"; // Summoner Nickname
        this.level = 1; // SUmmoner Level
        this.xpnext = 1; // Xp Until Next Level
        this.xplast = 0; // Xp Since Last Level
        this.be = 0; // Blue Essence
        this.rp = 0; // Riot Points
        this.oe = 0; // Skins in loot
        this.rg = 0; // Gemstones
        this.ch = 0; // Chests
        this.ke = 0; // Chest Keys
		this.region = "NA1"
		this.puuid = ""
        this.status = "Status"; // Availability Status
    }

    getBE() {
        return this.be;
    }

    getRP() {
        return this.rp;
    }

    getIcon() {
        return this.icon;
    }

    getNick() {
        return this.nick;
    }

    getLevel() {
        return this.level;
    }

    getXPNext() {
        return this.xpnext;
    }

    getXPLast() {
        return this.xplast;
    }

    getOE() {
        return this.oe;
    }

    getRG() {
        return this.rg;
    }

    getKE() {
        return this.ke;
    }

    getCH() {
        return this.ch;
    }

    getStatus() {
        return this.status;
    }

    getPuuid() {
    	return this.puuid;
	}

    getRegion() {
    	return this.region
	}

    updateSummoner(api) {
        api.call("GET", "currentSummoner", undefined, (data) => {
            if(!data) { return false; }

            this.icon = data.profileIconId;
            this.nick = data.displayName;
            this.level = data.summonerLevel;
            this.xplast = data.xpSinceLastLevel;
            this.xpnext = data.xpUntilNextLevel;
        });

        api.call("GET", "me", undefined, (data) => {
            if(!data) { return false; }
            this.status = data.statusMessage;
            this.puuid = data.puuid;
        });

		api.call("GET", "region", undefined, (data) => {
			if(!data) { return false; }
			this.region = data.region;
		});

        api.call("GET", "wallet", undefined, (data) => {
            if(!data) { return false; }

            this.rp = data.rp;
            this.be = data.ip;
        });

        api.call("GET", "loot", undefined, (data) => {
            if(!data) { return false; }

            // Orange essence
            if(data.playerLoot.hasOwnProperty("CURRENCY_cosmetic")) {
                this.oe = data.playerLoot.CURRENCY_cosmetic.count;
            }

            // Keys
            if(data.playerLoot.hasOwnProperty("MATERIAL_key")) {
                this.ke = data.playerLoot.MATERIAL_key.count;
            }
        });

        return true;
    }
}

module.exports = summoner;
