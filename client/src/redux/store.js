import { combineReducers, configureStore } from '@reduxjs/toolkit'
import useReducer from './user/userSlice';
import {persistReducer , persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';

//we can combine multiple reducers here , we have just user reducer now.
const rootReducer = combineReducers({ user : useReducer});

//it is setting the name of the key in the local storage , version and storage.
const persistConfig = {
    key:'root',
    storage,
    version : 1,
};

const persistedReducer =  persistReducer(persistConfig , rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false,
        }),
});

//this persistor will make the store persist
export const persistor  = persistStore(store); 