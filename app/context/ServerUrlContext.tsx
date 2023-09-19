import React, { useContext, useState } from "react";

const ServerUrlContext = React.createContext({});

export const ServerUrlProvider = ({ children }) => {
    const [server_url, setServer_Url] = useState('')

    const setServerUrl = (url: string) => {
        setServer_Url(url);
    }


    return <ServerUrlContext.Provider value={{ server_url, setServerUrl }}>
        {children}
    </ServerUrlContext.Provider>
}


export const useServerUrlContext = () => {
    return useContext(ServerUrlContext);
}