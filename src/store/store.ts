import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { castleSlice } from "./slices/castleSlice";
import castleReducer from './slices/castleSlice'

export const store = configureStore({
    reducer: {
        castleSlice: castleReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const dispatch = store.dispatch; // Прямой доступ к диспатчу
export const getState = store.getState; // Прямой доступ к состоянию
