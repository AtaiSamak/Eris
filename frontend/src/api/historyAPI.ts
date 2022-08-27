import axios from "axios";

export default class HistoryAPI {
	static getResource(ids: string[]) {
		return axios({
			method: "POST",
			data: {
				ids,
			},
			url: "http://localhost:5010/resources",
		});
	}

	static getEvents() {
		return axios({
			method: "POST",
			url: "http://localhost:5010/events",
		});
	}
}
