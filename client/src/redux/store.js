import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user/userSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

console.log("Before thunk import");
import { thunk } from 'redux-thunk';
console.log("After thunk import");

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(thunk),
})


export const persistor = persistStore(store)
