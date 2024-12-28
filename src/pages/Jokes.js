import React, { useState, useEffect } from "react";
import db, { auth } from "../db";
import { onValue, ref } from "firebase/database";
import nameFromEMail from "../nameFromEMail";
import CreateJoke from "../components/CreateJoke";

export default function Jokes() {
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
                                <q>{joke.text}</q> <br />
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
