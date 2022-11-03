export function firstLetterUpperCase(text){
    return text[0].toUpperCase() + text.slice(1);
}

export function getUrlParam(searchText){
    const queryParams = document.location.search;
    const urlParams = new URLSearchParams(queryParams);
    const result = urlParams.get(searchText);
    return result;
}