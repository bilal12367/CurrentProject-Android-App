import { useCallback, useEffect, useRef, useState } from "react"
import { IMessage } from "../utils"
import { useSocket } from "../context/SocketContext";
import { useLazyGetRequestChatQuery } from "../store/RTKQuery";
import { useFocusEffect } from "@react-navigation/native";
import { AppState, AppStateEvent, AppStateStatus, NativeEventSubscription } from "react-native";

interface IUserRoomHook {
    roomId: String
}

type TAppState = "FOREGROUND" | "BACKGROUND"

export const useRoomHook = ({ roomId }: IUserRoomHook) => {
    const [messageList, setMessageList] = useState<IMessage[]>([]);
    const [user, setUser] = useState<String>("");
    const { getSocket } = useSocket();
    const socket = getSocket();
    const [appState, setAppState] = AppState.currentState;
    const _handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
            socket.emit("join_room", { roomId })
            socket.on("init_messages", (data: { userId: String, messages: IMessage[] }) => {
                setMessageList(data.messages);
                setUser(data.userId);
            })
        }
    }
    useEffect(() => {
        socket.emit("join_room", { roomId })
        socket.on("init_messages", (data: { userId: String, messages: IMessage[] }) => {
            setMessageList(data.messages);
            setUser(data.userId);
        })
        const listener = AppState.addEventListener('change', _handleAppStateChange);
        return () => {
            listener.remove();
            socket.emit("leave_room", { roomId })
            socket.off("init_messages")
        }
    }, [roomId])

    useEffect(() => {
        socket.on("message", (data: IMessage) => {
            setMessageList([...messageList, data]);
        })
        return () => {
            socket.off("message")
        }
    }, [messageList])

    return { messageList, user, isSuccess: true }
}