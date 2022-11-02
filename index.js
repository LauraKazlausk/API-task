
 async function init (){
    const contentWrapper = document.querySelector('#content-wrapper');
    const postsListElement = await renderPosts ();
    const albumsListElement = await renderAlbums();

contentWrapper.append(postsListElement, albumsListElement)

async function renderPosts (){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=15&_embed=comments&_expand=user`)
    const posts = await res.json()

    let postsList = document.createElement('div');
    postsList.id = 'posts-list';

        posts.map(post => {
        let postWrapper = document.createElement('div');
        postWrapper.classList.add('post-wrapper');
    
        let postTitle = document.createElement('h2');
        postTitle.classList.add('post-title')
        let postTitleText = post.title;
    
        let postText = document.createElement('p');
        postText.classList.add('post-body');
        let postParagraphText = post.body;

        let postAuthorName = document.createElement('span');
        postAuthorName.classList.add('post-author-name')
        postAuthorName.innerHTML = `Author: <a href='./user.html?user_id=${post.user.id}'> ${post.user.name}</a>`;

        let commentWrapper = document.createElement('div');
        commentWrapper.classList.add('comment-wrapper');
    
        let commentTitle = document.createElement('h3');
        commentTitle.classList.add('comment-title');
        commentTitle.innerHTML = 'Comments:'
        
        let commentsListElement = document.createElement('div');
        commentsListElement.classList.add('comments')

        let commentName = document.createElement('p');
        commentName.classList.add('comment-name');
    
        let commentParagraph = document.createElement('p');
        commentParagraph.classList.add('comment-paragraph');
    
        let commentEmail = document.createElement('p');
        commentEmail.classList.add('comment-email')
    
       
    
        postTitle.textContent = postTitleText;
        postText.textContent = postParagraphText;
        postWrapper.append(postTitle, postText, postAuthorName);
        contentWrapper.append(postWrapper);

        postWrapper.append(commentTitle, commentWrapper);
        
    
        post.comments.map(comment => {
        commentEmail.setAttribute('href', '#')
            
        commentTitle.textContent = 'Comments:';
        commentName.textContent = '--' + comment.name + '--' ;
        commentParagraph.textContent =  comment.body;
        commentEmail.textContent = comment.email;
        commentWrapper.append(commentName, commentParagraph, commentEmail)

        postsList.append(postWrapper)
        })
    })
return postsList;
}

async function renderAlbums(){
const res = await fetch(`https://jsonplaceholder.typicode.com/albums?_limit=15&_embed=photos&_expand=user`)
const albums = await res.json()

let albumsWrapper = document.createElement('div');
albumsWrapper.id = 'albums-wrapper'
 
 albums.map(album => {
        let albumItem = document.createElement('div');
        albumItem.classList.add('album-item');
        albumsWrapper.append(albumItem)
        
 albumItem.innerHTML = `<h3 class="album-title"><a href="./album.html?album_id=${album.id}">${album.title}</a></h3>
                            <div class="album-author">Album created by: ${album.user.name}</div>
                            <img src="${album.photos[0].thumbnailUrl}" alt="${album.photos[0].title}">`;
    
           })
return albumsWrapper;
}


}   

init ()    