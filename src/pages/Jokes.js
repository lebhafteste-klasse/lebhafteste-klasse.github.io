import React, { useState, useEffect } from "react";
import db, { auth } from "../db";
import { limitToLast, onValue, query, ref } from "firebase/database";
import nameFromEMail from "../utils";
import CreateJoke from "../components/CreateJoke";
import { Spinner } from "react-bootstrap";

function Jokes() {
    const [jokes, setJokes] = useState([]);
    useEffect(() => {
        const jokesRef = ref(db, "jokes");
        onValue(jokesRef, (snapshot) => {
            const jokes = snapshot.val();
            const jokesList = [];
            for (let id in jokes) {
                jokesList.push(jokes[id]);
            }
            setJokes(jokesList);
        });
    }, []);

    return (
        <div className="container">
            <div>
                {auth.currentUser ? (
                    <CreateJoke />
                ) : (
                    <p>Bitte melde dich an, bevor du Witze schreiben kannst.</p>
                )}
            </div>
            <div>
                <h1 key={"title"}>Witzeseite</h1>
                <h2 className="mb-4" key={"newest-jokes"}>
                    Unsere neuesten Witze:
                </h2>
            </div>
            <ul>
                {jokes.map((joke, index) => (
                    <>
                        {index < 10 && (
                            <li key={index}>
                                <q>{joke.text}</q>
                                <br />{" "}
                                <cite>- {nameFromEMail(joke.author)}</cite>
                            </li>
                        )}
                    </>
                ))}
                {jokes.length >= 10 && <h2>Die schon älteren</h2>}
                {jokes.map((joke, index) => (
                    <>
                        {index >= 10 && (
                            <li key={index}>
                                <q>{joke.text}</q>
                                <br />{" "}
                                <cite>- {nameFromEMail(joke.author)}</cite>
                            </li>
                        )}
                    </>
                ))}
            </ul>
        </div>
    );
}
export function JokesForHomePage() {
    const [loading, setLoading] = useState(true);
    const [jokes, setJokes] = useState([]);
    useEffect(() => {
        const jokesRef = ref(db, "jokes");
        onValue(query(jokesRef, limitToLast(7)), (snapshot) => {
            const jokesList = [];
            snapshot.forEach((child) => {
                jokesList.push({ id: child.key, ...child.val() });
            });
            setJokes(jokesList);
            setLoading(false);
        });
    }, []);
    if (loading) return <Spinner />;
    return (
        <div className="container">
            <h2>Unsere neuesten Witze:</h2>
            <ul>
                {jokes.map((val, index) => (
                    <li key={`joke-${index}`}>
                        <q>{val.text}</q> <br />{" "}
                        <small>von {nameFromEMail(val.author)}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Jokes;
