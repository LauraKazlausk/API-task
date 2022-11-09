import { firstLetterUpperCase, fetchData, getUrlParam } from './functions.js';
import renderNavigation from './navigation.js';
import paginationLinks from './pagination.js';


async function init (){

 const limit = getUrlParam ('limit')?getUrlParam('limit'):10;
  const page = getUrlParam('page')?getUrlParam('page'):1;
  

  const albums = await fetchData(`https://jsonplaceholder.typicode.com/albums?_page${page}&_embed=photos&_limit=${limit}`);

 const albumsWrapper = document.querySelector('#albums-wrapper');
  const albumsElement = createAlbumList(albums);
  
 

  
  albumsWrapper.append(albumsElement);
}

function createAlbumList (albums){
  
  const albumsContainer = document.createElement('div');
  albumsContainer.classList.add('albums-container')

  const pageTitle = document.createElement('h1');
  pageTitle.classList.add('page-title');
  pageTitle.textContent = 'Albums list:';
  
  const albumsList = document.createElement('div');
  albumsList.classList.add('albums-list');
  
  albumsContainer.append(pageTitle, albumsList)

  albums.map(album => {
    const photosCount = album.photos.length;
    const randomIndex = Math.floor(Math.random() * photosCount);
    const randomPhoto = album.photos[randomIndex];
  
    const albumItem = document.createElement('div');
    albumItem.classList.add('album-item');
  
  albumItem.innerHTML = `<a href="./album.html?album_id=${album.id}">
                         <h2 class="album-title">${firstLetterUpperCase(album.title)}</h2>
                         <img src="${randomPhoto.thumbnailUrl}" alt="${randomPhoto.title}">
                         </a>`;
  
   albumsList.append(albumItem);
})


  return albumsContainer;
}

init ()
  