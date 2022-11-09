import renderNavigation  from './navigation.js';
import {  createElement, createLinkList, fetchData, firstLetterUpperCase, getUrlParam, createUserInfoElement } from './functions.js';

async function init (){

  const userId = getUrlParam('user_id');

  let userInfo = document.querySelector('#user-info');

    const user = await fetchData(`https://jsonplaceholder.typicode.com/users/${userId}?_embed=posts&_embed=albums`)

    const userInfoElement = createUserInfoElement(user);
    const userPostElement = createUserPostsElement(user.posts);
    const userAlbumsElement = createUserAlbumsElement(user.albums);
    userInfo.append(userInfoElement, userPostElement, userAlbumsElement)

    const userEditCreateLinks = createElement('div', '', 'user-edit-create-links')
    userInfoElement.append(userEditCreateLinks)

    const createNewUserLink = createElement('a', 'Create New User', 'create-new-user')
    createNewUserLink.href = './create-user.html';
    
    
    userEditCreateLinks.append(createNewUserLink)
}
// createUserInfoElement();

  function createUserPostsElement(posts){
    const postsWrapper = createElement('div', '', 'posts-wrapper')
    const postsTitle = createElement('h3', 'Users posts:', 'post-title');
    const postsList = createElement('div', '', 'posts-list');

    postsWrapper.append(postsTitle, postsList);

    posts.map(post =>{
      const postItem = createElement('div', '', 'post-item');
      postItem.innerHTML = `<h4> ${firstLetterUpperCase(post.title)}</h4>
      <p>${firstLetterUpperCase(post.body)}
      <a href="./post.html?post_id=${post.id}"<Read more...</a>`;

      postsList.append(postItem)
    })
    return postsWrapper;
  }

  function createUserAlbumsElement(albums){
    const albumsWrapper = createElement('div', '','albums-wrapper');
    const albumsTitle = createElement('h3', 'User Albums:', 'albums-title');
    const albumsListElement = createLinkList({
      data:albums,
      path:'album',
      listClasses: ['album-list'],
      itemClasses: ['album-item'],
    })

    albumsWrapper.append(albumsTitle, albumsListElement);
    return albumsWrapper
  }
    
init ();
