import { useEffect, useState } from "react";
import { FIELD } from "../../entitites/Field/Field";
import { initializeBoard } from "../../logic/initializeBoard";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../WebSocketProvider/WebSocketProvider";
import { store, useAppDispatch } from "../../store/store";
import { setPlayerColor, setPlayerId } from "../../store/slices/playerSlice";

export const Home = () => {
    const socket = useWebSocket();
    const [search, setSearch] = useState(false);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleFindGame = () => {
        setSearch((prev) => !prev);

        if (socket) {
            socket.send(JSON.stringify({ type: "search", payload: {} }));
        }
    };

    useEffect(() => {
        if (!socket) return;

        const handleMessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data);
            console.log("WebSocket message:", message);

            switch (message.type) {
                case "connect":
                    const { id, color } = message.payload.player;
                    console.log("Dispatching player data:", id, color);
                    dispatch(setPlayerId({ id }));
                    dispatch(setPlayerColor({ color }));
                    break;

                case "game_created":
                    
                    const currentPlayerId = store.getState().player.id;
                    const enemy = message.payload.players.find((id: number) => id !== currentPlayerId);

                    setSearch(false);
                    navigate(`/game/${message.payload.gameId}`, {
                        state: {
                            enemyId: enemy,
                            gameId: message.payload.gameId,
                        },
                    });
                    break;

                case "create":
                    socket.send(
                        JSON.stringify({
                            type: "create",
                            payload: {
                                field: initializeBoard(FIELD),
                                turn: true,
                            },
                        })
                    );
                    break;
            }
        };

        socket.addEventListener("message", handleMessage);

        return () => {
            socket.removeEventListener("message", handleMessage);
        };
    }, [socket, navigate]);

    return (
        <div>
            <input type="text" />
            {search ? <div>SEARCHING FOR THE OPPONENT....</div> : null}
            <button onClick={handleFindGame}>{search ? "stop" : "search"}</button>
        </div>
    );
};
