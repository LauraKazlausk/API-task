import renderNavigation from './navigation.js';
import { fetchData, getUrlParam, renderAllComments, renderSinglePost } from './functions.js';


async function init(){

  const postId = getUrlParam('post_id')

  const post = await fetchData(`https://jsonplaceholder.typicode.com/posts/${postId}?_expand=user&_embed=comments`)
  
  let postWrapper = document.querySelector('#post-wrapper');

  let postContent = renderSinglePost(post);
 let postComments = renderAllComments (post); 
 let otherPosts = otherPostsList(post)

  postWrapper.append(postContent, otherPosts, postComments);

  renderAllComments(post);
}




function otherPostsList(post){
   let moreAuthorPostsElement = document.createElement('a');
  moreAuthorPostsElement.classList.add('more-posts');
  moreAuthorPostsElement.href = './posts.html?user_id=' + post.user.id;
  moreAuthorPostsElement.textContent = `Other posts of ${post.user.name}`; 
  return moreAuthorPostsElement;
}
init ()

