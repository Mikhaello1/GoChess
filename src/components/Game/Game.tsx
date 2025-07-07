import { useEffect, useState } from "react";
import { FIELD } from "../../entitites/Field/Field";
import Cell from "../Cell/Cell";
import styles from "./Game.module.scss";
import type { ICell } from "../../types/ICell";
import { initializeBoard } from "../../logic/initializeBoard";
import { getPossibleMoves } from "../../logic/getPossibleMoves";
import { move } from "../../logic/move";
import { ModalTransformating } from "../ModalTransformating/ModalTransformating";
import { Pieces } from "../../entitites/Pieces/Pieces";
import { getPieceFromCell } from "../../logic/getPieceFromCell";

export type IField = ICell[][];

export default function Game() {
    const [field, setField] = useState<IField>(initializeBoard(FIELD));
    const [selectedPiece, setSelectedPiece] = useState<ICell | null>(null);
    const [possibleMoves, setPossibleMoves] = useState<ICell[]>([]);
    const [isPawnTransformating, setIsPawnTransformating] = useState<number>(0);
    const [turn, setTurn] = useState<boolean>(true);

    const handleTransformate = (pieceName: string) => {
        const pawn = Pieces.find(pc => pc.id === isPawnTransformating)
        if (pawn){
            pawn.name = pieceName;
        }
        setIsPawnTransformating(0)
    }

    const handleCellClick = (cell: ICell) => {
        const cellToMove = possibleMoves.find(el => el.id === cell.id)
            if(cellToMove){
                setField(move(cellToMove, selectedPiece, field, setIsPawnTransformating, setTurn)); 
                setSelectedPiece(null);
                setPossibleMoves([]);  
                return
            }

        if (cell.pieceId && !possibleMoves.length) {
            // const piece = getPieceFromCell(cell);
            console.log('click')
            setSelectedPiece(cell);
            const moves = getPossibleMoves(cell, field, turn); 
            setPossibleMoves(moves);
            
        } else {
            
            if (selectedPiece) {
                setSelectedPiece(null);
                setPossibleMoves([]);
            }
        }
    };


    return (
        <>
            <div className={styles.Game}>
                {field.map((row) => {
                    return row.map((cell) => {
                        const isPossibleMove = possibleMoves.some(move => move.id === cell.id);
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

                {isPawnTransformating ? <ModalTransformating onClick={handleTransformate}/> : null}

                
            </div>
            <h1>Ход {turn ? 'белых' : 'черных'}</h1>
        </>
    );
}