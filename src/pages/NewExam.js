import { push, ref } from "firebase/database";
import { subjects } from "./SubjectForums";
import db from "../db";
export default function NewExam() {
    return (
        <div className="container">
            <h1>Neuen Test / neue Klassenarbeit ankündigen</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const subject = e.target.subject.value;
                    const is_test = Boolean(parseInt(e.target.isTest.value));
                    const date = new Date(e.target.date.value).getTime();
                    push(ref(db, "exams"), {
                        subject,
                        is_test,
                        is_at: date,
                    }).then(() => window.history.back());
                }}
            >
                <div className="form-group m-3">
                    <label htmlFor="subject" className="form-label">
                        Fach:
                    </label>
                    <select
                        name="subject"
                        id="subject"
                        className="form-control form-select"
                        required
                    >
                        {subjects.map((subject) => (
                            <option key={subject.id} value={subject.name}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group m-3">
                    <label htmlFor="isTest" className="form-label">
                        Art:
                    </label>
                    <select
                        name="isTest"
                        id="isTest"
                        className="form-control form-select"
                        required
                    >
                        <option value="1">Test</option>
                        <option value="0">Klassenarbeit</option>
                    </select>
                </div>
                <div className="form-group m-3">
                    <label htmlFor="isAt">Datum: </label>
                    <input
                        type="date"
                        name="date"
                        id="isAt"
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Ankündigen
                </button>
            </form>
        </div>
    );
}
