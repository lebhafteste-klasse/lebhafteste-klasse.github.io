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
import Homework from "./pages/Homework";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";
import NewNew from "./pages/NewNew";

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
                        element={
                            <Wrapper component={<Login />} notLoggedInOnly />
                        }
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
                        element={
                            <Wrapper
                                component={<NewForumPost />}
                                loggedInOnly
                            />
                        }
                    />
                    <Route
                        path="forum-post/:subject/:key"
                        element={<Wrapper component={<ForumPost />} />}
                    />
                    <Route
                        path="hausaufgaben/:subject"
                        element={<Wrapper component={<Homework />} />}
                    />
                    <Route
                        path="passwort-vergessen"
                        element={
                            <Wrapper
                                component={<ResetPassword />}
                                notLoggedInOnly
                            />
                        }
                    />
                    <Route
                        path="neues-passwort"
                        element={
                            <Wrapper component={<NewPassword />} loggedInOnly />
                        }
                    />
                    <Route
                        path="neue-news"
                        element={
                            <Wrapper component={<NewNew />} loggedInOnly />
                        }
                    />
                </Routes>
            </HashRouter>
        </ThemeContext.Provider>
    );
}
export default App;
