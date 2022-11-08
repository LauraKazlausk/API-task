import {createElement, fetchData, getUrlParam} from './functions.js'
async function init(){
const userId = getUrlParam('user_id');

if(!userId){
    const errorMessage = createElement('h1', 'Something went wrong...')
    document.body.prepend(errorMessage)
    return;
}
const user = await fetchData(`https://jsonplaceholder.typicode.com/users/${userId}`)

const userForm = document.querySelector('#user-form');
userForm.elements.name.value = user.name;

}
init()