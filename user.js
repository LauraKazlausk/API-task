import renderNavigation  from './navigation.js';
import {  firstLetterUpperCase, getUrlParam } from './functions.js';

async function init (){

    const userId = getUrlParam('user_id');

    let userInfo = document.querySelector('#user-info');

    const userRes = await fetch('https://jsonplaceholder.typicode.com/users/' + userId);
    const user = await userRes.json();

    const postsRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    const posts = await postsRes.json();

    const albumsRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
    const albums = await albumsRes.json();


    let userName = document.createElement('h3');
    let userNickname = document.createElement('p');
    userName.classList.add('user-name');
    userName.textContent = `${user.name} (${user.username})` ;

    let userEmail = document.createElement('p');
    userEmail.textContent = `Email: ${user.email} `;
 
    let userPhone = document.createElement('p');
    userPhone.textContent = `Phone: ${user.phone}`;

    let userWebsite = document.createElement('p');
    userWebsite.textContent = `Website: ${user.website}`;

    let userCompanyName = document.createElement('p');
    userCompanyName.textContent =`Company's name: ${user.company.name}`;


    let {street, suite, city, zipcode} = user.address;
       
    let userAddress = document.createElement('p');
    userAddress.textContent = `Address: ${street}, ${suite},
     ${city},${zipcode}.`
    
    userInfo.append(userName, userNickname, userEmail, userPhone, userWebsite, userCompanyName, userAddress) 


  

    

  const postsWrapper = document.querySelector('#posts-wrapper');
       
    const postTitle = document.createElement('h3');
    postTitle.classList.add('post-title');
    postTitle.textContent = 'User posts:';

    const postsList = document.createElement('div');
    postsList.classList.add('posts-list');

    postsWrapper.append(postTitle, postsList)

    posts.map(post => {
    const postItem = document.createElement('div');
    postItem.classList.add('post-item');

    postItem.innerHTML = `<h3>${firstLetterUpperCase(post.title)}</h3>
                          <p>${firstLetterUpperCase(post.body)}</p>
                           <a href="./post.html?post_id=${post.id}"> Read more...</a>`
    postsList.append(postItem)
    })

    
    const albumsWrapper = document.querySelector('#albums-wrapper');
    const albumsTitle = document.createElement('h3');
    albumsTitle.classList.add('albums-title');
    albumsTitle.textContent = 'User albums:';

    const albumsList = document.createElement('ul');
    albumsList.classList.add('albums-list');

    albumsWrapper.append(albumsTitle, albumsList);
    
    albums.map(album =>{
        const albumItem = document.createElement('li');
        albumItem.classList.add('album-item');

        const albumItemLink = document.createElement('a');
        albumItemLink.textContent = album.title;
        albumItemLink.href = './album.html?album_id=' + album.id;

        albumItem.append(albumItemLink);
        albumsList.append(albumItem)
    })
}
 
init ();
