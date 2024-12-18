import "./styles/Navbar.css";
export default function Navbar() {
    return (
        <nav class="navbar border-bottom border-1 border-dark mb-2 light">
            <a class="navbar-brand px-2" href="#">
                6D
            </a>
            <button
                class="navbar-toggler my-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div
                class="collapse navbar-collapse border-top border-1 border-dark"
                id="navbarSupportedContent"
            >
                <ul class="navbar-nav mr-auto px-2">
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            News
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            Witzeseite
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
