export default function nameFromEMail(email) {
    const name = email.split(".")[0].replace(email[0], email[0].toUpperCase());
    if (name === "Artem") {
        return "Arti";
    }
    return name;
}
