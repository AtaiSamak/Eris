import { combineReducers, Action, AnyAction } from "@reduxjs/toolkit";
import eventsReducer from "./history/historyEventsSlice";
import resourcesReducer from "./history/historyResourcesSlice";

const appReducers = combineReducers({
	events: eventsReducer,
	resources: resourcesReducer,
});

type AppReducer = ReturnType<typeof appReducers>;

const rootReducer = (state: AppReducer | undefined, action: Action) => {
	if (action.type === "reset") state = undefined;
	return appReducers(state, action);
};

export const rootActions = {
	reset() {
		return {
			type: "reset",
		};
	},
};
export default rootReducer;
