import { createSlice } from "@reduxjs/toolkit";


interface IPlayer{
    id: number | undefined;
    color: number | undefined;
}


const initialState: IPlayer = {
    id: undefined,
    color: undefined
}


export const playerSlice = createSlice({
    name: 'playerSlice',
    initialState,
    reducers: {
        setPlayerId: (state, action) => {
            state.id = action.payload.id
        },
        setPlayerColor: (state, action) => {
            state.color = action.payload.color
        }
    }
})



export const {setPlayerId, setPlayerColor} = playerSlice.actions
export default playerSlice.reducer