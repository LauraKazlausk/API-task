function renderNavigation(){
    const header = document.createElement('header');
    const nav = document.createElement('nav');
    const menuList = document.createElement('ul');
    menuList.classList.add('nav-menu-list');
    const searchForm = document.createElement('form');

    document.body.prepend(header);
    nav.append(menuList, searchForm);
    header.append(nav);

    const menuItems = [
        {
            title:'Home',
            path:'./index.html'
        },
        {
            title:'Posts',
            path:'./posts.html'
        },
        {
            title:'Users',
            path:'./users.html'
        },
        {
            title:'Albums',
            path:'./albums.html'
        }
    ]

    menuItems.map(item => {
    let { title, path } = item;

    const menuItemElement = document.createElement('li');
    menuItemElement.classList.add('menu-item-element');

    const menuItemLink = document.createElement('a');
    menuItemLink.href = path;
    menuItemLink.textContent = title;

    menuItemElement.append(menuItemLink);
    menuList.append(menuItemElement)
    })

    searchForm.action = './search.html'
    searchForm.innerHTML = '<input type="text" name="search" id="search-form"><input type="submit" value="Search">'
    }
renderNavigation();

export default renderNavigation;

