import { Pieces } from "../entitites/Pieces/Pieces";
import { getState } from "../store/store";
import type { ICell } from "../types/ICell";
import type { IField } from "../types/IField";
import type { IPiece } from "../types/IPiece";
import { getPieceFromCell } from "./getPieceFromCell";

export const getPossibleMoves = (cell: ICell, field: IField, turn: boolean): ICell[] => {
    let result = [];

    const piece = getPieceFromCell(cell);

    const state = getState();
    const { whiteShortCastle, whiteLongCastle, blackLongCastle, blackShortCastle } = state.castleSlice;

    if (piece && !!piece.color === turn) {
        if (piece.name === "pawn") {
            const direction = piece.color === 1 ? -1 : 1;
            const startPosition = piece.color === 1 ? 6 : 1;

            if (field[cell.y + direction][cell.x].pieceId === undefined) result.push(field[cell.y + direction][cell.x]);

            if (cell.y === startPosition) {
                if (field[cell.y + 2 * direction][cell.x].pieceId === undefined) result.push(field[cell.y + 2 * direction][cell.x]);
            }

            let leftDiagonal: { piece: IPiece | undefined; cell: ICell } = {
                piece: Pieces.find((pc) => pc.id === field[cell.y + direction][cell.x - 1]?.pieceId),
                cell: field[cell.y + direction][cell.x - 1],
            };
            let rightDiagonal: { piece: IPiece | undefined; cell: ICell } = {
                piece: Pieces.find((pc) => pc.id === field[cell.y + direction][cell.x + 1]?.pieceId),
                cell: field[cell.y + direction][cell.x + 1],
            };

            if (leftDiagonal && leftDiagonal.piece && leftDiagonal.piece?.color !== piece.color) result.push(leftDiagonal.cell);
            if (rightDiagonal && rightDiagonal.piece && rightDiagonal.piece?.color !== piece.color) result.push(rightDiagonal.cell);
        }

        if (piece.name === "knight") {
            let knightMoves: any = [];
            let coords = [1, 2];
            let knightCells: ICell[] = [];
            coords.forEach((coord) => {
                const coordstemp = coords.filter((el) => el !== coord);
                const coord2 = coordstemp[0];

                let temp = [
                    [cell.y + coord, cell.x + coord2],
                    [cell.y + coord * -1, cell.x + coord2 * -1],
                    [cell.y + coord * -1, cell.x + coord2],
                    [cell.y + coord, cell.x + coord2 * -1],
                ];
                knightMoves.push(
                    temp.map((arr) => {
                        if (arr[0] >= 0 && arr[0] < 8 && arr[1] >= 0 && arr[1] < 8) return arr;
                    })
                );
            });
            knightMoves.forEach((arr) => {
                arr.map((couple) => {
                    if (couple) knightCells.push(field[couple[0]][couple[1]]);
                });
            });

            knightCells.forEach((cell) => {
                const pieceInCell = getPieceFromCell(cell);
                if (pieceInCell) {
                    if (pieceInCell.color !== piece.color) result.push(cell);
                } else result.push(cell);
            });
        }

        if (piece.name === "bishop") {
            const directions = [
                { di: 1, dj: 1 },
                { di: 1, dj: -1 },
                { di: -1, dj: -1 },
                { di: -1, dj: 1 },
            ];

            for (const { di, dj } of directions) {
                for (let i = cell.y + di, j = cell.x + dj; i >= 0 && i < 8 && j >= 0 && j < 8; i += di, j += dj) {
                    const pieceInCell = Pieces.find((pc) => pc.id === field[i][j].pieceId);

                    if (!pieceInCell) {
                        result.push(field[i][j]);
                    } else {
                        if (pieceInCell.color !== piece.color) {
                            result.push(field[i][j]);
                        }
                        break;
                    }
                }
            }
        }

        if (piece.name === "rook") {
            const directions = [
                { di: 1, dj: 0 },
                { di: -1, dj: 0 },
                { di: 0, dj: -1 },
                { di: 0, dj: 1 },
            ];

            for (const { di, dj } of directions) {
                for (let i = cell.y + di, j = cell.x + dj; i >= 0 && i < 8 && j >= 0 && j < 8; i += di, j += dj) {
                    const pieceInCell = Pieces.find((pc) => pc.id === field[i][j].pieceId);

                    if (!pieceInCell) {
                        result.push(field[i][j]);
                    } else {
                        if (pieceInCell.color !== piece.color) {
                            result.push(field[i][j]);
                        }
                        break;
                    }
                }
            }
        }

        if (piece.name === "queen") {
            const directions = [
                { di: 1, dj: 0 },
                { di: -1, dj: 0 },
                { di: 0, dj: -1 },
                { di: 0, dj: 1 },
                { di: 1, dj: 1 },
                { di: 1, dj: -1 },
                { di: -1, dj: -1 },
                { di: -1, dj: 1 },
            ];

            for (const { di, dj } of directions) {
                for (let i = cell.y + di, j = cell.x + dj; i >= 0 && i < 8 && j >= 0 && j < 8; i += di, j += dj) {
                    const pieceInCell = Pieces.find((pc) => pc.id === field[i][j].pieceId);

                    if (!pieceInCell) {
                        result.push(field[i][j]);
                    } else {
                        if (pieceInCell.color !== piece.color) {
                            result.push(field[i][j]);
                        }
                        break;
                    }
                }
            }
        }

        if (piece.name === "king") {
            const directions = [
                { di: 1, dj: 0 },
                { di: -1, dj: 0 },
                { di: 0, dj: -1 },
                { di: 0, dj: 1 },
                { di: 1, dj: 1 },
                { di: 1, dj: -1 },
                { di: -1, dj: -1 },
                { di: -1, dj: 1 },
            ];

            directions.forEach((dir) => {
                const newY: number = cell.y - dir.di;
                const newX: number = cell.x - dir.dj;
                if (newY >= 0 && newY <= 7 && newX >= 0 && newX <= 7) {
                    const peiceInCell = Pieces.find((pc) => pc.id === field[newY][newX].pieceId);
                    if (peiceInCell) {
                        if (peiceInCell.color !== piece.color) result.push(field[newY][newX]);
                    } else {
                        result.push(field[newY][newX]);
                    }
                }
            });

            // const enemyPiecesWithoutKing = Pieces.filter((pc) => pc.color === Number(!piece.color) && piece.name !== "king");
            // const enemyPiecesCells: ICell[] = [];
            // field.forEach((row) => {
            //         row.forEach((cell) => {
            //             if (enemyPiecesWithoutKing.find((pc) => pc.id === cell.pieceId)) enemyPiecesCells.push(cell);
            //         });
            //     });

            //     const enemyPossibleMoves: ICell[] = [];
            //     enemyPiecesCells
            //         .map((cell) => {
            //             return getPossibleMoves(cell, field, turn);
            //         })
            //         .forEach((row) => {
            //             row.forEach((el) => {
            //                 enemyPossibleMoves.push(el);
            //             });
            //         });
                
            // const shortCastleCoordinates = piece.color === 0 ? [[0, 5], [0, 6]] : [[7, 5], [7, 6]];
            // const longCastleCoordinates = piece.color === 0 ? [[0, 3], [0, 2]] : [[7, 3], [7, 2]] 


            if (!piece.color) {
                const whitePiecesWithoutKing = Pieces.filter((pc) => pc.color === 1 && pc.name !== "king");
                console.log(whitePiecesWithoutKing);
                const whitePiecesCells: ICell[] = [];
                field.forEach((row) => {
                    row.forEach((cell) => {
                        if (whitePiecesWithoutKing.find((pc) => pc.id === cell.pieceId)) whitePiecesCells.push(cell);
                    });
                });

                const whitePossibleMoves: ICell[] = [];
                whitePiecesCells
                    .map((cell) => {
                        return getPossibleMoves(cell, field, !turn);
                    })
                    .forEach((row) => {
                        row.forEach((el) => {
                            whitePossibleMoves.push(el);
                        });
                    });
                

                if (blackShortCastle) {
                    const piecef8 = Pieces.find((pc) => pc.id === field[0][5].pieceId);
                    const pieceg8 = Pieces.find((pc) => pc.id === field[0][6].pieceId);

                    if (!piecef8 && !pieceg8) {
                        if (!whitePossibleMoves.find((cell) => cell.id === field[0][5].id) && !whitePossibleMoves.find((cell) => cell.id === field[0][6].id)) {
                            result.push(field[0][6]);
                        }
                    }
                }
                if (blackLongCastle) {
                    const pieced1 = Pieces.find((pc) => pc.id === field[0][3].pieceId);
                    const piecec1 = Pieces.find((pc) => pc.id === field[0][2].pieceId);

                    if (!pieced1 && !piecec1) {
                        if (!whitePossibleMoves.find((cell) => cell.id === field[0][3].id) && !whitePossibleMoves.find((cell) => cell.id === field[0][2].id)) {
                            result.push(field[0][2]);
                        }
                    }
                }
                return result.filter(cell => cell.id !== whitePossibleMoves.find(wcl => wcl.id === cell.id)?.id)
            }

            if (piece.color) {
                const blackPiecesWithoutKing = Pieces.filter((pc) => pc.color === 0 && pc.name !== "king");
                
                const blackPiecesCells: ICell[] = [];
                field.forEach((row) => {
                    row.forEach((cell) => {
                        if (blackPiecesWithoutKing.find((pc) => pc.id === cell.pieceId)) blackPiecesCells.push(cell);
                    });
                });

                const blackPossibleMoves: ICell[] = [];
                blackPiecesCells
                    .map((cell) => {
                        
                        return getPossibleMoves(cell, field, !turn);
                    })
                    .forEach((row) => {
                        // console.log(row)
                        row.forEach((el) => {
                            // console.log(el)
                            blackPossibleMoves.push(el);
                        });
                    });
                
                    
                if (whiteShortCastle) {
                    const piecef1 = Pieces.find((pc) => pc.id === field[7][5].pieceId);
                    const pieceg1 = Pieces.find((pc) => pc.id === field[7][6].pieceId);

                    if (!piecef1 && !pieceg1) {
                        if (!blackPossibleMoves.find((cell) => cell.id === field[7][5].id) && !blackPossibleMoves.find((cell) => cell.id === field[7][6].id)) {
                            result.push(field[7][6]);
                        }
                    }
                }
                if (whiteLongCastle) {
                    const pieced1 = Pieces.find((pc) => pc.id === field[7][3].pieceId);
                    const piecec1 = Pieces.find((pc) => pc.id === field[7][2].pieceId);

                    if (!pieced1 && !piecec1) {
                        if (!blackPossibleMoves.find((cell) => cell.id === field[7][3].id) && !blackPossibleMoves.find((cell) => cell.id === field[7][2].id)) {
                            result.push(field[7][6]);
                        }
                    }
                }
                return result.filter(cell => cell.id !== blackPossibleMoves.find(bcl => bcl.id === cell.id)?.id)
            }
        }
    }

    return result;
};
