export const makeShort = (str, num) => {
    if (str && str.length > num) {
        return str.substring(0, num) + '...';
    } else {
        return str;
    }
};
