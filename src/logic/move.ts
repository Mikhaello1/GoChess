import { Pieces } from "../entitites/Pieces/Pieces";
import { changeBlackLongCastleRight, changeBlackShortCastleRight, changeWhiteLongCastleRight, changeWhiteShortCastleRight } from "../store/slices/castleSlice";
import { dispatch, useAppSelector } from "../store/store";
import type { ICell } from "../types/ICell";
import type { IField } from "../types/IField";

export const move = (
    cellToMove: ICell,
    currentCell: ICell | null,
    field: IField,
    setIsPawnTransformating: React.Dispatch<React.SetStateAction<number>>,
    setTurn: React.Dispatch<React.SetStateAction<boolean>>
): IField => {
    let newField = JSON.parse(JSON.stringify(field));

    const piece = Pieces.find((pc) => pc.id === currentCell?.pieceId);

    if (currentCell && piece) {
        newField[cellToMove.y][cellToMove.x].pieceId = currentCell?.pieceId;
        newField[currentCell.y][currentCell.x].pieceId = undefined;
        if (piece.name === "pawn" && (cellToMove.y === 7 || cellToMove.y === 0)) {
            setIsPawnTransformating(piece.id);
        }

        if (piece.id === 0){
            dispatch(changeBlackLongCastleRight(false));
        }
        if(piece.id === 7){
            dispatch(changeBlackShortCastleRight(false));
        }
        if(piece.id === 16){
            dispatch(changeWhiteLongCastleRight(false));
        }
        if(piece.id === 23){
            dispatch(changeWhiteShortCastleRight(false));
        }

        if (piece.name === "king") {
            if (piece.color) {
                dispatch(changeWhiteLongCastleRight(false));
                dispatch(changeWhiteShortCastleRight(false));
            
                newField[7][4].pieceId = undefined;
                console.log(cellToMove.id, field[7][5].id)
                if (cellToMove.id === field[7][6].id) {
                    console.log('short white')
                    newField[7][6].pieceId = piece.id;
                    newField[7][7].pieceId = undefined;
                    newField[7][5].pieceId = 16;
                }
                if (cellToMove.id === field[7][2].id) {
                    newField[7][2].pieceId = piece.id;
                    newField[7][0].pieceId = undefined;
                    newField[7][3].pieceId = 23;
                }
            } else {
                dispatch(changeBlackLongCastleRight(false));
                dispatch(changeBlackShortCastleRight(false));
                newField[0][4].pieceId = undefined;
                if (cellToMove.id === field[0][6].id) {
                    newField[0][6].pieceId = piece.id;
                    newField[0][7].pieceId = undefined;
                    newField[0][5].pieceId = 7;
                }
                if (cellToMove.id === field[0][2].id) {
                    newField[0][2].pieceId = piece.id;
                    newField[0][0].pieceId = undefined;
                    newField[0][3].pieceId = 0;
                }
            }
        }

        
    }

    setTurn((prev) => !prev);

    return newField;
};
