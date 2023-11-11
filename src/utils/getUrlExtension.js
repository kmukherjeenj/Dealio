export const getUrlExtension = url => {
    return url.split(/[#?]/)[0].split('.').pop().trim();
};
