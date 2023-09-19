import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppDispatch, actions, useAppDispatch } from "../store"
import { LoadingState } from "../store/Slice"

export interface Message {
    _id: string,
    from: string,
    message: string,
    createdAt: string,
    to: string,
    updatedAt: string
}

export interface IFile {
    name: string,
    uri: string,
    size: number,
    type: string
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