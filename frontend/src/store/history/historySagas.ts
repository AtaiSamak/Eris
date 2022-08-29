import { AxiosResponse } from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import HistoryAPI from "../../api/historyAPI";
import { RootState } from "../store";
import { historyEventsActions } from "./historyEventsSlice";
import { historyResourcesActions } from "./historyResourcesSlice";
import { Event } from "../../types/history";

export function* historySagaWatcher(): any {
	yield takeLatest(historyEventsActions.fetchEvents().type, getEvents);
	yield takeLatest(historyResourcesActions.fetchResources().type, getResources);
}

function* getEvents(): any {
	try {
		const response: AxiosResponse = yield call(HistoryAPI.getEvents);
		yield put(historyEventsActions.success({ items: response.data.items }));
	} catch (error) {
		yield put(historyEventsActions.failure({ error }));
	}
}

function* getResources(): any {
	try {
		const state: RootState = yield select();
		const interval = state.resources.itemsInterval;
		if (!state.events.items || interval[0] >= state.events.items.length)
			throw Error("Not items");
		if (interval[1] > state.events.items.length)
			interval[1] = state.events.items.length;
		const ids = state.events.items
			?.slice(...interval)
			.map(({ id, resource }: Event) => `${resource}/${id}`);
		const response: AxiosResponse = yield call(HistoryAPI.getResource, ids);
		yield put(historyResourcesActions.succes({ items: response.data.items }));
	} catch (error) {
		yield put(historyResourcesActions.failure({ error }));
	}
}
