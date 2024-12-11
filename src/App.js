import "./App.css";
import { Routes, Route, Link, HashRouter } from "react-router-dom";

const Index = function () {
    return (
        <main>
            <h1>Hello</h1>

            <Link to="/test">Test link</Link>
        </main>
    );
};
const TestPage = function () {
    return <h1>Test</h1>;
};
function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/test" element={<TestPage />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
