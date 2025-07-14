import React from "react";
import styles from "./Cell.module.scss";
import { convertToLetter } from "../../coordinates";
import type { ICell } from "../../types/ICell";
import {Piece} from "../Piece/Piece";
import { Pieces } from "../../entitites/Pieces/Pieces";
import { useAppSelector } from "../../store/store";

interface CellProps extends ICell {
    onClick: () => void;
    highlight?: boolean; // Добавляем новый пропс
}

const Cell: React.FC<CellProps> = ({ color, x, y, pieceId, onClick, highlight }) => {
    
    const pc = Pieces.find(pc => pc.id === pieceId);

    const playerColor = useAppSelector(state => state.player.color)


    return (
        <div onClick={onClick} className={styles.Cell} style={{ backgroundColor: highlight ? "yellow" : (color === 0 ? "green" : "rgb(188, 212, 91)"), color: color === 1 ? "black" : "white" }}>
            <span className={styles.yCoord}>{x === 0 ? `${8-y}` : null}</span>
            <span className={styles.xCoord}>{y === 7 ? `${convertToLetter(x)}` : null}</span>
            {pc ? <Piece id={pc.id} name={pc.name} color={pc.color}/> : null}
            
        </div>
    );
};

export default Cell;
