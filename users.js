import renderNavigation from './navigation.js';
import {createElement, createLinkList, fetchData} from './functions.js'

async function init (){

    const users = await fetchData('https://jsonplaceholder.typicode.com/users?_embed=posts') ;

    let usersWrapper = document.querySelector('#users-wrapper');

    let pageTitle = createElement('h1', 'Users list:', 'page-title');
    
    let usersData = users.map(user=>{
        let userObj = {
            id: user.id,
            title:`${user.name} (${user.posts.length})`,
        }
        return userObj;
    })
    
    let usersListElement = createLinkList({
        data: usersData,
        path: 'user',
        listClasses: ['users-list'],
        itemClasses: ['user-item'],
    })
    
    usersWrapper.append(pageTitle, usersListElement);
   
}

init();
