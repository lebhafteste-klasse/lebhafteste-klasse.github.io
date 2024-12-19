import { Routes, Route, HashRouter } from "react-router-dom";
import Wrapper from "./Wrapper";
import db from "./db";
import { ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import Login from "./Login";
const Index = function () {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Initialize the Firebase database with the provided configuration

        // Reference to the specific collection in the database
        const collectionRef = ref(db, "news");

        // Function to fetch data from the database
        const fetchData = () => {
            // Listen for changes in the collection
            onValue(collectionRef, (snapshot) => {
                snapshot.toJSON();
                const dataItem = snapshot.val();
                console.log(snapshot.toJSON());

                // Check if dataItem exists
                if (dataItem) {
                    // Convert the object values into an array
                    const displayItem = Object.values(dataItem);
                    setData(displayItem);
                }
            });
        };

        // Fetch data when the component mounts
        fetchData();
    }, []);

    return (
        <div>
            <h1>Data from database:</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        Am {new Date(item.posted_at).toTimeString()}
                        <div
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        ></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
const TestPage = function () {
    return <h1>Test</h1>;
};
function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Wrapper component={<Index />} />} />
                <Route path="/test" element={<TestPage />} />
                <Route
                    path="/login"
                    element={<Wrapper component={<Login />} />}
                />
            </Routes>
        </HashRouter>
    );
}

export default App;
