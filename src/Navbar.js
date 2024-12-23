import { useState } from "react";
import "./styles/hamburgers.min.css";
import "./styles/Navbar.css";
import { Link } from "react-router-dom";
import { auth } from "./db";
import { onAuthStateChanged } from "firebase/auth";
import { useCurrentTheme } from "./context";
export default function Navbar() {
    const [active, setActive] = useState(false);
    const [theme, setTheme] = useCurrentTheme();
    const [authenticated, setAuthenticated] = useState(false);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthenticated(true);
            console.log(user);
        }
    });
    document.body.setAttribute("data-bs-theme", theme);
    return (
        <nav
            className={`navbar border-bottom border-1 border-dark mb-2 ${theme}`}
        >
            <a className="navbar-brand px-2" href="#">
                6D
            </a>
            <span>
                {!authenticated ? (
                    <Link
                        to="/login"
                        className="text-white text-decoration-none"
                    >
                        Anmelden
                    </Link>
                ) : (
                    <span className="text-white">
                        {auth.currentUser.email
                            .split(".")[0]
                            .replace(
                                auth.currentUser.email[0],
                                auth.currentUser.email[0].toUpperCase()
                            )}
                    </span>
                )}
                <button
                    className="p-2 d-inline border border-0 bg-transparent"
                    onClick={() => {
                        setTheme(
                            localStorage.getItem("theme") == "light"
                                ? "dark"
                                : "light"
                        );
                    }}
                    aria-label="Theme umschalten"
                >
                    <img
                        src={`/${theme}-theme.svg`}
                        className="d-inline"
                        alt={`${
                            localStorage.getItem("theme") == "light"
                        } theme`}
                    />
                </button>
                <button
                    className={` hamburger hamburger--spin ${
                        active ? "is-active" : ""
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => {
                        setActive(!active);
                    }}
                >
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>
            </span>

            <div
                className="collapse navbar-collapse border-top border-1 border-dark"
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav mr-auto px-2">
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            News
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            Witzeseite
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
