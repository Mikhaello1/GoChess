import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import castleReducer from './slices/castleSlice'
import playerReducer from './slices/playerSlice'

export const store = configureStore({
    reducer: {
        castle: castleReducer,
        player: playerReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const dispatch = store.dispatch;
export const getState = store.getState;
