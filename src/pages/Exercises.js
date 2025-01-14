// a component that takes a subject from the URL and renders a list of exercises fetched from the firebase realtime db

import { useEffect, useState } from "react";
import {
    ref,
    onValue,
    limitToLast,
    query,
    remove,
    push,
} from "firebase/database";
import db, { auth } from "../db";
import "../styles/Exercises.css";
import { Accordion, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { beginWithCapital } from "../utils";
import TrashCanIcon from "../components/TrashCanIcon";
import ExerciseEditForm from "../components/ExerciseEditForm";

const CAN_PERFORM_CUD = ["artem.kort@stiftsgymnasium.de"];
export default function Exercises() {
    const [exercises, setExercises] = useState(null);
    const [formVisible, setFormVisible] = useState(false);
    const [formIsNormal, setFormIsNormal] = useState(true);
    const [questions, setQuestions] = useState([
        { question: "", answers: [{ right: false, text: "" }] },
    ]);
    const subject = useParams().subject;

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: "", answers: [] }]);
    };

    const handleQuestionTextChange = (index, text) => {
        const newQuestions = [...questions];
        newQuestions[index].question = text;
        setQuestions(newQuestions);
    };
    const handleQuestionAnswerAdd = (index) => {
        const newQuestions = [...questions];

        newQuestions[index].answers.push({ right: false, text: "" });
        setQuestions(newQuestions);
    };
    const handleQuestionAnswerChange = (index, qindex, right, text) => {
        const newQuestions = [...questions];
        newQuestions[index].answers[qindex] = { right, text };
        setQuestions(newQuestions);
    };
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
            {auth.currentUser && formVisible && (
                <form
                    className="border border-1 p-4 w-100 rounded rounded-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (formIsNormal) {
                            const title = e.target.title.value;
                            const content = e.target.content.value;
                            const answer = e.target.answer.value;
                            push(ref(db, `exercises/${subject}`), {
                                title,
                                content,
                                answer,
                                author: auth.currentUser.email,
                            });
                        } else {
                            const title = e.target.title.value;
                            push(ref(db, `exercises/${subject}`), {
                                title,
                                questions,
                                type: "quiz",
                                author: auth.currentUser.email,
                            });
                        }
                        setFormVisible(false);
                    }}
                >
                    <select
                        id="type"
                        className="form-select mb-4"
                        onChange={(e) =>
                            setFormIsNormal(!!parseInt(e.currentTarget.value))
                        }
                        name="type"
                    >
                        <option value="1">Normal (Frage - Antwort)</option>
                        <option value="0">Quiz</option>
                    </select>
                    {formIsNormal ? (
                        <div>
                            <h2>Normale Übung</h2>
                            <div className="form-group form-floating">
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    placeholder=" "
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
                                    placeholder=" "
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
                                    placeholder=" "
                                    name="answer"
                                    className="form-control"
                                />
                                <label htmlFor="answer">
                                    Antwort (optional)
                                </label>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2>Quiz</h2>
                            <div className="form-group form-floating">
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    className="form-control"
                                />
                                <label htmlFor="title">Was wird geübt?</label>
                            </div>
                            <br />
                            <h3>Die Quizfragen</h3>
                            {questions.map((q, index) => (
                                <div
                                    key={index}
                                    className="border border-1 rounded rounded-3 p-3"
                                >
                                    <h2>Frage {index + 1}</h2>
                                    <div className="form-group form-floating mt-4">
                                        <input
                                            type="text"
                                            defaultValue={q.question}
                                            id={`${index}-q`}
                                            className="form-control"
                                            placeholder=" "
                                            onChange={(e) =>
                                                handleQuestionTextChange(
                                                    index,
                                                    e.currentTarget.value
                                                )
                                            }
                                            required
                                        />
                                        <label htmlFor={`${index}-q`}>
                                            Die Frage
                                        </label>
                                    </div>
                                    <hr />
                                    <fieldset className="p-2 my-3">
                                        <legend>Antwortoptionen</legend>
                                        {q.answers.map((a, i) => (
                                            <div
                                                key={i}
                                                className="border border-1 rounded rounded-3 p-3"
                                            >
                                                <h4>Antwort {i + 1}</h4>
                                                <div className="form-group form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        defaultValue={a.text}
                                                        className="form-control"
                                                        placeholder=" "
                                                        id={`${index}-answer${i}`}
                                                        onChange={(e) =>
                                                            handleQuestionAnswerChange(
                                                                index,
                                                                i,
                                                                !!a.right,
                                                                e.currentTarget
                                                                    .value
                                                            )
                                                        }
                                                        required
                                                    />
                                                    <label
                                                        htmlFor={`${index}-answer${i}`}
                                                    >
                                                        Textinhalt
                                                    </label>
                                                </div>
                                                <div className="form-group form-check">
                                                    <input
                                                        type="checkbox"
                                                        id={`${index}-answer${i}-right`}
                                                        className="form-control form-check-input mx-1"
                                                        defaultChecked={a.right}
                                                        onChange={(e) =>
                                                            handleQuestionAnswerChange(
                                                                index,
                                                                i,
                                                                e.currentTarget
                                                                    .checked,
                                                                a.text
                                                                    ? a.text
                                                                    : ""
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`${index}-answer${i}-right`}
                                                        className="form-label form-check-label"
                                                    >
                                                        Richtig
                                                    </label>
                                                </div>
                                                {i > 0 && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger m-3"
                                                        onClick={() => {
                                                            const newQuestions =
                                                                [...questions];
                                                            newQuestions[
                                                                index
                                                            ].answers =
                                                                q.answers
                                                                    .slice(
                                                                        0,
                                                                        index
                                                                    )
                                                                    .concat(
                                                                        ...q.answers.slice(
                                                                            index +
                                                                                1
                                                                        )
                                                                    );
                                                            setQuestions(
                                                                newQuestions
                                                            );
                                                        }}
                                                    >
                                                        Diese Antwortmöglichkeit
                                                        löschen
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleQuestionAnswerAdd(index)
                                            }
                                            className="btn btn-outline-success m-3"
                                        >
                                            Antwort hinzufügen
                                        </button>
                                    </fieldset>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger m-3"
                                        onClick={() => {
                                            let newQuestions = questions;
                                            newQuestions = newQuestions
                                                .slice(0, index)
                                                .concat(
                                                    questions.slice(index + 1)
                                                );
                                            setQuestions(newQuestions);
                                        }}
                                    >
                                        Diese Frage löschen
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddQuestion}
                                className="btn btn-outline-success m-3"
                            >
                                Frage hinzufügen
                            </button>
                        </div>
                    )}

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
                        {!(exercise.type && exercise.type === "quiz") ? (
                            exercise.content
                        ) : (
                            <>
                                {exercise.questions.map((question, i) => (
                                    <div
                                        key={i}
                                        className="border border-1 rounded rounded-3 p-4"
                                    >
                                        {question.question}
                                        {question.answers.map(
                                            (option, index) => {
                                                return (
                                                    <div className="d-flex">
                                                        <input
                                                            type="radio"
                                                            name={`${i}-answer`}
                                                            id={`${question.question}-answer-${index}`}
                                                            onClick={(e) => {
                                                                const img =
                                                                    e
                                                                        .currentTarget
                                                                        .nextSibling
                                                                        .nextSibling;
                                                                const span =
                                                                    img.nextSibling;
                                                                img.src =
                                                                    option.right
                                                                        ? "/right.svg"
                                                                        : "/wrong.svg";
                                                                img.hidden = false;
                                                                span.textContent =
                                                                    option.right
                                                                        ? "Richtig!"
                                                                        : "Falsch.";
                                                                span.setAttribute(
                                                                    "class",
                                                                    `fs-5 ${
                                                                        option.right
                                                                            ? "text-success"
                                                                            : "text-danger"
                                                                    }`
                                                                );
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={`${question.question}-answer-${index}`}
                                                        >
                                                            {option.text}
                                                        </label>
                                                        <img
                                                            src={null}
                                                            alt="Richtig oder falsch"
                                                            hidden
                                                        />
                                                        <span className="fs-5"></span>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                ))}
                            </>
                        )}
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
                                            remove(
                                                ref(
                                                    db,
                                                    `exercises/${subject}/${exercise.id}`
                                                )
                                            );
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
                        {!(exercise.type && exercise.type === "quiz") && (
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
                                                <ExerciseEditForm
                                                    exercise={exercise}
                                                    subject={subject}
                                                />
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
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
