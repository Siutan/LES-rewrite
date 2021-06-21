const axios = require('axios');


module.exports = class LeagueSession {
	constructor(protocol, address, port, username, password) {
		this.protocol = protocol;
		this.address = address;
		this.port = port;
		this.username = username;
		this.password = password;
		this.authentication = new Buffer(`${username}:${password}`).toString('base64');
	}

	async get(path, params = {}) {
		try {
			return await axios.get(`${self.protocol}://${self.address}:${self.port}${path}`, {
				headers: {"Authorization": `Basic ${self.authentication}`},
				params: params
			})
		} catch (e) {
			throw e;
		}
	}

	async post(path, params = {}) {
		try {
			return await axios.post(`${self.protocol}://127.0.0.1:${self.port}${path}`, {
				headers: {"Authorization": `Basic ${self.authentication}`},
				params: params
			})
		} catch (e) {
			throw e;
		}
	}

	async put(path, params = {}) {
		try {
			return await axios.put(`${self.protocol}://127.0.0.1:${self.port}${path}`, {
				headers: {"Authorization": `Basic ${self.authentication}`},
				params: params
			})
		} catch (e) {
			throw e;
		}
	}

	async patch(path, params = {}) {
		try {
			return await axios.patch(`${self.protocol}://127.0.0.1:${self.port}${path}`, {
				headers: {"Authorization": `Basic ${self.authentication}`},
				params: params
			})
		} catch (e) {
			throw e;
		}
	}

	async head(path, params = {}) {
		try {
			return await axios.head(`${self.protocol}://127.0.0.1:${self.port}${path}`, {
				headers: {"Authorization": `Basic ${self.authentication}`},
				params: params
			})
		} catch (e) {
			throw e;
		}
	}

}
