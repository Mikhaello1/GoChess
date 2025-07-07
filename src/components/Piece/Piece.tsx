import React, { type FC } from "react";
import type { IPiece } from "../../types/IPiece";
import styles from './Piece.module.scss'

import { FaRegChessBishop, FaRegChessKing, FaRegChessKnight, FaRegChessPawn, FaRegChessQueen, FaRegChessRook } from "react-icons/fa6";

interface PieceProps extends IPiece {}

export const Piece: FC<PieceProps> = ({ id, name, color }) => {
    let pieceColor = 'white';
    color === 0 ? pieceColor = 'black' : 'white'
    return (
        <div className={styles.Piece}>
            {name === "pawn" ? (
                <FaRegChessPawn color={pieceColor} size={70}/>
            ) : name === "knight" ? (
                <FaRegChessKnight color={pieceColor} size={70}/>
            ) : name === "bishop" ? (
                <FaRegChessBishop color={pieceColor} size={70}/>
            ) : name === "rook" ? (
                <FaRegChessRook color={pieceColor} size={70}/>
            ) : name === "queen" ? (
                <FaRegChessQueen color={pieceColor} size={70}/>
            ) : name === "king" ? (
                <FaRegChessKing color={pieceColor} size={70}/>
            ) : null}
        </div>
    );
};
