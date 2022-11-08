import renderNavigation from './navigation.js';
import {createLinkList, fetchData, getUrlParam, createElement} from './functions.js';
import paginationLinks from './pagination.js';



async function init() {
    const userId = getUrlParam('user_id')
    const page = getUrlParam('page')
  
    let fetchUrl = '';
    if(userId){
        fetchUrl = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
    }else {
        fetchUrl = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=25` 
    }


    
    const posts = await fetchData(fetchUrl);

    let postWrapper = document.querySelector('#posts-wrapper');

    const pageTitle = createElement('h1', 'Posts List:', 'page-title')
    
    const postsListElement = createLinkList({
        data:posts,
        path: 'post',
        listClasses: ['posts-list'],
        itemClasses: ['post-item']
    });
    const pagination = paginationLinks(page);

    postWrapper.append(pageTitle,pagination, postsListElement);
    }

// function pagePeg (){


   
//     let fetchAddress = '';
//     const page = getUrlParam('page_id')
//     if(page==1){
//         fetchAddress = `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=25` 
//     }
//     if(page==2){
//         fetchAddress = `https://jsonplaceholder.typicode.com/posts?_page=2&_limit=25` 
//     }
//     if(page==3){
//         fetchAddress = `https://jsonplaceholder.typicode.com/posts?_page=3&_limit=25` 
//     }
//     if(page==4){
//         fetchAddress = `https://jsonplaceholder.typicode.com/posts?_page=4&_limit=25` 
//     }

//     let postWrapper = document.querySelector('#posts-wrapper');
//     postWrapper.append(page1, page2, page3, page4)
// }
    init()



    