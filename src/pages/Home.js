import AOS from "aos";
import "aos/dist/aos.css";
import News from "../pages/News";
const Index = function () {
    AOS.init();
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
            <div>
                <h2>Unsere Neuigkeiten:</h2>
                <News />
            </div>
        </main>
    );
};
export default Index;
