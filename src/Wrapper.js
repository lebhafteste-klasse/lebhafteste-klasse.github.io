import { auth } from "./db";
import Navbar from "./Navbar";

export default function Wrapper({
    component,
    loggedInOnly = false,
    notLoggedInOnly = false,
}) {
    if (loggedInOnly && !auth.currentUser) {
        window.location.hash = "/login";
    }
    if (notLoggedInOnly && auth.currentUser) {
        window.history.back();
    }
    return (
        <>
            <Navbar />
            {component}
        </>
    );
}
