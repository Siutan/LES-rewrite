const axios = require('axios');
const ws = require("ws");


module.exports = class LeagueSession {
	constructor(protocol, address, port, username, password) {
		this.protocol = protocol;
		this.address = address;
		this.port = port;
		this.username = username;
		this.password = password;
		this.authentication = new Buffer(`${username}:${password}`).toString('base64');
		this.listen();
	}

	async get(path, params = {}) {
		try {
			return await axios.get(`${this.protocol}://${this.address}:${this.port}${path}`, {
				headers: {"Authorization": `Basic ${this.authentication}`},
				params: params
			})
		} catch (e) {
			throw e;
		}
	}

	async post(path, params = {}) {
		try {
			return await axios.post(`${this.protocol}://127.0.0.1:${this.port}${path}`, {
				headers: {"Authorization": `Basic ${this.authentication}`},
				params: params
			})
		} catch (e) {
			throw e;
		}
	}

	async put(path, params = {}) {
		try {
			return await axios.put(`${this.protocol}://127.0.0.1:${this.port}${path}`, {
				headers: {"Authorization": `Basic ${this.authentication}`},
				params: params
			})
		} catch (e) {
			throw e;
		}
	}

	async patch(path, params = {}) {
		try {
			return await axios.patch(`${this.protocol}://127.0.0.1:${this.port}${path}`, {
				headers: {"Authorization": `Basic ${this.authentication}`},
				params: params
			})
		} catch (e) {
			throw e;
		}
	}

	async head(path, params = {}) {
		try {
			return await axios.head(`${this.protocol}://127.0.0.1:${this.port}${path}`, {
				headers: {"Authorization": `Basic ${this.authentication}`},
				params: params
			})
		} catch (e) {
			throw e;
		}
	}

	listen() {
		console.log("Attempting to listen.")
		//Sketchy, Hopefully fix properly in future.
		process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
		let listener = new ws(`https://riot:${this.password}@127.0.0.1:${this.port}`, 'wamp', {});

		listener.on('open', () => {
			listener.send('[5, "OnJsonApiEvent"]')
		})

		listener.on("message", (data) => {
			console.log(data)
			console.log((JSON.parse(data.toString())));
		})
	}

}
