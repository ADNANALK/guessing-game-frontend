import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useWebSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io('http://localhost:4000'); // Adjust the URL if your backend is running on a different port or domain
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    return socket;
};

export default useWebSocket;
