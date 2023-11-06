import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { dataSlice, slice1 } from "./Slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { apiOne } from "./RTKQuery";


export const RootReducer = combineReducers({
    [apiOne.reducerPath]: apiOne.reducer,
    reducer: slice1.reducer,
    dataReducer: dataSlice.reducer
})

export const store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(apiOne.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const actions = { slice1: slice1.actions, dataSlice: dataSlice.actions }
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector