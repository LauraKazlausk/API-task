import renderNavigation from './navigation.js';
import { firstLetterUpperCase, getUrlParam } from './functions.js';

 function init (){
     
     const albumId = getUrlParam('album_id');
     
     let albumWrapper = document.querySelector('#album-wrapper');
     
     if(albumId){
         renderAlbumList (albumId, albumWrapper)
        }else {
            renderErrorMessage (albumWrapper)
        }
    }
        init ()

async function renderAlbumList (albumId, albumWrapper){
 const albumRes = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}?_embed=photos&_expand=user`);
        const album = await albumRes.json(); 
    
      
    let {title, user, photos} = album;

    let albumTitle = document.createElement('h1');
    albumTitle.classList.add('album-title');
    albumTitle.textContent = firstLetterUpperCase(title);
    
    let albumAuthor = document.createElement('span');
    albumAuthor.classList.add('album-author');
    albumAuthor.innerHTML = `<strong> Album author:</strong> <a href="./user.html?user_id=${user.id}">${user.name}</a>`;
    
    let photosList = document.createElement('div');
    photosList.classList.add('photos-list');
    
    albumWrapper.append(albumTitle, albumAuthor, photosList);
    
    photos.map(photo => {
        let photoItem = document.createElement('img');
        photoItem.src = photo.thumbnailUrl;
        photoItem.alt = photo.title;
    
        photosList.append(photoItem);
    })
    }

    
    
function renderErrorMessage (parentElement){
    parentElement.innerHTML = `<h1> Something went wrong.. Album not found.</h1>
    <a href="index.html">Back to home page</a>`
}

    
    