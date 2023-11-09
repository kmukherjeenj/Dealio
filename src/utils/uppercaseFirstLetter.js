export const FirstUpperCase = str => {
    return str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
};
