import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFile } from "../utils";
import { apiOne } from "./RTKQuery";
export enum LoadingState {
    loading = 'loading',
    true = 'true',
    false = 'false'
}

interface State {
    var1: string,
    isLoggedIn: LoadingState,
    filesHolder: string[]
}

const initialState: State = {
    isLoggedIn: LoadingState.loading,
    var1: '',
    filesHolder: []
}

export const slice1 = createSlice({
    name: 'slice1',
    initialState,
    reducers: {
        setDummy(state, action: PayloadAction<any>) {
            state.var1 = 'dummy data'
        },
        setUserLogState(state, action: PayloadAction<LoadingState>) {
            state.isLoggedIn = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(apiOne.endpoints.uploadFile2.matchFulfilled, (state, action: any) => {
            // state.filesHolder.push(action.payload.data._id)
        })
    }
})