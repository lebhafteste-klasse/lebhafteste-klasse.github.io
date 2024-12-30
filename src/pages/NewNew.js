import { useState } from "react";
import { push, ref } from "firebase/database";
import db, { auth } from "../db"; // Adjust the import according to your project structure

export default function NewNew() {
    const [title, setTitle] = useState("");
    const [paragraphs, setParagraphs] = useState([""]);

    const handleAddParagraph = () => {
        setParagraphs([...paragraphs, ""]);
    };

    const handleParagraphChange = (index, value) => {
        const newParagraphs = [...paragraphs];
        newParagraphs[index] = value;
        setParagraphs(newParagraphs);
    };

    return (
        <div className="container">
            <h1>Neuer News-Artikel</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    if (title && paragraphs.length) {
                        push(ref(db, "news"), {
                            name: title,
                            content: paragraphs,
                            posted_at: Date.now(),
                            author: auth.currentUser.email,
                        }).then((value) => {
                            window.location.hash = `/news/${value.key}`;
                        });
                    }
                }}
                id="form"
            >
                <div className="form-group input-field m-3">
                    <input
                        type="text"
                        id="title"
                        value={title}
                        className="form-control"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="title">Die Kopfzeile (Überschrift)</label>
                </div>
                {paragraphs.map((paragraph, index) => (
                    <div key={index} className="form-group m-3 input-field">
                        <textarea
                            value={paragraph}
                            id={`p-${index + 1}`}
                            onChange={(e) =>
                                handleParagraphChange(index, e.target.value)
                            }
                            className="form-control"
                        />
                        <label htmlFor={`p-${index + 1}`}>
                            Paragraph {index + 1}
                        </label>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddParagraph}
                    className="btn btn-outline-success"
                >
                    Paragraph hinzufügen
                </button>
                <button type="submit" className="btn btn-primary">
                    Hinzufügen
                </button>
            </form>
        </div>
    );
}
