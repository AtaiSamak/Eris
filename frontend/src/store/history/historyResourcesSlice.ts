import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Resource } from "../../types/history";

type InitialState = {
	fetching: boolean;
	items: Resource[];
	error: null | AxiosError | Error;
	itemsInterval: [number, number];
};

const initialState: InitialState = {
	fetching: false,
	items: [],
	error: null,
	itemsInterval: [0, 0],
};

const historyResourcesSlice = createSlice({
	name: "historyResources",
	initialState,
	reducers: {
		fetchResources(state) {
			state.fetching = true;
			state.itemsInterval = [
				state.itemsInterval[1],
				state.itemsInterval[1] + 15,
			];
		},
		succes(state, action) {
			state.fetching = false;
			state.items = [...state.items, ...action.payload.items];
		},
		failure(state, action) {
			state.fetching = false;
			state.error = action.payload.error;
		},
	},
});

export const historyResourcesActions = historyResourcesSlice.actions;
export default historyResourcesSlice.reducer;
