import renderNavigation from './navigation.js';
import { firstLetterUpperCase, getUrlParam } from './functions.js';


async function init(){

  const postId = getUrlParam('post_id')

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}?_expand=user&_embed=comments`);
  const post = await res.json();
  
  let postWrapper = document.querySelector('#post-wrapper');

  renderSinglePost(post, postWrapper);
  renderAllComments (post, postWrapper); 
}

  
  function renderSinglePost(post, postWrapper){

      let postTitleElement = document.createElement('h2');
    postTitleElement.classList.add('post-title');
    postTitleElement.textContent = firstLetterUpperCase(post.title);

    let postAuthorElement = document.createElement('span');
    postAuthorElement.classList.add('post-author');
    postAuthorElement.innerHTML = `Author: <a href="./user.html?user_id=${post.user.id}">${post.user.name}</a>`;

    let postContentElement = document.createElement('p');
    postContentElement.classList.add('post-content');
    postContentElement.textContent = firstLetterUpperCase(post.body);

    postWrapper.append(postTitleElement, postAuthorElement, postContentElement )
  }

  function renderAllComments(post, postWrapper){
    
    let commentsWrapperElement = document.createElement('div');
    commentsWrapperElement.classList.add('comments-wrapper');
    
    let commentsSectionTitle = document.createElement('h3');
    commentsSectionTitle.classList.add('comments-section-title');
    commentsSectionTitle.textContent = 'Comments:';
  
    let commentsListElement = document.createElement('div');
    commentsListElement.classList.add('comments-list');
    
    post.comments.map(comment => {
      let commentItem = document.createElement('div');
      commentItem.classList.add('comment-item');
    
      commentItem.innerHTML = `<h4 class="comment-title">${firstLetterUpperCase(comment.name)}</h4>
                               <span class="comment-author">Commented by: ${comment.email}</span>
                               <p class="comment-content">${firstLetterUpperCase(comment.body)}</p>`;
    
      commentsListElement.append(commentItem);
   })
   commentsWrapperElement.append(commentsSectionTitle, commentsListElement);

  let moreAuthorPostsElement = document.createElement('a');
  moreAuthorPostsElement.classList.add('more-posts');
  moreAuthorPostsElement.href = './posts.html?user_id=' + post.user.id;
  moreAuthorPostsElement.textContent = `Other posts of ${post.user.name}`;

  postWrapper.append(moreAuthorPostsElement,commentsWrapperElement );
}

init ()

