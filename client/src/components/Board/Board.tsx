import React from "react";
import type { IField } from "../../types/IField";
import type { ICell } from "../../types/ICell";
import Cell from "../Cell/Cell";
import { ModalTransformating } from "../ModalTransformating/ModalTransformating";
import styles from "./Board.module.scss";
import { useAppSelector } from "../../store/store";

interface Props {
    field: IField;
    possibleMoves: ICell[];
    handleCellClick: (cell: ICell) => void;
    handleTransformate: (pieceName: string) => void;
    isPawnTransformating: number;
}

export const Board: React.FC<Props> = ({ field, possibleMoves, handleCellClick, handleTransformate, isPawnTransformating }) => {
    const playerColor = useAppSelector((state) => state.player.color);

    // const viewField = playerColor === 0 ? JSON.parse(JSON.stringify(field.reverse().map(row => row.reverse()))) : JSON.parse(JSON.stringify(field)) 
    console.log(playerColor)
    return (
        <div className={styles.Board}>
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
    );
};
