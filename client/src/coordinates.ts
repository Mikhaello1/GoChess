const coordinates: { [key: number]: string } = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    5: 'f',
    6: 'g',
    7: 'h'
};

export const convertToLetter = (num: number): string => {
    if (num < 0 || num > 7) {
        throw new Error("Number must be between 0 and 7");
    }
    return coordinates[num];
};