import { Pieces } from "../entitites/Pieces/Pieces";
import type { ICell } from "../types/ICell";
import type { IField } from "../types/IField";
import { getPossibleMoves } from "./getPossibleMoves";

export const isChecked = (color: number, cell: ICell, field: IField): boolean => {
    const enemyPiecesWithoutKing = Pieces.filter((pc) => pc.color === Number(!color) && pc.name !== "king");
    const enemyPiecesCells: ICell[] = [];
    
    field.forEach((row) => {
        row.forEach((cell) => {
            if (enemyPiecesWithoutKing.find((pc) => pc.id === cell.pieceId)) enemyPiecesCells.push(cell);
        });
    });

    const enemyPossibleMoves: ICell[] = [];
    enemyPiecesCells
        .map((cell) => {
            return getPossibleMoves(cell, field, !color, true);
        })
        .forEach((row) => {
            row.forEach((el) => {
                enemyPossibleMoves.push(el);
            });
        });

    return !!enemyPossibleMoves.find(move => move.id === cell.id);
};
