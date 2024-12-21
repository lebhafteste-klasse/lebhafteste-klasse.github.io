import { Routes, Route, HashRouter } from "react-router-dom";
import Wrapper from "./Wrapper";
import db from "./db";
import { ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import Login from "./Login";
import { ThemeContext } from "./context";
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
                const dataItem = snapshot.val();

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
        <main>
            <div
                id="image"
                class="d-flex px-3 flex-column justify-content-center align-items-center"
            >
                Die lebhafteste Klasse am Stifts.
                <div class="text-center">
                    <b>6D</b>
                </div>
            </div>
        </main>
    );
};
const TestPage = function () {
    return <h1>Test</h1>;
};

function App() {
    return (
        <ThemeContext.Provider value={localStorage.getItem("theme") || "light"}>
            <HashRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Wrapper component={<Index />} />}
                    />
                    <Route path="/test" element={<TestPage />} />
                    <Route
                        path="/login"
                        element={<Wrapper component={<Login />} />}
                    />
                </Routes>
            </HashRouter>
        </ThemeContext.Provider>
    );
}
export default App;
