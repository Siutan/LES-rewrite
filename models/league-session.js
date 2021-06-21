const axios = require('axios')


export default class LeagueSession {
	constructor(processName, processId, port, password, protocol) {
		this.processName = processName;
		this.proccessId = processId;
		this.port = port;
		this.password = password;
		this.protocol = protocol;

	}

	async get(path, params = {}) {
		try {
			return await axios.get(`${self.protocol}://127.0.0.1:${self.port}${path}`, {
				headers: {"Authorization": `Basic ${self.password}`},
				params: params
			})
		} catch (e) {
			throw e;
		}
	}

	async post(path, params = {}) {
		try {
			return await axios.post(`${self.protocol}://127.0.0.1:${self.port}${path}`, {
				headers: {"Authorization": `Basic ${self.password}`},
				params: params
			})
		} catch (e) {
			throw e;
		}
	}

	async put(path, params = {}) {
		try {
			return await axios.put(`${self.protocol}://127.0.0.1:${self.port}${path}`, {
				headers: {"Authorization": `Basic ${self.password}`},
				params: params
			})
		} catch (e) {
			throw e;
		}
	}

	async patch(path, params = {}) {
		try {
			return await axios.patch(`${self.protocol}://127.0.0.1:${self.port}${path}`, {
				headers: {"Authorization": `Basic ${self.password}`},
				params: params
			})
		} catch (e) {
			throw e;
		}
	}

	async head(path, params = {}) {
		try {
			return await axios.head(`${self.protocol}://127.0.0.1:${self.port}${path}`, {
				headers: {"Authorization": `Basic ${self.password}`},
				params: params
			})
		} catch (e) {
			throw e;
		}
	}



}
