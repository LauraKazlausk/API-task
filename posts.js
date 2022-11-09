import renderNavigation from './navigation.js';
import {createLinkList, fetchData, getUrlParam, createElement} from './functions.js';
import paginationLinks from './pagination.js';



async function init() {
    const userId = getUrlParam('user_id');
    const limit = getUrlParam ('limit')?getUrlParam('limit'):10;
    const page = getUrlParam('page')?getUrlParam('page'):1;
  
    let fetchUrl = '';
    if(userId){
        fetchUrl = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
    }else {
        fetchUrl = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}` 
    }


    const res = await fetch(fetchUrl)
    const posts = await fetchData(fetchUrl);
    const total = res.headers.get('x-total-count');
    console.log(total)
    let postWrapper = document.querySelector('#posts-wrapper');

    const pageTitle = createElement('h1', 'Posts List:', 'page-title')
    
    const postsListElement = createLinkList({
        data:posts,
        path: 'post',
        listClasses: ['posts-list'],
        itemClasses: ['post-item']
    });


    const pagination = paginationLinks({page,limit, total});

    postWrapper.append(pageTitle,pagination, postsListElement);
    }
    init()



    