import { Pieces } from "../entitites/Pieces/Pieces";
import { changeBlackLongCastleRight, changeBlackShortCastleRight, changeWhiteLongCastleRight, changeWhiteShortCastleRight } from "../store/slices/castleSlice";
import { dispatch } from "../store/store";
import type { ICell } from "../types/ICell";
import type { IField } from "../types/IField";
import { isChecked } from "./isChecked";

export const move = (
    cellToMove: ICell,
    currentCell: ICell | null,
    field: IField,
    setIsPawnTransformating?: React.Dispatch<React.SetStateAction<number>>,
    setTurn?: React.Dispatch<React.SetStateAction<boolean>>
): IField => {
    let newField = JSON.parse(JSON.stringify(field));

    const piece = Pieces.find((pc) => pc.id === currentCell?.pieceId);

    if (currentCell && piece) {
        newField[cellToMove.y][cellToMove.x].pieceId = currentCell?.pieceId;
        newField[currentCell.y][currentCell.x].pieceId = undefined;

        if (piece.name === "pawn" && (cellToMove.y === 7 || cellToMove.y === 0) && setIsPawnTransformating) {
            setIsPawnTransformating(piece.id);
        }

        if (piece.name === "king" && !isChecked(piece.color, currentCell, field)) {
            if (piece.color) {
                
                if (cellToMove.id === field[7][6].id) {
                    newField[7][4].pieceId = undefined;
                    newField[7][6].pieceId = piece.id;
                    newField[7][7].pieceId = undefined;
                    newField[7][5].pieceId = 16;
                }
                if (cellToMove.id === field[7][2].id) {
                    newField[7][4].pieceId = undefined;
                    newField[7][2].pieceId = piece.id;
                    newField[7][0].pieceId = undefined;
                    newField[7][3].pieceId = 23;
                }
            } else {

                
                if (cellToMove.id === field[0][6].id) {
                    newField[0][4].pieceId = undefined;
                    newField[0][6].pieceId = piece.id;
                    newField[0][7].pieceId = undefined;
                    newField[0][5].pieceId = 7;
                }
                if (cellToMove.id === field[0][2].id) {
                    newField[0][4].pieceId = undefined;
                    newField[0][2].pieceId = piece.id;
                    newField[0][0].pieceId = undefined;
                    newField[0][3].pieceId = 0;
                }
            }
        }

        
    }

    if(setTurn) setTurn((prev) => !prev);

    return newField;
};
