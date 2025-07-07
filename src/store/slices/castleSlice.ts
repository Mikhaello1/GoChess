import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface CastleState{
    whiteShortCastle: boolean;
    whiteLongCastle: boolean;
    blackShortCastle: boolean;
    blackLongCastle: boolean;
}



const initialState: CastleState = {
    whiteShortCastle: true,
    whiteLongCastle: true,
    blackShortCastle: true,
    blackLongCastle: true,
}

export const castleSlice = createSlice({
    name: 'castleSlice',
    initialState,
    reducers: {
        changeWhiteShortCastleRight: (state, action: PayloadAction<boolean>) => {
            state.whiteShortCastle = action.payload
        },
        changeWhiteLongCastleRight: (state, action: PayloadAction<boolean>) => {
            state.whiteLongCastle = action.payload
        },
        changeBlackShortCastleRight: (state, action: PayloadAction<boolean>) => {
            state.blackShortCastle = action.payload
        },
        changeBlackLongCastleRight: (state, action: PayloadAction<boolean>) => {
            state.blackLongCastle = action.payload
        }
    }
})


export const {changeBlackLongCastleRight, changeBlackShortCastleRight, changeWhiteLongCastleRight, changeWhiteShortCastleRight} = castleSlice.actions
export default castleSlice.reducer