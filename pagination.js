import { createElement } from "./functions.js";

export default function paginationLinks(page) {
 let total = 100;
 let limit = 25;
 let pages = Math.ceil(total / limit);

    let paginationWrapper = createElement('div', '', 'pagination-wrapper');

    for (let i = 1 ; i <= pages ; i++ ){

if (page == i){
    let paginationElements = createElement('span', i, 'pagination-link-page');
    paginationWrapper.append(paginationElements)
}else {
    let paginationLink = createElement('a',i, 'page-pagination');
    paginationLink.href = './posts.html?page=' + i;
    paginationWrapper.append(paginationLink);
}

    }

if(page == 1){
    let firstPageElement = createElement('span','<First page>', 'first-page-link');
    paginationWrapper.prepend(firstPageElement)
}else {
    let firstPage = createElement('a', '<First page>', 'first-page-link')
    firstPage.href = `./posts.html?page=1`;
    paginationWrapper.prepend(firstPage)
}


if (page == pages){
    let lastPageElement = createElement('span', '<Last page>', 'last-page-link');
    paginationWrapper.append(lastPageElement)
}else{
    let lastPage = createElement('a', '<Last page>', 'last-page-link')
    lastPage.href = `./posts.html?page=${pages}`;
    paginationWrapper.append(lastPage)
}
    return paginationWrapper
}