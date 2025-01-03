// import AOS from "aos";
// import "aos/dist/aos.css";
import Exams from "../components/Exams";
import News from "../pages/News";
import { JokesForHomePage } from "./Jokes";

const Index = function () {
    // AOS.init();

    return (
        <main>
            <div
                id="image"
                className="d-flex m-5 px-3 flex-column justify-content-center align-items-center"
            >
                Die lebhafteste Klasse am Stifts.
                <div className="text-center">
                    <b>6D</b>
                </div>
            </div>
            <div data-aos="fade-right" className="container">
                <h2>Unsere Neuigkeiten:</h2>
                <div>
                    <News />
                </div>
            </div>
            <Exams />
            <JokesForHomePage />
        </main>
    );
};
export default Index;
