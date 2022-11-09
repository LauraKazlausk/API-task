export function firstLetterUpperCase(text){
    return text[0].toUpperCase() + text.slice(1);
}
export function getUrlParam(searchText){
    const queryParams = document.location.search;
    const urlParams = new URLSearchParams(queryParams);
    const result = urlParams.get(searchText);
    return result;
}
export function createLinkList (paramsObj){
  let { data, path, listClasses, itemClasses } = paramsObj;

  let list = createElement('ul', '', 'list-element');

  if (listClasses) {
    listClasses.map(elementClass => {
      list.classList.add(elementClass);
    })
  }
  data.map(item => {
    const itemElement = createElement('li', '', 'list-item');

    if (itemClasses) {
      itemClasses.map(itemClass => {
        itemElement.classList.add(itemClass);
      })
    }

    const linkElement = document.createElement('a');
    linkElement.textContent = firstLetterUpperCase(item.title);
    linkElement.href = `./${path}.html?${path}_id=${item.id}`;

    itemElement.append(linkElement);
    list.append(itemElement);
  })

  return list;
}
export function renderSinglePost(post){

  let postTitleElement = document.createElement('h2');
  postTitleElement.classList.add('post-title');
  postTitleElement.textContent = firstLetterUpperCase(post.title);

  let postAuthorElement = document.createElement('span');
  postAuthorElement.classList.add('post-author');
  postAuthorElement.innerHTML = `Author: <a href="./user.html?user_id=${post.user.id}">${post.user.name}</a>`;

  let postContentElement = document.createElement('p');
  postContentElement.classList.add('paragraph-content');
  postContentElement.textContent = firstLetterUpperCase(post.body);

  
  let postContent = document.createElement('div');
  postContent.classList.add('post-content');
  
  postContent.append(postTitleElement, postAuthorElement, postContentElement );

  return postContent;
  
}
export   function renderAllComments(post){
    
    let commentsWrapperElement = document.createElement('div');
    commentsWrapperElement.classList.add('comments-wrapper');
    
    let commentsSectionTitle = document.createElement('h3');
    commentsSectionTitle.classList.add('comments-section-title');
    commentsSectionTitle.textContent = 'Comments:';
  
    let commentsListElement = document.createElement('div');
    commentsListElement.classList.add('comments-list');
    
    post.comments.map(comment => {
      const singleCommentElement = renderSingleComment(comment)
      commentsListElement.append(singleCommentElement);
   })
   commentsWrapperElement.append(commentsSectionTitle, commentsListElement);

 return commentsWrapperElement;
}
export function renderSingleComment (comment ){
  let commentItem = document.createElement('div');
      commentItem.classList.add('comment-item');
    
      commentItem.innerHTML = `<h4 class="comment-title">${firstLetterUpperCase(comment.name)}</h4>
                               <span class="comment-author">Commented by: ${comment.email}</span>
                               <p class="comment-content">${firstLetterUpperCase(comment.body)}</p>`;
    
    return commentItem;
}
export async function fetchData (url){
    const res = await fetch(url);
    const result = await res.json();
    return result;
}
export function createElement (tag, content, className=''){
    if (!tag) return;
const element = document.createElement(tag);
element.textContent = content;
element.className = className;
return element;

}
export async function createAuthorOptionElements(selectElement){
  const users = await fetchData('https://jsonplaceholder.typicode.com/users')
  
  users.map(user=>{
  const optionElement = createElement('option', user.name);
  optionElement.value = user.id;
  
  selectElement.append(optionElement)
  })
}
 export async function createNewPostElement(post){
    const user = await fetchData(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
    const newPostElement = createElement('div','', 'new-post');
    newPostElement.innerHTML = `<h2 class='post-title'>${post.title} (id:${post.id})</h2>
    <span> Author: ${user.name}</span>
    <p>${post.body}</p>`;

    return newPostElement;
}
export  function createUserInfoElement(user){
  const userInformation = createElement('div', '', 'user-information');

 let {name, username, email, website, phone, company } = user;
 let {street, suite, city, zipcode} = user.address;

  userInformation.innerHTML = `<h2 class="user-name">${name} (${username})
  <ul>
  <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
  <li><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></li>
  <li><strong>Address:</strong> <a href="#">${street} ${suite}, ${city} (zipcode: ${zipcode})</a></li>
  <li><strong>Website:</strong> <a href="https://${website}">${website}</a></li>
  <li><strong>Work:</strong> ${company.name}</li>
  <li><strong>Company Cath Phrase:</strong> ${company.catchPhrase} </li>
  </ul>`
  return userInformation;
}


