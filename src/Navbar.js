import { useState } from "react";
import "./styles/hamburgers.min.css";
import "./styles/Navbar.css";
export default function Navbar() {
    const [active, setActive] = useState(false);
    return (
        <nav className="navbar border-bottom border-1 border-dark mb-2 light">
            <a className="navbar-brand px-2" href="#">
                6D
            </a>
            <button
                className={` hamburger hamburger--spin ${
                    active ? "is-active" : ""
                }`}
                // className="navbar-toggler my-2"
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
                {/* <span className="navbar-toggler-icon"></span> */}
            </button>

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
