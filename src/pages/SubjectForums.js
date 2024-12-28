// a basic component that renders a link to the forum for each subject

import "../styles/SubjectForums.css";
import React from "react";
import { Link } from "react-router-dom";

export default function SubjectForums() {
    // all subjects that can be in a german school 6th grade
    const subjects = [
        { id: "deutsch", name: "Deutsch", color: "red" },
        { id: "mathe", name: "Mathe", color: "blue" },
        { id: "englisch", name: "Englisch", color: "green" },
        { id: "geschichte", name: "Historie", color: "yellow" },
        { id: "bio", name: "Biologie", color: "lime" },
        { id: "physik", name: "BNT-T", color: "cyan" },
        // { id: 'chemie', name: 'Chemie' },
        // { id: 'informatik', name: 'Informatik' },
        { id: "musik", name: "Musik", color: "skyblue" },
        { id: "kunst", name: "Kunst", color: "pink" },
        { id: "sport", name: "Sport", color: "orange" },
        { id: "NWT", name: "NWT", color: "black" },
        { id: "ethik", name: "Ethik/Reli", color: "purple" },
        { id: "geographie", name: "Geo", color: "brown" },
    ];
    return (
        <div className="container">
            <h1>Ein Forum + Hausaufgabenliste für jedes Fach</h1>
            <div className="d-flex flex-wrap">
                {subjects.map((subject) => (
                    <div
                        key={subject.id}
                        className="border border-1 rounded rounded-3 d-flex subject-item"
                    >
                        <div
                            className={`h-100 w-25 d-flex align-items-center justify-content-center ${
                                [
                                    "NWT",
                                    "Mathe",
                                    "Englisch",
                                    "Ethik/Reli",
                                    "Geo",
                                ].includes(subject.name)
                                    ? "text-white"
                                    : "text-dark"
                            }`}
                            style={{ background: subject.color }}
                        >
                            {subject.name}
                        </div>
                        <Link
                            to={`/forum/${subject.id}`}
                            className="d-inline me-3"
                        >
                            Forum
                        </Link>
                        {!["Sport", "Kunst", "Ethik/Reli"].includes(
                            subject.name
                        ) && (
                            <Link
                                to={`/homework/${subject.id}`}
                                className="d-inline"
                            >
                                Hausaufgaben
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
