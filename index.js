import renderNavigation from './navigation.js';
import { createElement, fetchData, firstLetterUpperCase, renderAllComments, renderSinglePost } from './functions.js'

 async function init (){
    const contentWrapper = document.querySelector('#content-wrapper');
    
    const postsListElement = await renderPosts ();
    const albumsListElement = await renderAlbums();

contentWrapper.append(postsListElement, albumsListElement)
}

async function renderPosts (){
    const posts = await fetchData(`https://jsonplaceholder.typicode.com/posts?_limit=10&_embed=comments&_expand=user`);

    let postsList = document.createElement('div');
    postsList.id = 'posts-list';

        posts.map(post => {
        
        let postItem = createElement('div', '', 'post-item');
        
        let postContent = renderSinglePost(post);
        let postComments = renderAllComments(post);

        postItem.append(postContent, postComments);
        postsList.append(postItem);

        })
        return postsList;
}

async function renderAlbums(){
    const albums = await fetchData('https://jsonplaceholder.typicode.com/albums?_limit=15&_embed=photos&_expand=user');

    let albumsList = createElement('div', '', 'albums-list');

    albums.map(album =>{
        let albumItem = createElement('div', '', 'album-item');
        albumsList.append(albumItem);

        albumItem.innerHTML = `<h3 class="album-title"><a href="./album.html?album_id=${album.id}">${firstLetterUpperCase(album.title)}</a></h3>
        <div class="album-author">Album created by:${album.user.name}</div>
        <img src="${album.photos[0].thumbnailUrl}" alt="${album.photos[0].title}">`
    })
    return albumsList;
}

init ()    