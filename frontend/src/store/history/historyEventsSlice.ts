import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Event } from "../../types/history";

type State = {
	fetching: boolean;
	items: null | Event[];
	error: null | AxiosError;
};

const initialState: State = {
	fetching: false,
	items: null,
	error: null,
};

const historyEventsSlice = createSlice({
	name: "historyEvents",
	initialState,
	reducers: {
		fetchEvents(state) {
			state.fetching = true;
		},
		success(state, action) {
			state.fetching = false;
			state.items = action.payload.items;
		},
		failure(state, action) {
			state.fetching = false;
			state.items = null;
			state.error = action.payload.error;
		},
	},
});

export const historyEventsActions = historyEventsSlice.actions;
export default historyEventsSlice.reducer;
