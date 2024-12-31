// a forum that takes a subject as a prop and renders a list of posts

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db, { auth } from "../db";
import {
    onValue,
    ref,
    startAt,
    query,
    limitToFirst,
    endAt,
} from "firebase/database";
import nameFromEMail, { formatDate } from "../utils";
export default function Forum({ subject }) {
    // the list of posts
    const [posts, setPosts] = useState([]);
    const page =
        parseInt(new URLSearchParams(window.location.search).get("page")) || 1;
    // get all posts for the subject from the database and update the state
    useEffect(() => {
        const dbRef = ref(db, `${subject}-posts`);
        if (page !== 1) {
            onValue(
                query(dbRef, startAt(page - 1 * 8), endAt(page * 8)),
                (snapshot) => {
                    const data = snapshot.val();

                    if (data) {
                        setPosts(data);
                    }
                }
            );
        } else {
            onValue(query(dbRef, limitToFirst(8)), (snapshot) => {
                const data = snapshot.val();

                if (data) {
                    setPosts(data);
                }
            });
        }
    }, [subject, page]);
    const html = [];
    for (let [key, post] of Object.entries(posts)) {
        html.push(
            <div
                key={key}
                className="border border-1 rounded rounded-3 post p-4 w-50"
            >
                <Link to={`/forum-post/${subject}/${key}`}>{post.title}</Link>
                <small className="d-block">
                    {formatDate(new Date(post.posted_at))}
                    <br />
                    {post.author !== "Anonym"
                        ? "von " + nameFromEMail(post.author)
                        : ""}
                </small>
            </div>
        );
    }
    return (
        <div className="forum">
            <div className="text-end">
                {auth.currentUser ? (
                    <button
                        onClick={() =>
                            (window.location.hash = `neuer-post/${subject}`)
                        }
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
                        Neuen Post hinzufügen
                    </button>
                ) : (
                    "Du musst angemeldet sein, um einen Post schreiben zu können."
                )}
            </div>
            {html.length ? html : "Noch keine Forum-Posts hier."}
        </div>
    );
}
