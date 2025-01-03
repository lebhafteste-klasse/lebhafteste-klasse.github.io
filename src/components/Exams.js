import React, { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import db from "../db";
import { formatDate } from "../utils";

export default function Exams() {
    const [exams, setExams] = useState([]);
    useEffect(() => {
        const examsRef = ref(db, "exams");
        onValue(examsRef, (snapshot) => {
            let examsList = [];
            snapshot.forEach((childSnapshot) => {
                // if (childSnapshot.val().is_at > Date.now()) {
                examsList.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val(),
                });
                // }
            });
            setExams(examsList);
        });
    }, []);
    return (
        <div className="container">
            <h2>Unsere Tests & Klassenarbeiten:</h2>
            <ul>
                {exams.length ? (
                    exams.map((exam) => (
                        <li key={exam.id}>
                            {exam.subject}-
                            {exam.is_test ? "Test" : "Klassenarbeit"} <br />
                            <small>
                                {formatDate(new Date(exam.is_at), true, false)}
                            </small>
                        </li>
                    ))
                ) : (
                    <div>Keine Tests oder Klassenarbeiten angekündigt</div>
                )}
            </ul>
        </div>
    );
}
