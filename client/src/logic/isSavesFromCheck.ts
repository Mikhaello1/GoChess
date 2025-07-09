import { Pieces } from "../entitites/Pieces/Pieces";
import type { ICell } from "../types/ICell";
import type { IField } from "../types/IField";
import type { IPiece } from "../types/IPiece";
import { isChecked } from "./isChecked";
import { move } from "./move";

export const isSavesFromCheck = (color: number, field: IField, currentCell: ICell, cellToMove: ICell): boolean => {
    const newField = move(cellToMove, currentCell, field);

    const kingPieceId = Pieces.find((pc) => pc.color === color && pc.name === "king")?.id;
        let kingCell: ICell | null = null;

        newField.forEach((row) => {
            row.forEach((cl) => {
                if (cl.pieceId === kingPieceId) kingCell = { ...cl };
            });
        });
        if (!kingCell) {
            throw new Error("King piece not found in the field");
        }

    if(!kingCell) throw new Error("no king was found GG's")

    return !isChecked(color, kingCell, newField);
}