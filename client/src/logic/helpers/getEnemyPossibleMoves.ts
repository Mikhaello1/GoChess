import { Pieces } from "../../entitites/Pieces/Pieces";
import type { ICell } from "../../types/ICell";
import type { IField } from "../../types/IField";
import type { IPiece } from "../../types/IPiece";


export const getEnemyPiecesWithoutKing = (color: number):IPiece[] => {
    return Pieces.filter((pc) => pc.color === Number(!color) && pc.name !== "king");
}

export const getEnemyPossibleMoves = (color:number, field: IField, ): ICell[] => {

    const enemyPiecesWithoutKing = getEnemyPiecesWithoutKing(color);
    


    return []
}