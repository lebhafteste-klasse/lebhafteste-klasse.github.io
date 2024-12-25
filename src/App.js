import { Routes, Route, HashRouter } from "react-router-dom";
import Wrapper from "./Wrapper";
import Login from "./pages/Login";
import { ThemeContext } from "./context";
import Index from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";
import Jokes from "./pages/Jokes";

const TestPage = function () {
    return <h1>Test</h1>;
};

function App() {
    return (
        <ThemeContext.Provider value={localStorage.getItem("theme") || "light"}>
            <HashRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Wrapper component={<Index />} />}
                    />
                    <Route path="/test" element={<TestPage />} />
                    <Route
                        path="/login"
                        element={<Wrapper component={<Login />} />}
                    />
                    <Route
                        path="/news/:id"
                        element={<Wrapper component={<NewsDetail />} />}
                    />
                    <Route
                        path="/witzeseite"
                        element={<Wrapper component={<Jokes />} />}
                    />
                </Routes>
            </HashRouter>
        </ThemeContext.Provider>
    );
}
export default App;
