import renderNavigation from './navigation.js';
import {createLinkList, fetchData, getUrlParam, createElement} from './functions.js';



async function init() {
   const userId = getUrlParam('user_id')

    let fetchUrl = '';
    if(userId){
        fetchUrl = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
    }else {
        fetchUrl = 'https://jsonplaceholder.typicode.com/posts'
    }
    
    const posts = await fetchData(fetchUrl);

    let postWrapper = document.querySelector('#posts-wrapper');

    const pageTitle = createElement('h1', 'Posts List:', 'page-title')
    
    const postsListElement = createLinkList({
        data:posts,
        path: 'post',
        listClasses: ['posts-list'],
        itemClasses: ['post-item']
    })
    postWrapper.append(pageTitle, postsListElement);
    }


    init()
    