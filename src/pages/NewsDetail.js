import { ref } from "firebase/database";
import { Spinner } from "react-bootstrap";
import db from "../db";
import { useState, useEffect } from "react";
import { onValue } from "firebase/database";
import { Link, useParams } from "react-router-dom";

export default function NewsDetail() {
    const newsId = useParams().id;
    const [news, setNews] = useState({});
    useEffect(() => {
        const dbRef = ref(db, `news/${newsId}`);
        onValue(dbRef, (snapshot) => {
            setNews(snapshot.val());
        });
    }, []);
    if (!Object.keys(news).length) {
        return <Spinner />;
    }

    return (
        <div>
            <div className="fw-bolder">
                <Link to={"/"}>← Zurück</Link>
            </div>
            <h1>{news.name}</h1>
            <div dangerouslySetInnerHTML={{ __html: news.content }}></div>
        </div>
    );
}
