import { useEffect, useState } from "react";
import db from "./db";
import { ref, push, onValue, limitToLast, query } from "firebase/database";

const News = () => {
    const [data, setData] = useState([]);
    const newsListRef = ref(db, "news");

    useEffect(() => {
        newFunction();

        function newFunction() {
            onValue(query(newsListRef, limitToLast(8)), (snapshot) => {
                if (snapshot.val()) setData(Object.values(snapshot.val()));
            });
        }
    }, []);
    console.log(data);
    return <p>News</p>;
};
export default News;
