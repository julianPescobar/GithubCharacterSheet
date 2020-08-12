const img = document.querySelector('.materialboxed');
const user = document.querySelector('#username')
const searchBtn = document.querySelector('#buscar')
const person = document.querySelector('.person-stats')
const collection = document.querySelector('.collection')
const name =document.querySelector('.name')
const lv = document.querySelector('.lv')
const exp = document.querySelector('.exp')
const hp = document.querySelector('.hp')
handleEvents()
person.style.display = 'none';

function GetUserData(user) {
    fetch(`https://api.github.com/users/${user}`).then(res => res.json()).then(data => AppendImg(data))
    fetch(`https://api.github.com/users/${user}/repos`).then(res => res.json()).then(data => showRepos(data))
    name.innerHTML = user
}
function AppendImg(data) {
    if (data instanceof Array) {
        data.forEach(function (user) {

            let img = document.createElement('img');
            img.src = user.avatar_url
            img.style.width = '20%'
            img.style.height = '20%'
            img.textContent = user.login
            cont.append(img)
        })
    } else {
        img.src = data.avatar_url
    }
}

function handleEvents(){
searchBtn.addEventListener('click',searchusr)
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems, null);
  });


}
function searchusr(e){
    e.preventDefault();
   const usrname = user.value
   if(usrname === ''){M.toast({html:"Ingrese un usuario por favor"},1000)} 
   else{
    
       GetUserData(usrname)
       person.style.display = 'block';
   }
}
function showRepos(repos){
    collection.innerHTML = 'Equipped items:';
    let forks = 0
    repos.forEach(repo =>{
        let li = document.createElement('li')
        let link = document.createElement('a')
        link.href = repo.html_url
        link.textContent = repo.name
        li.className = 'collection-item'
        li.appendChild(link)
        collection.appendChild(li)
        forks += repo.forks
    })
    lv.innerHTML = "Lv: " + repos.length 
    hp.innerHTML = 'MP: '+forks
    exp.innerHTML ='HP: ' + (Math.ceil(forks / repos.length)) 
}
