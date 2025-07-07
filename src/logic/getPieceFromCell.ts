import { Pieces } from "../entitites/Pieces/Pieces";
import type { ICell } from "../types/ICell";
import type { IPiece } from "../types/IPiece";


export const getPieceFromCell = (cell: ICell): IPiece | undefined => {
    return Pieces.find(pc => pc.id === cell.pieceId)
}