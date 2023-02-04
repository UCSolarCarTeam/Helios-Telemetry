import { createContext, useContext, useState, ReactNode } from "react";
i

interface Props {
    children: ReactNode | ReactNode[]
}

interface IAppState {
    loading: boolean;
    error: boolean;
}

const appStateContext = createContext({});

export function PacketContextProvider({ children }: Props) {
    const [currentPacket, setCurrentPacket] = useState<IAppState>({ loading: false, error: false});

    return (
        <appStateContext.Provider value={{ currentPacket, setCurrentPacket }}>
            {children}
        </appStateContext.Provider>
    )
}

export function usePacket() {
    return useContext(appStateContext);
}
