import { useEffect, useRef, useState } from "react";
import { FIELD } from "../../entitites/Field/Field";
import Cell from "../Cell/Cell";
import styles from "./Game.module.scss";
import type { ICell } from "../../types/ICell";
import { initializeBoard } from "../../logic/initializeBoard";
import { getPossibleMoves } from "../../logic/getPossibleMoves";
import { move } from "../../logic/move";
import { ModalTransformating } from "../ModalTransformating/ModalTransformating";
import { Pieces } from "../../entitites/Pieces/Pieces";
import { getPieceFromCell } from "../../logic/helpers/getPieceFromCell";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { changeBlackLongCastleRight, changeBlackShortCastleRight, changeWhiteLongCastleRight, changeWhiteShortCastleRight } from "../../store/slices/castleSlice";
import { useLocation } from "react-router-dom";
import { useWebSocket } from "../WebSocketProvider/WebSocketProvider";
import { Board } from "../Board/Board";

export type IField = ICell[][];

interface IWSMessage {
    type: "connect" | "game_created" | "create" | "move";
    payload: any;
}

interface IPlayer {
    id: number;
    color: number;
}

export default function Game() {
    const [field, setField] = useState<IField>(initializeBoard(FIELD));
    const [selectedPiece, setSelectedPiece] = useState<ICell | null>(null);
    const [possibleMoves, setPossibleMoves] = useState<ICell[]>([]);
    const [isPawnTransformating, setIsPawnTransformating] = useState<number>(0);
    const [turn, setTurn] = useState<boolean>(true);
    // const [enemyId, setEnemyId] = useState<number | null>();
    // const [socket, setSocket] = useState<WebSocket>();
    // const [gameId, setGameId] = useState<number | null>();

    // const playerRef = useRef<IPlayer | null>(null);

    const socket = useWebSocket();

    const dispatch = useAppDispatch();
    const { id: playerId, color: playerColor } = useAppSelector((state) => state.player);

    const location = useLocation();

    const { gameId, enemyId } = location.state || {};

    // const navigate = useNavigate();

    const handleTransformate = (pieceName: string) => {
        const pawn = Pieces.find((pc) => pc.id === isPawnTransformating);
        if (pawn) {
            pawn.name = pieceName;
        }
        setIsPawnTransformating(0);
    };

    const handleCellClick = (cell: ICell) => {
        console.log(cell.x, cell.y, cell.pieceId)
        if (Number(turn) === playerColor) {
            const cellToMove = possibleMoves.find((el) => el.id === cell.id);
            if (cellToMove) {
                const newField = move(cellToMove, selectedPiece, field, setIsPawnTransformating, setTurn);
                setField(newField);
                const piece = getPieceFromCell(cell);
                if (piece) {
                    if (piece.id === 0) {
                        dispatch(changeBlackLongCastleRight(false));
                    }
                    if (piece.id === 7) {
                        dispatch(changeBlackShortCastleRight(false));
                    }
                    if (piece.id === 16) {
                        dispatch(changeWhiteLongCastleRight(false));
                    }
                    if (piece.id === 23) {
                        dispatch(changeWhiteShortCastleRight(false));
                    }

                    if (piece.name === "king") {
                        if (piece.color) {
                            dispatch(changeWhiteLongCastleRight(false));
                            dispatch(changeWhiteShortCastleRight(false));
                        } else {
                            dispatch(changeBlackLongCastleRight(false));
                            dispatch(changeBlackShortCastleRight(false));
                        }
                    }
                }

                socket?.send(
                    JSON.stringify({
                        type: "move",
                        payload: {
                            gameId: gameId,
                            field: newField,
                            turn: !turn,
                            enemyId: enemyId,
                        },
                    })
                );

                setSelectedPiece(null);
                setPossibleMoves([]);
                return;
            }

            if (cell.pieceId && !possibleMoves.length) {
                setSelectedPiece(cell);
                const moves = getPossibleMoves(cell, field, turn);
                setPossibleMoves(moves);
            } else {
                if (selectedPiece) {
                    //////
                    setSelectedPiece(null);
                    setPossibleMoves([]);
                }
            }
        }
    };

    useEffect(() => {
        if (!socket) return;

        const handleMessage = (event: MessageEvent) => {
            const msg: IWSMessage = JSON.parse(event.data);
            console.log(msg);

            switch (msg.type) {
                case "move":
                    if (playerId === msg.payload.playerId) {
                        setField(msg.payload.field);
                        setTurn(msg.payload.turn);
                    }
                    break;
            }
        };
        socket.addEventListener("message", handleMessage);

        return () => {
            socket.removeEventListener("message", handleMessage);
        };
    }, [socket, playerId]);

    if (playerId === undefined || playerColor === undefined) {
        return <div>Loading player data...</div>;
    }

    return (
        <>
            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <Board field={field} possibleMoves={possibleMoves} handleCellClick={handleCellClick} handleTransformate={handleTransformate} isPawnTransformating={isPawnTransformating}/>
                <div style={{display: 'flex', flexDirection: 'column', height: '90vh', alignItems: 'center', justifyContent: 'space-between'}}>
                    <h1>Ход {turn ? "белых" : "черных"}</h1>
                    <div style={{fontSize: 26}}>
                        Your id: {playerId}
                        <br />
                        Enemy id: {enemyId}
                        <br />
                        Game id: {gameId}
                        <br />
                        Your color: {playerColor}
                    </div>
                </div>
            </div>
            
        </>
    );
}
