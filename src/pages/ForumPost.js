import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import db from "../db";
import nameFromEMail from "../utils";
import Spinner from "react-bootstrap/Spinner";

export default function ForumPost() {
    const [post, setPost] = useState(null);
    const subject = useParams().subject;
    const key = useParams().key;
    useEffect(() => {
        const dbRef = ref(db, `${subject}-posts/${key}`);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            setPost(data);
        });
    }, [subject, key]);
    if (!post) {
        return <Spinner />;
    }
    return (
        <div className="forum-post">
            <h1>{post.title}</h1>
            <small>
                am {new Date(post.posted_at).toLocaleString()}
                <br />
                {post.author !== "Anonym"
                    ? "von " + nameFromEMail(post.author)
                    : ""}
            </small>
            <div>{post.content}</div>
        </div>
    );
}
//
