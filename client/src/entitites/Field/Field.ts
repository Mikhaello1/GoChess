import type { ICell } from "../../types/ICell";


const createField = (): ICell[][] => {
    const res: ICell[][] = Array.from({ length: 8 }, () => []);
    
    for (let j = 0; j < 8; j++) {
        for (let i = 0; i < 8; i++) {
            res[j].push({
                id: i + j * 8, 
                x: i,      
                y: j,      
                color: (i + j) % 2, 
            });
        }
    }

    return res;
};

export const FIELD = createField();

