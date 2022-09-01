import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { historySagaWatcher } from "./history/historySagas";
import rootReducer from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: rootReducer,
	middleware: [sagaMiddleware],
});

sagaMiddleware.run(historySagaWatcher);

export type RootState = ReturnType<typeof store.getState>;
export default store;
