// Node modules
const LCUConnector = require('lcu-connector');
const connector = new LCUConnector();

// Local modules
const mApi = require('./modules/api');
const mSummoner = require('./modules/summoner');
const mDom = require('./modules/dom');
let dom = new mDom();
let api;
let summoner;

var clientFound = false;
var oneAction = false;

connector.on('connect', (data) => {
    console.log(data);

    api = new mApi(data.protocol, data.address, data.port, data.username, data.password);

    var checkLogged = setInterval(() => {
        api.call("GET", "logged", undefined, (data) => {
            if (data.state == "SUCCEEDED") {
                summoner = new mSummoner();
                if (summoner.updateSummoner(api)) {
                    clientFound = true;
                    clearInterval(checkLogged);
                }
            }
        });
    }, 1000);
});

connector.on("disconnect", () => {
    clientFound = false;
});

connector.start();

const all = () => {
    dom.updateProfile(summoner);
    dom.addAramEvent(api);
    dom.addAutoAcceptEvent(api);
    dom.addStatusEvent(api);
    dom.addStatusTextEvent(api);
    dom.saveIcon(api);
    dom.getMatchHistory(summoner, api);
}

window.addEventListener('DOMContentLoaded', () => {
    var updateProfile = false;
    var wait = setInterval(() => {
        if (clientFound) {
            dom.removeLoader();

            if (!oneAction) {
                all();
                oneAction = true;
            }

            if (!updateProfile) {
                updateProfile = setInterval(() => {
                    summoner.updateSummoner(api);
                    dom.updateProfile(summoner);
                }, 30000);
            }
        } else {
            dom.addLoader();
            oneAction = false;
            clearInterval(updateProfile);
            updateProfile = false;
        }
    }, 1000);
});

