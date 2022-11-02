async function usersInfo (){
    const usersRes = await fetch('https://jsonplaceholder.typicode.com/users?_embed=posts');
    const users = await usersRes.json();

    let usersWrapper = document.querySelector('#users-wrapper');

    let pageTitle = document.createElement('h1');
    pageTitle.classList.add('page-title');
    pageTitle.textContent = 'Users list:';
    
    let usersList = document.createElement('ul');
    usersList.classList.add('users-list');
    
    usersWrapper.append(pageTitle, usersList);


    users.map(user=>{
            let userItem = document.createElement('li');
            userItem.innerHTML= `<a href="./user.html?user_id=${user.id}">${user.name} (${user.posts.lenght})</a>`

            usersList.append(userItem)
    })
}

usersInfo();
