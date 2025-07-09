import type { IField } from "../types/IField";

export const initializeBoard = (prevField: IField):IField => {
    prevField[0][0].pieceId = 0;
    prevField[0][1].pieceId = 1;
    prevField[0][2].pieceId = 2;
    prevField[0][3].pieceId = 3;
    prevField[0][4].pieceId = 4;
    prevField[0][5].pieceId = 5;
    prevField[0][6].pieceId = 6;
    prevField[0][7].pieceId = 7;

    for (let i = 0; i < 8; i++) {
        prevField[1][i].pieceId = 8 + i;
    }

    prevField[7][0].pieceId = 16;
    prevField[7][1].pieceId = 17;
    prevField[7][2].pieceId = 18;
    prevField[7][3].pieceId = 19;
    prevField[7][4].pieceId = 20;
    prevField[7][5].pieceId = 21;
    prevField[7][6].pieceId = 22;
    prevField[7][7].pieceId = 23;
    
    for (let i = 0; i < 8; i++) {
        prevField[6][i].pieceId = 24 + i;
    }

    return prevField;
};
