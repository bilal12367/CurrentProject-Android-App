import { View, Text } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppDispatch, useAppSelector } from '../store'



interface AuthData {
    token: string,
    name: string,
    email: string
}
export interface AuthProviderType {
    loadFromAsyncStorage: () => void,
    authState: AuthData,
    setAuthState: () => void,
    signIn: (email: string, password: string) => void,
    signOut: () => void,
    signUp: (name: string, email: string, password: string) => void,
    loading: boolean,
    error: boolean
}

const AuthContext = React.createContext<AuthProviderType | null>(null)

export const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext) as AuthProviderType
}