import { Routes, Route, HashRouter } from "react-router-dom";
import Wrapper from "./Wrapper";
import Login from "./pages/Login";
import { ThemeContext } from "./context";
import Index from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";
import Jokes from "./pages/Jokes";
import SubjectForums from "./pages/SubjectForums";
import SubjectForum from "./pages/SubjectForum";
import NewForumPost from "./pages/NewForumPost";
import ForumPost from "./pages/ForumPost";
import "./styles/float-label.css";

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
                    <Route
                        path="/fachforen"
                        element={<Wrapper component={<SubjectForums />} />}
                    />
                    <Route
                        path="forum/:subject"
                        element={<Wrapper component={<SubjectForum />} />}
                    />
                    <Route
                        path="neuer-post/:subject"
                        element={<Wrapper component={<NewForumPost />} />}
                    />
                    <Route
                        path="forum-post/:subject/:key"
                        element={<Wrapper component={<ForumPost />} />}
                    />
                </Routes>
            </HashRouter>
        </ThemeContext.Provider>
    );
}
export default App;
