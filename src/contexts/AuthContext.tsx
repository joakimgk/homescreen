import React, { PropsWithChildren, useContext, useState } from "react";

export interface BasicCredentials {
    username: string;
    password: string;
}

interface AuthProviderProps {
    isLoggedIn: boolean,
    login: (credentials: BasicCredentials) => void,
    credentials?: BasicCredentials
}

const AuthContext = React.createContext<AuthProviderProps>({
    isLoggedIn: false,
    login: () => { },
    credentials: undefined
})

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
    const [credentials, setCredentials] = useState<BasicCredentials>();

    const isLoggedIn = !!credentials;

    const login = (credentials: BasicCredentials) => {
        setCredentials(credentials);
    }

    const value = {
        isLoggedIn,
        login,
        credentials
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}