import { auth } from "../db";
import {
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [hasError, setHasError] = useState(false);
    const [isInputActive, setActive] = useState(false);
    return (
        <main className="d-flex justify-content-center align-items-center">
            <form
                action={
                    /** @param {FormData} formData*/ (formData) => {
                        setPersistence(auth, browserLocalPersistence).then(
                            () => {
                                signInWithEmailAndPassword(
                                    auth,
                                    formData.get("email"),
                                    formData.get("pwd")
                                )
                                    .catch((err) => {
                                        setHasError(true);
                                    })
                                    .then((v) => {
                                        window.history.back();
                                    });
                            }
                        );
                    }
                }
                className="w-50 h-75 border border-1 rounded rounded-3 border-success text-center"
            >
                <h1 className="m-3">Anmelden</h1>
                <p style={{ color: "red" }}>
                    {hasError
                        ? "Entweder ist die E-Mail oder das Passwort falsch. Versuche es noch mal."
                        : ""}
                </p>
                <div className="form-floating">
                    <input
                        className={"rounded rounded-2 p-2 form-control".concat(
                            isInputActive ? " float-label-active" : ""
                        )}
                        placeholder=" "
                        type="email"
                        id="uname"
                        name="email"
                        onBlur={(e) => {
                            if (document.getElementById("uname").value) {
                                setActive(true);
                            } else setActive(false);
                        }}
                        aria-labelledby="uname-label"
                        required
                        autoComplete="username"
                        autoFocus
                    />
                    <label id="uname-label" htmlFor="uname">
                        E-Mail Addresse
                    </label>
                </div>

                <div className="form-floating mt-5">
                    <input
                        className="rounded rounded-2 p-2 form-control"
                        type="password"
                        id="pwd"
                        name="pwd"
                        aria-labelledby="pwd-label"
                        required
                        placeholder=" "
                        autoComplete="current-password"
                    />
                    <label id="pwd-label" htmlFor="pwd">
                        Passwort
                    </label>
                </div>
                <Link
                    to="/passwort-vergessen"
                    title="Passwort zurücksetzen"
                    className="d-block my-3"
                >
                    Passwort vergessen?
                </Link>
                <button className="w-75 btn btn-success my-3">Anmelden</button>
            </form>
        </main>
    );
}
