import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppDispatch, actions, useAppDispatch } from "../store"
import { LoadingState } from "../store/Slice"

export interface Message {
    _id: string,
    from: string,
    message: string,
    groupId?: string,
    requestId?: string,
    createdAt: string,
    to: string,
    updatedAt: string
}

export interface ICouncilMember {
    _id: string
    name: string
    profilePic: string
}

export interface IFile {
    name: string,
    uri: string,
    size: number,
    type: string
}

export type INotification = {
    __v: number
    _id: string
    createdAt: string
    org_id: {
      _id: string
      desc: string
      logo: string
      name: string
    }
    request_state: string
    request_type: string
    requested_to_user: string
    requested_user_id: {
      _id: string
      name: string,
      profilePic?: string
    }
    role_of_requested_user: string
    updatedAt: string
  }
  

export enum DiscordPageState {
    Drawer, Chat, Details
}

export const loadFromAsyncStorage = async (dispatch: AppDispatch) => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
        dispatch(actions.slice1.setUserLogState(LoadingState.true));
    } else {
        dispatch(actions.slice1.setUserLogState(LoadingState.false));
    }
}

// export const validateEmail = (email: string) => {
//     return String(email)
//         .toLowerCase()
//         .match(
//             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//         );
// };

export const validateEmail = (input: string) => {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex)) {
        return true;
    } else {
        return false;

    }

}


export const validatePassword = (pwd: string) => {

    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/.test(pwd)) {
        return true;
    } else {
        return false;
    }

}

export const addUniqueToArray = (arr: any[], attr: string, value: any) => {
    let temp = arr;
    let exists = false;
    temp.forEach((item) => {
        if (item[attr] == value[attr]) {
            exists = true
        }
    })

    if (!exists) {
        temp.push(value)
        return temp
    } else {
        return temp;
    }
}

export enum Screens {
    HOME = 'HOME',
    LOGIN = 'LOGIN',
    CREATEORG = 'CREATEORG',
    DASHBOARD = 'DASHBOARD',
    REGISTER = 'REGISTER',
    LOGO = 'LOGO',
    WELCOME = 'WELCOME',
    PROFILE = 'PROFILE'
}

export interface GetOrgResp {
    _id: string
    name: string
    desc: string
    leaders: User[]
    groups: Group[]
    admins: User[]
    bannerPics: any[]
    logo: string
}


export interface IMessage {
    _id: string
    groupId: string
    message: string
    files: any[]
    from: string
    createdAt: string
    updatedAt: string
    __v: number
}


export interface User {
    _id: string
    name: string
    profilePic: string
}

export interface Group {
    _id: string
    groupName: string
    state: string
    participants: User[]
}
