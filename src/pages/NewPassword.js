// a component that allows the user to change their password
//
import React, { useState } from "react";
import { auth } from "../db";
import { updatePassword } from "firebase/auth";

export default function NewPassword() {
    const [newPwd, setNewPwd] = useState("");
    const [hasError, setHasError] = useState(false);
    return (
        <div className="container">
            <h1>Passwort ändern</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    updatePassword(auth.currentUser, newPwd)
                        .then(() => {
                            window.history.back();
                        })
                        .catch((err) => {
                            setHasError(true);
                        });
                }}
            >
                <div className="form-group input-field">
                    <input
                        type="password"
                        id="pwd"
                        name="pwd"
                        onChange={(e) => setNewPwd(e.target.value)}
                        required
                        className="form-control"
                    />
                    <label htmlFor="pwd">Neues Passwort</label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Passwort ändern
                </button>
                <p style={{ color: "red" }}>
                    {hasError
                        ? "Das Passwort konnte nicht geändert werden. Versuche es noch mal."
                        : ""}
                </p>
            </form>
        </div>
    );
}
