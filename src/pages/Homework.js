// a component that displays a list of homework fetched from firebase if they aren't already marked as done
// and allows the user to mark them as done

import db, { auth } from "../db";
import { useState, useEffect } from "react";
import { ref, onValue, set, get, push } from "firebase/database";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { beginWithCapital } from "../utils";

export default function Homework() {
    const [homework, setHomework] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formVisible, setFormVisible] = useState(false);
    const subject = useParams().subject;
    useEffect(() => {
        const homeworkRef = ref(db, `homework/${subject}-homework`);
        const unsubscribe = onValue(homeworkRef, (snapshot) => {
            const homeworkList = [];
            snapshot.forEach((child) => {
                let newHomework = {
                    id: child.key,
                    ...child.val(),
                };
                newHomework.doneby = newHomework.doneby || [];
                homeworkList.push(newHomework);
            });
            setHomework(homeworkList);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [subject]);
    const addOrRemove = (array, value) => {
        var index = array.indexOf(value);

        if (index === -1) {
            array.push(value);
        } else {
            array.splice(index, 1);
        }
    };
    const toggleAsDone = (id) => {
        const homeworkRefDoneby = ref(
            db,
            `homework/${subject}-homework/${id}/doneby`
        );
        get(homeworkRefDoneby).then((snapshot) => {
            console.log(snapshot.val());
            const newDoneby = snapshot.val() || [];
            addOrRemove(newDoneby, auth.currentUser.email);
            set(homeworkRefDoneby, newDoneby);
        });
    };

    if (loading) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }

    return (
        <div className="container">
            <h1>{beginWithCapital(subject)}-Hausaufgaben</h1>
            {auth.currentUser && (
                <div className="text-end">
                    {formVisible && (
                        <form className="d-flex w-75">
                            <div className="form-group input-field w-75">
                                <textarea
                                    name="homework"
                                    id="homework"
                                    className="form-control"
                                ></textarea>
                                <label htmlFor="homework">Hausaufgabe</label>
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const homeworkRef = push(
                                        ref(db, `homework/${subject}-homework`)
                                    );
                                    const newHomework = {
                                        content:
                                            document.getElementById("homework")
                                                .value,
                                    };
                                    set(homeworkRef, newHomework);
                                    setFormVisible(false);
                                }}
                            >
                                Speichern
                            </button>
                        </form>
                    )}
                    <button
                        onClick={() => setFormVisible(!formVisible)}
                        className="btn"
                    >
                        <i
                            className="text-success border rounded-circle d-inline-block"
                            style={{
                                cursor: "pointer",
                                width: "40px",
                                height: "40px",
                                borderColor: "lime !important",
                            }}
                        >
                            <img src="/add.svg" alt="Neuen Witz hinzufügen" />
                        </i>{" "}
                        Neue Hausaufgabe hinzufügen
                    </button>
                </div>
            )}
            <ul>
                {homework.map((hw) => {
                    console.log(hw);
                    return (
                        <li key={hw.id}>
                            <span className="me-3">{hw.content}</span>
                            {auth.currentUser && (
                                <span>
                                    <input
                                        type="checkbox"
                                        id="mark-as-done"
                                        onChange={() => {
                                            console.log(hw.id);
                                            toggleAsDone(hw.id);
                                        }}
                                        className="form-check-inline me-0 border-primary border-2 form-check-input d-inline"
                                        defaultChecked={
                                            auth.currentUser &&
                                            hw.doneby.includes(
                                                auth.currentUser.email
                                            )
                                        }
                                    />{" "}
                                    Gemacht
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
