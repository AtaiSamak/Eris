import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import eventsReducer from "./history/historyEventsSlice";
import createSagaMiddleware from "redux-saga";
import { historySagaWatcher } from "./history/historySagas";
import resourcesReducer from "./history/historyResourcesSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		events: eventsReducer,
		resources: resourcesReducer,
	},
	middleware: [sagaMiddleware],
});

sagaMiddleware.run(historySagaWatcher);

export type RootState = ReturnType<typeof store.getState>;
export default store;
