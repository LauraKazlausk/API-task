import renderNavigation from './navigation.js';
import { createElement, fetchData, getUrlParam, renderAllComments, renderSinglePost,renderSingleComment } from './functions.js';

async function init(){
  
  const postId = getUrlParam('post_id')
  const post = await fetchData(`https://jsonplaceholder.typicode.com/posts/${postId}?_expand=user&_embed=comments`)
  

  let postWrapper = document.querySelector('#post-wrapper');

  let editButtonLink = createElement('a','Edit Post', 'edit-post-button');
  editButtonLink.href ='./edit-post.html?post_id=' + postId;

  let postContent = renderSinglePost(post);
  let postComments = renderAllComments (post); 
  let otherPosts = otherPostsList(post)

  postWrapper.append(postContent, otherPosts, postComments, editButtonLink);
  
  let createCommentForm = document.querySelector('#create-comment-form');
  createCommentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    let name = event.target.elements.name;
    let email = event.target.elements.email.value;
    let body = event.target.elements.body.value;

    const res = await fetch('https://jsonplaceholder.typicode.com/comments', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        body,
        postId
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    let createdComment = await res.json();
    let singleCommentElement = renderSingleComment(createdComment);

    let commentsList = postComments.querySelector('.comments-list');
    commentsList.append(singleCommentElement);

    event.target.reset();
  })
}

function otherPostsList(post){
   let moreAuthorPostsElement = document.createElement('a');
  moreAuthorPostsElement.classList.add('more-posts');
  moreAuthorPostsElement.href = './posts.html?user_id=' + post.user.id;
  moreAuthorPostsElement.textContent = `Other posts of ${post.user.name}`; 

 
  return moreAuthorPostsElement;
}
// renderSingleComment()


init ()

