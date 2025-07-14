import { Provider } from "react-redux";
import "./App.module.scss";
import { store } from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes/ROUTES";
import { WebSocketProvider } from "./components/WebSocketProvider/WebSocketProvider";

function App() {
    return (
        <>
            <WebSocketProvider>
                <Provider store={store}>
                    <BrowserRouter>
                        <Routes>
                            {ROUTES.map(({path, Element}) => {
                                return <Route key={path} path={path} element={<Element/>}/>
                            })}
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </WebSocketProvider>
        
        </>
    );
}

export default App;
