import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import user from "./userSlice";

const store = configureStore({
    reducer: {
        user
    },
    middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;