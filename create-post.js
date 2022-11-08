import { createAuthorOptionElements, createNewPostElement,  } from "./functions.js";

function init (){
const createPostForm = document.querySelector('#create-post-form');
const usersSelectElement = createPostForm.querySelector('#author');
const postReviewElement = document.querySelector('#post-review-element')

createAuthorOptionElements(usersSelectElement);

createPostForm.addEventListener('submit', async (event) =>{
    event.preventDefault();
    
    const title = event.target.elements.title.value;
    const body = event.target.elements.body.value;
    const userId = event.target.elements.author.value;

    const postObj = {
        title,
        body,
        userId
    };
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(postObj),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      const newPost = await res.json();
      const postElement = await createNewPostElement(newPost);

      postReviewElement.innerHTML = '';
      postReviewElement.append(postElement);

      event.target.reset()
})

}

init ();