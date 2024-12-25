import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ref, onValue, limitToLast, query } from "firebase/database";
import { Spinner } from "react-bootstrap";
import db from "../db";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../styles/custom-arrows.css";
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
    const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <img
                src="/prev.svg"
                className={`bg-primary d-inline ${className} custom-prev-arrow`}
                style={{ ...style, display: "block" }}
                onClick={onClick}
                alt="Zurück"
                width={30}
                height={30}
            />
        );
    };
    const NextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <img
                src="/next.svg"
                className={`bg-primary d-inline ${className} custom-next-arrow`}
                style={{ ...style, display: "block" }}
                onClick={onClick}
                alt="Vorwärts"
                width={30}
                height={30}
            />
        );
    };
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
                {data.map((news, index) => {
                    const date = new Date(news.posted_at);
                    const datestring = `Um ${date.getMinutes()}:${date.getHours()} am ${date.getDate()}.${
                        date.getMonth() + 1
                    }.${date.getFullYear()}`;
                    return (
                        <div key={index} className="card border border-1 m-2">
                            <div className="card-body w-75">
                                <Link to={`/news/${index}`}>
                                    <h3>{news.name}</h3>
                                </Link>
                                <p className="fs-6">{datestring}</p>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default News;
