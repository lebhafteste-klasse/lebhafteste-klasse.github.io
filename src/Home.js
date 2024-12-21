import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

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
            <Link to={"/news"}>
                <div
                    className="border border-3 border-success p-3 rounded rounded-5 w-25 py-5 text-center m-5 text-success"
                    data-aos="fade-right"
                >
                    <span className="text-decoration-none">Klassennews</span>
                </div>
            </Link>
        </main>
    );
};
export default Index;
