import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ref, onValue, limitToLast, query } from "firebase/database";
import { Spinner } from "react-bootstrap";
import db from "../db";

const News = () => {
    const [data, setData] = useState(null);
    const newsListRef = ref(db, "news");

    useEffect(() => {
        fetchData();

        function fetchData() {
            onValue(query(newsListRef, limitToLast(8)), (snapshot) => {
                if (snapshot.val()) setData(Object.values(snapshot.val()));
            });
        }
    }, [new Date(Date.now()).getDay()]);

    if (!data) {
        return <Spinner />;
    }

    return (
        <div className="news-list">
            {data.map((news, index) => {
                const date = new Date(news.posted_at);
                const datestring = `Um ${date.getMinutes()}:${date.getHours()} am ${date.getDate()}.${
                    date.getMonth() + 1
                }.${date.getFullYear()}`;
                return (
                    <div
                        key={index}
                        className="news-item d-inline border border-1"
                    >
                        <Link to={`/news/${index}`}>
                            <h3>{news.name}</h3>
                        </Link>
                        <p className="fs-6">{datestring}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default News;
