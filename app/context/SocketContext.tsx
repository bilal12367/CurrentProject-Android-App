import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { useAppSelector } from "../store";


const SocketContext = createContext<any | null>(null);

export const SocketProvider = ({ children }) => {
    // const { server_url } = useAuth()
    const [socket, setSocket] = useState<any>();

    useEffect(() => {
        // setSocket(io('http://'+server_url))
        // const socket = io('http://'+server_url)
        // socket.on("connect_error" ,(err) => {
        //     console.log("Error: ",JSON.stringify(err))
        // })
        // socket.on("connect",() => {
        //     console.log("Connected Id: ",socket.id)
        // })
        // console.log(socket.id)
    }, [])

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