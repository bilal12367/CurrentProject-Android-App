import { ChildContextProvider, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { useAppSelector } from "../store";
import { ApiContext } from "@reduxjs/toolkit/dist/query/apiTypes";
import { Server_Url } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetMyDetailsMutation } from "../store/RTKQuery";


const SocketContext = createContext<any | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    // const { server_url } = useAuth()
    const [reqMyDetails, respMyDetails] = useGetMyDetailsMutation();
    const [socket, setSocket] = useState<any>();

    const connectWithToken = async ( userId: String) => {
        
        setSocket(io(Server_Url, {
            auth: {
                userId
            },

        }))
    }
    useEffect(() => {
        if (respMyDetails.isUninitialized) {
            reqMyDetails('')
        }
        if (socket == undefined) {
            if (respMyDetails.isSuccess) {
                connectWithToken(respMyDetails.data._id)
            }
        }
        console.log("Invoked")
        // const socket = io('http://'+server_url)
        socket?.on("connect_error", (err: any) => {
        })
    }, [socket,respMyDetails])

    const getSocket = () => {
        return socket;
    }

    return (
        <SocketContext.Provider value={{ socket, getSocket }}>
            {children}
        </SocketContext.Provider>
    )
}


export const useSocket = () => {
    return useContext(SocketContext)
}