import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ref, onValue, limitToLast, query, remove } from "firebase/database";
import { Spinner } from "react-bootstrap";
import db, { auth } from "../db";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../styles/custom-arrows.css";
import { formatDate } from "../utils";
import { PrevArrow, NextArrow } from "../components/Arrows";
import PencilIcon from "../components/PencilIcon";
import TrashCanIcon from "../components/TrashCanIcon";
const News = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const newsListRef = ref(db, "news");

        onValue(query(newsListRef, limitToLast(8)), (snapshot) => {
            let dataGot = [];
            snapshot.forEach((child) => {
                dataGot.push({
                    id: child.key,
                    ...child.val(),
                });
                setData(dataGot);
            });
        });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    if (!data) {
        return <Spinner />;
    }

    return (
        <div style={{ width: "80%", margin: "auto" }}>
            <Slider {...settings}>
                {data.map((news) => (
                    <div key={news.id} className="card border border-1 m-2">
                        <div className="card-body w-75">
                            <Link to={`/news/${news.id}`}>
                                <h3>{news.name}</h3>
                            </Link>
                            <p className="fs-6">
                                {formatDate(new Date(news.posted_at))}
                            </p>
                            {auth.currentUser &&
                                auth.currentUser.email === news.author && (
                                    <div>
                                        <Link to={`/edit-news/${news.id}`}>
                                            <PencilIcon
                                                strokeWidth="2"
                                                fill="orange"
                                                width="25"
                                                height="25"
                                                className="mx-2"
                                                aria-label="Witz ändern"
                                                style={{ cursor: "pointer" }}
                                            />
                                        </Link>
                                        <TrashCanIcon
                                            fill="red"
                                            width="25"
                                            height="25"
                                            aria-label="Witz löschen"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                remove(
                                                    ref(db, `news/${news.id}`)
                                                )
                                            }
                                        />
                                    </div>
                                )}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default News;
