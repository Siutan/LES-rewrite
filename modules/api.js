const request = require('request');

class routes {
    constructor(protocol, address, port, user, pass) {
        this.apiUrls = {
            "logged": "/lol-login/v1/session", // are you loggin in?
            "currentSummoner": "/lol-summoner/v1/current-summoner", // level, nickname and xp for current summoner
            "ownedChampions": "/lol-champions/v1/owned-champions-minimal", // list of owned champions
            "gamePhase": "/lol-gameflow/v1/gameflow-phase", // None, Matchmaking, ReadyCheck, ChampSelect, InProgress
            "acceptMatch": "/lol-matchmaking/v1/ready-check/accept", // auto accept endpoint
            "me": "/lol-chat/v1/me", // chat endpoint
            // DONT USE THIS "aramBoost": '/lol-login/v1/session/invoke?destination=lcdsServiceProxy&method=call&args=["","teambuilder-draft","activateBattleBoostV1",""]',
            "wallet": "/lol-store/v1/wallet", // blue essence and rp endpoint
            "loot": "/lol-loot/v2/player-loot-map", // loot endpoint
			"region": "/riotclient/get_region_locale", // region endpoint
			"matchHistory": "/lol-career-stats/v1/summoner-games/{puuid}" // Get games of logged in summoner
        }

        this.protocol = this.protocol || protocol;
        this.address = this.address || address;
        this.port = this.port || port;
        this.user = this.user || user;
        this.pass = this.pass || pass;

        this.createBaseUrl();
        this.createAuthHeader();
    }

    createBaseUrl() {
        this.baseUrl = `${this.protocol}://${this.address}:${this.port}`;
    }

    createAuthHeader() {
        this.authHeader = `Basic ${Buffer.from(`${this.user}:${this.pass}`).toString('base64')}`;
    }

    getGameVersion() {
        return this.gameVersion;
    }

    getAuthHeader() {
        return this.authHeader;
    }

    getBaseUrl() {
        return this.baseUrl;
    }

    getApi(name) {
        return this.apiUrls[name];
    }

    getFullRoute(name) {
        return this.getBaseUrl() + this.getApi(name);
    }

    call(method, api, args = undefined, callback) {
        let options = {
            url: this.getFullRoute(api),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.getAuthHeader()
            },
            "rejectUnauthorized": false,
            ...args
        }
        switch(method) {
            case "GET": {
                request.get(options, (_, __, back) => {
                    back = JSON.parse(back);

                    if(typeof callback == "function") {
                        if(!back) {
                            return callback(false);
                        }
                        callback(back);
                    }
                });
            }
            case "PUT": {
                request.put(options);
            }
            case "POST": {
                request.post(options);
            }
        }
    }

	urlCall(method, url, args = undefined, callback) {
		let options = {
			url: this.getBaseUrl() + url,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: this.getAuthHeader()
			},
			"rejectUnauthorized": false,
			...args
		}
		switch(method) {
			case "GET": {
				request.get(options, (_, __, back) => {
					back = JSON.parse(back);

					if(typeof callback == "function") {
						if(!back) {
							return callback(false);
						}
						callback(back);
					}
				});
			}
			case "PUT": {
				request.put(options);
			}
			case "POST": {
				request.post(options);
			}
		}
	}
}

module.exports = routes
