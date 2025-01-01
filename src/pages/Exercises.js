// a component that takes a subject from the URL and renders a list of exercises fetched from the firebase realtime db

import { useEffect, useState } from "react";
import {
    ref,
    onValue,
    limitToLast,
    query,
    remove,
    update,
    push,
} from "firebase/database";
import db, { auth } from "../db";
import "../styles/Exercises.css";
import { Accordion, Alert, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { beginWithCapital } from "../utils";
import TrashCanIcon from "../components/TrashCanIcon";

const CAN_PERFORM_CUD = ["artem.kort@stiftsgymnasium.de"];
export default function Exercises() {
    const [exercises, setExercises] = useState(null);
    const [success, setSuccess] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const subject = useParams().subject;
    useEffect(() => {
        const exercisesListRef = ref(db, `exercises/${subject}`);
        onValue(query(exercisesListRef, limitToLast(8)), (snapshot) => {
            let dataGot = [];
            snapshot.forEach((child) => {
                dataGot.push({
                    id: child.key,
                    ...child.val(),
                });
            });
            setExercises(dataGot);
        });
    }, [subject]);
    if (exercises === null) {
        return <Spinner />;
    }
    return (
        <div className="container">
            <h1>{beginWithCapital(subject)}-Übungen</h1>
            {auth.currentUser &&
                CAN_PERFORM_CUD.includes(auth.currentUser.email) && (
                    <button
                        onClick={() => setFormVisible(!formVisible)}
                        className="btn"
                    >
                        <i
                            className="border rounded-circle d-inline-block"
                            style={{
                                cursor: "pointer",
                                width: "40px",
                                height: "40px",
                                borderColor: "lime !important",
                            }}
                        >
                            <img src="/add.svg" alt="Neuen Witz hinzufügen" />
                        </i>{" "}
                        Neue Übung hinzufügen
                    </button>
                )}
            {formVisible && (
                <form
                    className="border border-1 p-4 w-50 rounded rounded-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const title = e.target.title.value;
                        const content = e.target.content.value;
                        const answer = e.target.answer.value;
                        push(ref(db, `exercises/${subject}`), {
                            title,
                            content,
                            answer,
                        });
                        setFormVisible(false);
                    }}
                >
                    <div className="form-group form-floating">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="form-control"
                        />
                        <label htmlFor="title">Name der Übung</label>
                    </div>
                    <br />
                    <div className="form-group form-floating">
                        <textarea
                            id="content"
                            name="content"
                            required
                            className="form-control"
                        />
                        <label htmlFor="content">Inhalt der Übung</label>
                    </div>
                    <br />
                    <div className="form-group form-floating">
                        <input
                            type="text"
                            id="answer"
                            name="answer"
                            className="form-control"
                        />
                        <label htmlFor="answer">Antwort (optional)</label>
                    </div>
                    <button type="submit" className="btn btn-primary m-2">
                        Übung hinzufügen
                    </button>
                </form>
            )}
            <div id="exercises">
                {exercises.map((exercise) => (
                    <div
                        key={exercise.id}
                        className="border border-1 rounded rounded-3 post p-4 w-50"
                    >
                        <h4>{exercise.title}</h4>
                        <hr />
                        {exercise.content}
                        <br />
                        {auth.currentUser &&
                            CAN_PERFORM_CUD.includes(
                                auth.currentUser.email
                            ) && (
                                <div>
                                    <hr />

                                    <span
                                        className="text-danger"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            if (
                                                window.confirm(
                                                    "Sind Sie sicher, dass Sie diese Übung löschen möchten?"
                                                )
                                            ) {
                                                remove(
                                                    ref(
                                                        db,
                                                        `exercises/${subject}/${exercise.id}`
                                                    )
                                                );
                                            }
                                        }}
                                    >
                                        <TrashCanIcon
                                            style={{
                                                fill: "red",
                                            }}
                                            width="20"
                                            className="m-2 me-1"
                                        />{" "}
                                        löschen
                                    </span>
                                </div>
                            )}
                        <Accordion>
                            {auth.currentUser &&
                                CAN_PERFORM_CUD.includes(
                                    auth.currentUser.email
                                ) &&
                                auth.currentUser.email && (
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            Übung bearbeiten
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    const title =
                                                        e.target.title.value;
                                                    const content =
                                                        e.target.content.value;
                                                    update(
                                                        ref(
                                                            db,
                                                            `exercises/${subject}/${exercise.id}`
                                                        ),
                                                        {
                                                            title,
                                                            content,
                                                            answer: e.target
                                                                .answer.value,
                                                        }
                                                    ).then(() => {
                                                        setSuccess(true);
                                                        setTimeout(() => {
                                                            setSuccess(false);
                                                        }, 5000);
                                                    });
                                                }}
                                            >
                                                <br />
                                                <h4>Bearbeiten</h4>
                                                {success && (
                                                    <Alert
                                                        variant="success"
                                                        onClose={() => {
                                                            setSuccess(false);
                                                        }}
                                                        dismissible
                                                    >
                                                        Änderungen erfolgreich
                                                    </Alert>
                                                )}
                                                <br />
                                                <div className="form-group form-floating">
                                                    <input
                                                        type="text"
                                                        id="title"
                                                        name="title"
                                                        required
                                                        className="form-control"
                                                        defaultValue={
                                                            exercise.title
                                                        }
                                                    />
                                                    <label htmlFor="title">
                                                        Name der Übung
                                                    </label>
                                                </div>
                                                <br />
                                                <div className="form-group form-floating">
                                                    <textarea
                                                        id="content"
                                                        name="content"
                                                        required
                                                        defaultValue={
                                                            exercise.content
                                                        }
                                                        className="form-control"
                                                    />
                                                    <label htmlFor="content">
                                                        Inhalt der Übung
                                                    </label>
                                                </div>
                                                <br />
                                                <div className="form-group form-floating">
                                                    <input
                                                        type="text"
                                                        id="answer"
                                                        name="answer"
                                                        className="form-control"
                                                        defaultValue={
                                                            exercise.answer
                                                        }
                                                    />
                                                    <label htmlFor="answer">
                                                        Antwort (optional)
                                                    </label>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary m-2"
                                                >
                                                    Änderungen bestätigen
                                                </button>
                                            </form>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                )}
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    Antwort überprüfen
                                </Accordion.Header>
                                <Accordion.Body>
                                    {exercise.answer
                                        ? exercise.answer
                                        : "Keine Antwort gegeben"}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                ))}
            </div>
        </div>
    );
}
