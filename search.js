import {createLinkList, getUrlParam} from './functions.js';
import renderNavigation from './navigation.js';
async function init() {
  outerSearchForm ();
  innerSearchForm ();
}
function outerSearchForm (){

  const search = getUrlParam('search');
  getSearchResults(search);
  }

  function innerSearchForm (){
    let searchForm = document.querySelector('#inner-search-form');
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let searchInput = event.target.elements['search-input'].value;
      getSearchResults(searchInput);
      event.target.reset();
    })
  }

  async function getSearchResults(search){
    const searchResults = document.querySelector('#search-results');
    searchResults.innerHTML = '';

    const searchPageTitle = document.createElement('h1');
    searchPageTitle.classList.add('page-title', 'search-page-title');
    searchPageTitle.textContent = `Results, search phrase: ${search}`;
  
    searchResults.append(searchPageTitle);
  
    const usersRes = await fetch(`https://jsonplaceholder.typicode.com/users?q=${search}`);
    const users = await usersRes.json();
  
    const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${search}`);
    const posts = await postsRes.json();
  
    const albumsRes = await fetch(`https://jsonplaceholder.typicode.com/albums?q=${search}`);
    const albums = await albumsRes.json()
    
    const formattedUsers = users.map(user => {
      const formattedUser = {
        id: user.id,
        title: user.name,
      }
  
      return formattedUser;
    });
  
    renderSearchResults({
      data: formattedUsers,
      parentElement: searchResults,
      title: 'Users',
      path: 'user',
    });
  
    renderSearchResults({
      data: posts,
      parentElement: searchResults,
      title: 'Posts',
      path: 'post',
    });
  
    const params = {
      data: albums,
      parentElement: searchResults,
      title: 'Albums',
      path: 'album',
    };

    renderSearchResults(params);
  }
  
  function renderSearchResults(paramsObj) {
    let { data, parentElement, title, path } = paramsObj;

  
    const wrapper = document.createElement('div');
    wrapper.classList.add('search-result-wrapper');
    parentElement.append(wrapper);
  
    const wrapperTitle = document.createElement('h2');
    wrapperTitle.classList.add('search-wrapper-title');
  
    wrapper.append(wrapperTitle);

    if (data.length > 0){
      wrapperTitle.textContent = title + ':';

      let params = {
        data,
        path,
        listClasses: ['search-list'],
        itemClasses: ['search-item']
      }
      const searchResultElement = createLinkList(params);
      wrapper.append(searchResultElement);
    }else {
      wrapperTitle.textContent = 'No ' + title.toLowerCase() + '...';
    }

  }
  
  init();

