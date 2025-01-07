import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ref, onValue, push } from "firebase/database";
import db, { auth } from "../db";
import nameFromEMail, { formatDate } from "../utils";
import Spinner from "react-bootstrap/Spinner";

export default function ForumPost() {
    const [post, setPost] = useState(null);
    const [answers, setAnswers] = useState([]);
    const subject = useParams().subject;
    const key = useParams().key;
    useEffect(() => {
        const dbRef = ref(db, `forum/${subject}/${key}`);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            setPost(data);
        });
        const answersRef = ref(db, `forum/${subject}/${key}/answers`);
        onValue(answersRef, (snapshot) => {
            const data = snapshot.val();
            setAnswers(data);
        });
    }, [subject, key]);
    if (!post) {
        return <Spinner />;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const text = document.getElementById("new-post-text").value;
        const asAuthor = document.getElementById("as-author").checked;
        push(ref(db, `forum/${subject}/${key}/answers`), {
            content: text,
            author: asAuthor ? auth.currentUser.email : "Anonym",
            posted_at: Date.now(),
        });
    };
    return (
        <div className="forum-post container">
            <div className="fw-bolder">
                <button onClick={() => window.history.back()} className="btn">
                    ← Zurück
                </button>
            </div>
            <h1>{post.title}</h1>
            <small>
                {formatDate(new Date(post.posted_at))}
                <br />
                {post.author !== "Anonym"
                    ? "von " + nameFromEMail(post.author)
                    : ""}
            </small>
            <br />
            <div>{post.content}</div>
            <div style={{ marginTop: "10%" }} />
            <h4>Antworten:</h4>
            <div>
                {answers
                    ? Object.values(answers).map((val, index) => {
                          return (
                              <div key={index} className="mb-4">
                                  {val.content} <br />
                                  <small>
                                      {formatDate(new Date(val.posted_at))}
                                      <br />
                                      {val.author !== "Anonym" && (
                                          <>von {nameFromEMail(val.author)}</>
                                      )}
                                  </small>
                              </div>
                          );
                      })
                    : "Noch keine Antworten zu diesem Post."}
                <hr />
                {auth.currentUser ? (
                    <form onSubmit={handleSubmit} className="mt-5">
                        <h4>Neue Antwort zu diesem Post</h4>
                        <div className="form-group form-floating">
                            <textarea
                                name="new-post-text"
                                id="new-post-text"
                                placeholder=" "
                                className="form-control"
                                required
                            ></textarea>
                            <label htmlFor="new-post-text">
                                Der Inhalt der neuen Antwort
                            </label>
                        </div>
                        <div className="form-group">
                            <input
                                type="checkbox"
                                name="show-as-author"
                                className="form-check d-inline form-check-input"
                                id="as-author"
                                defaultChecked
                            />
                            <label
                                htmlFor="as-author"
                                className="form-check-label form-label"
                            >
                                Dich als Author eintragen
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Antwort hinzufügen
                        </button>
                    </form>
                ) : (
                    "Du musst angemeldet sein, um eine Antwort schreiben zu können."
                )}
            </div>
        </div>
    );
}
//
