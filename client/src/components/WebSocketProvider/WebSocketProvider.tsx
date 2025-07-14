import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type WebSocketContextType = WebSocket | null;

const WebSocketContext = createContext<WebSocketContextType>(null);

interface WebSocketProviderProps {
    children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<WebSocketContextType>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        setSocket(ws);

    }, []);

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = (): WebSocketContextType => {
    return useContext(WebSocketContext);
};