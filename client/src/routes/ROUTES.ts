import Game from "../components/Game/Game";
import { Home } from "../components/Home/Home";


export const ROUTES = [
    {
        path: '/',
        Element: Home
    },
    {
        path: '/game/:gameId',
        Element: Game
    }

]