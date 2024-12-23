import AOS from "aos";
import "aos/dist/aos.css";
import News from "../pages/News";
// filepath: /c:/Users/Huawei/Desktop/Артём/Klassenwebsite/project/src/index.js

const Index = function () {
    AOS.init();

    return (
        <main>
            <div
                id="image"
                class="d-flex m-5 px-3 flex-column justify-content-center align-items-center"
            >
                Die lebhafteste Klasse am Stifts.
                <div class="text-center">
                    <b>6D</b>
                </div>
            </div>
            <div data-aos="fade-right" class="container">
                <h2>Unsere Neuigkeiten:</h2>
                <div>
                    <News />
                </div>
            </div>
        </main>
    );
};
export default Index;
