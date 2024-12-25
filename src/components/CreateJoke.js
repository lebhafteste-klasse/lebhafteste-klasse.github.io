import { useState } from "react";
import db, { auth } from "../db";
import { push, ref } from "firebase/database";

export default function CreateJoke() {
    const jokesRef = ref(db, "jokes");
    const [formVisible, setFormVisible] = useState(false);
    const action = (data) => {
        const text = data.get("joke-text");
        const author = auth.currentUser.email;
        const newJoke = {
            text,
            author,
        };
        push(jokesRef, newJoke).then(() => {
            setFormVisible(false);
        });
    };
    return (
        <div className="text-end">
            <form
                className={`form-inline w-75 d-flex ${
                    formVisible ? "d-flex" : "d-none"
                }`}
                action={action}
            >
                <div className="input-field form-group w-75">
                    <textarea
                        id="new-joke-input"
                        name="joke-text"
                        type="text"
                        required
                        className="form-control w-75"
                    />
                    <label htmlFor="new-joke-input">Neuer Witz</label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Hinzufügen
                </button>
            </form>
            <button
                onClick={() => setFormVisible(!formVisible)}
                className="btn"
            >
                <i
                    className="text-success border rounded-circle d-inline-block"
                    style={{
                        cursor: "pointer",
                        width: "40px",
                        height: "40px",
                        borderColor: "lime !important",
                    }}
                >
                    <img src="/add.svg" alt="Neuen Witz hinzufügen" />
                </i>{" "}
                Neuen Witz hinzufügen
            </button>
        </div>
    );
}
