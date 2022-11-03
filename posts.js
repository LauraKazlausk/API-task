import renderNavigation from './navigation.js';
import {firstLetterUpperCase, getUrlParam} from './functions.js';



function init() {
   const userId = getUrlParam('user_id')

    let fetchUrl = '';
    if(userId){
        fetchUrl = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
    }else {
        fetchUrl = 'https://jsonplaceholder.typicode.com/posts'
    }
    
    
    fetch(fetchUrl)
    .then(res=>res.json())
    .then(posts =>{
        let postWrapper = document.querySelector('#posts-wrapper');
    
        let pageTitle = document.createElement('h1');
        pageTitle.classList.add('page-title')
        pageTitle.textContent = 'Posts List:';
    
        let postsList = document.createElement('ul');
        postsList.classList.add('posts-list');
    
        postWrapper.append(pageTitle, postsList);
    
        posts.map(post=>{
            let postItem = document.createElement('li');
            postItem.classList.add('post-postItem');
            postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${firstLetterUpperCase(post.title)} </a>`
            postsList.append(postItem)
        })
    })
    }
    init()
    