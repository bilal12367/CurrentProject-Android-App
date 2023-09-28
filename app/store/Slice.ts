import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DiscordPageState, IFile } from "../utils";
import { apiOne } from "./RTKQuery";
export enum LoadingState {
    loading = 'loading',
    true = 'true',
    false = 'false'
}

interface State {
    var1: string,
    isLoggedIn: LoadingState,
    filesHolder: string[],
    orgList: string[],
    isTabbarShown: Boolean,
    discordPageState: DiscordPageState
}

const initialState: State = {
    isLoggedIn: LoadingState.loading,
    var1: '',
    filesHolder: [],
    orgList: [],
    isTabbarShown: true,
    discordPageState: DiscordPageState.Chat
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
        },
        setTabState(state, action: PayloadAction<Boolean>){
            state.isTabbarShown = action.payload
        },
        setDiscordPageState(state, action: PayloadAction<DiscordPageState>){
            state.discordPageState = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(apiOne.endpoints.uploadFile2.matchFulfilled, (state, action: any) => {
            // state.filesHolder.push(action.payload.data._id)
        }).addMatcher(apiOne.endpoints.getOrgList.matchFulfilled, (state, action: any) => {
            // console.log('payload:',action.payload)
            state.orgList = action.payload.orgs.map((org: any) => org._id)
        })
    }
})