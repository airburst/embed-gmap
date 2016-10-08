export const flatten = (array) => {
    return [].concat.apply([], array);
};

export const replaceAll = (find: string, replace: string, fullText: string): string => {
    return fullText.replace(new RegExp(find, 'g'), replace);
}

export const lastPathInUrl = (url) => {
    let parts = url.split('/');
    return parts[parts.length - 1];
}
