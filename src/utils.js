export default function nameFromEMail(email) {
    const name = email.split(".")[0].replace(email[0], email[0].toUpperCase());
    if (name === "Artem") {
        return "Arti";
    }
    return name;
}
/**
 *
 * @param {String} str
 */
export const beginWithCapital = (str) => {
    return str[0].toUpperCase() + str.slice(1);
};
/**
 *
 * @param {Date} date
 */
export const formatDate = (date) => {
    return `Um ${date.getHours()}:${
        date.getMinutes() < 10
            ? "0".concat(date.getMinutes().toString())
            : date.getMinutes()
    } am ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};
