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
import { useAppDispatch } from "../../store/store";
import { changeBlackLongCastleRight, changeBlackShortCastleRight, changeWhiteLongCastleRight, changeWhiteShortCastleRight } from "../../store/slices/castleSlice";

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
    const [player, setPlayer] = useState<IPlayer>();
    const [enemyId, setEnemyId] = useState<number | null>();
    const [socket, setSocket] = useState<WebSocket>();
    const [gameId, setGameId] = useState<number | null>();

    const playerRef = useRef<IPlayer | null>(null);

    const dispatch = useAppDispatch();

    // const navigate = useNavigate();

    const handleTransformate = (pieceName: string) => {
        const pawn = Pieces.find((pc) => pc.id === isPawnTransformating);
        if (pawn) {
            pawn.name = pieceName;
        }
        setIsPawnTransformating(0);
    };

    const handleCellClick = (cell: ICell) => {
        if (Number(turn) === player?.color) {
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
        const ws = new WebSocket("ws://localhost:8080");

        setSocket(ws);

        ws.onopen = () => {
            console.log("Connected to WebSocket server");
        };

        ws.onmessage = (event) => {
            const msg: IWSMessage = JSON.parse(event.data);
            console.log(msg);

            switch (msg.type) {
                case "connect":
                    setPlayer({ id: msg.payload.player.id, color: msg.payload.player.color });
                    playerRef.current = { id: msg.payload.player.id, color: msg.payload.player.color };
                    break;
                case "game_created":
                    // setGameId(msg.payload.gameId);

                    // navigate(`/game/${msg.payload.gameId}`); // Redirect to game session
                    msg.payload.players.forEach((element: number) => {
                        if (element !== playerRef.current?.id) {
                            setEnemyId(element);
                        }
                    });

                    setGameId(msg.payload.gameId);

                    break;
                case "create":
                    ws.send(
                        JSON.stringify({
                            type: "create",
                            payload: {
                                field,
                                turn,
                            },
                        })
                    );
                    break;
                case "move":
                    
                    if (playerRef.current?.id === msg.payload.playerId) {
                        setField(msg.payload.field);
                        setTurn(msg.payload.turn);
                    }
                    break;
            }
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <>
            <div style={{ display: "flex" }}>
                <div className={styles.Game}>
                    {field.map((row) => {
                        return row.map((cell) => {
                            const isPossibleMove = possibleMoves.some((move) => move.id === cell.id);
                            return (
                                <Cell
                                    key={cell.id}
                                    id={cell.id}
                                    x={cell.x}
                                    y={cell.y}
                                    color={cell.color}
                                    pieceId={cell.pieceId}
                                    onClick={() => handleCellClick(cell)}
                                    highlight={isPossibleMove}
                                />
                            );
                        });
                    })}

                    {isPawnTransformating ? <ModalTransformating onClick={handleTransformate} /> : null}
                </div>
                <div>
                    Your id: {player?.id}
                    <br />
                    Enemy id: {enemyId}
                    <br />
                    Game id: {gameId}
                    <br />
                    You playing for {playerRef.current?.color === 1 ? "white" : "black"}
                </div>
            </div>
            <h1>Ход {turn ? "белых" : "черных"}</h1>
        </>
    );
}
