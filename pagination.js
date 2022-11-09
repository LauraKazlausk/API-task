import { createElement } from "./functions.js";

export default function paginationLinks(data) {
    let { page, limit, total} = data
    // let total = 100;
    let pages = Math.ceil(total / limit);
    let currentPage = Number(page);
    
    let paginationWrapper = createElement('div', '', 'pagination-wrapper');

    const firstPaginationLink = createPaginationLinkElement ({
        currentPage,
        page:1,
        className: 'first-page-link',
        text:'First page',
        pageLink: 1,
        limit
    });   
    const  previousPageLink = createPaginationLinkElement({
        currentPage,
        page: 1,
        className: 'previous-page-link',
        text: '<<Previous >>',
        pageLink: currentPage - 1,
        limit
    });

     paginationWrapper.prepend(firstPaginationLink, previousPageLink)

  
    for (let i = 1 ; i <= pages ; i++ ){
        const paginationElement = createPaginationLinkElement({
            currentPage,
            page: i,
            text: i,
            pageLink: i,
            limit
        });
        paginationWrapper.append(paginationElement)
    }
    const nextPaginationLink = createPaginationLinkElement({
        currentPage,
        page: pages,
        className:'next-page-link',
        text: '<<Next>>',
        pageLink: currentPage + 1,
        limit
    });
    const lastPaginationLink = createPaginationLinkElement ({
        currentPage,
        page: pages,
        className: 'last-page-link',
        text: 'Last page',
        pageLink:pages,
        limit
    })
    paginationWrapper.append( nextPaginationLink, lastPaginationLink)

    return paginationWrapper
}

function createPaginationLinkElement (data){
    // if(!currentPage || !page || !!text || !pageLink){
    //     return '';
    // }
    let {currentPage, page, className, text, pageLink, limit} = data;

    const pathName = document.location.pathname;
    console.log(pathName)
    const origin = document.location.origin;
    console.log(origin)
    
    let paginationElement ;

    if (currentPage === page){
        paginationElement = createElement('span',  text, 'pagination-link current-page-link');
    }else{
        paginationElement = createElement('a',  text, 'pagination-link')
        paginationElement.href = origin + pathName +`?page=${pageLink}&limit=${limit}`;
    }
if (className){
    paginationElement.classList.add(className)
}

return paginationElement;

}


// origin + pathName +