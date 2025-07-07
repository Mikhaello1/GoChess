import { Provider } from "react-redux";
import "./App.module.scss";
import Game from "./components/Game/Game";
import { store } from "./store/store";

function App() {
    return (
        <>
            <Provider store={store}>
                <Game />
            </Provider>
        </>
    );
}

export default App;
