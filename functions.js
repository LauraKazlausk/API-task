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
    const list = document.createElement('ul');
    list.classList.add('search-list');

    if(listClasses){
        listClasses.map(elementClass => {
            list.classList.add(elementClass)
        })
    }
    data.map(item => {
      const itemElement = document.createElement('li');
      itemElement.classList.add('list-item');

      if(itemClasses){
        itemClasses.map(itemClass =>{
            itemElement.classList.add(itemClass)
        })
      }

      const linkElement = document.createElement('a');
      linkElement.textContent = item.title;
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
  postContentElement.classList.add('post-content');
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
      let commentItem = document.createElement('div');
      commentItem.classList.add('comment-item');
    
      commentItem.innerHTML = `<h4 class="comment-title">${firstLetterUpperCase(comment.name)}</h4>
                               <span class="comment-author">Commented by: ${comment.email}</span>
                               <p class="comment-content">${firstLetterUpperCase(comment.body)}</p>`;
    
      commentsListElement.append(commentItem);
   })
   commentsWrapperElement.append(commentsSectionTitle, commentsListElement);

 return commentsWrapperElement;
}

export async function fetchData (url){
    const res = await fetch(url);
    const result = await res.json();
    return result;
  }

  
export function createElement (tag, content, className){
    if (!tag) return;
const element = document.createElement(tag);
element.textContent = content;
element.className = className;
return element;

}