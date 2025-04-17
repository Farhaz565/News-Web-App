const API_KEY= "aeadfc68642d454d91dda667ba0ede9c";


const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
bindData(data.articles);
}

function bindData(articles){
    const cardsContainer =document.getElementById('cards-container');
    const NewscardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML="";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardclone = NewscardTemplate.content.cloneNode(true);
        fillData(cardclone,article);
        cardsContainer.appendChild(cardclone);
    });
}
function fillData(cardclone, article){
const newsimg = cardclone.querySelector('#news-img');
const newsTitle = cardclone.querySelector('#news-title');
const newsSource = cardclone.querySelector('#news-source');
const newsDesc = cardclone.querySelector('#news-desc');

newsimg.src=article.urlToImage;
newsTitle.innerHTML=article.title;
newsDesc.innerHTML=article.description;

const date= new Date(article.publishedAt).toLocaleString("en-US",{
    timeZone:"Asia/Jakarta"
});

newsSource.innerHTML=`${article.source.name} .${date} `;

cardclone.firstElementChild.addEventListener('click',() =>{
    window.open(article.url,"_blank");    //_blank means new tab
});
}
let curSelectedNav= null;
function onNavitemClick(id){
fetchNews(id);

const navItem=document.getElementById(id);
curSelectedNav?.classList.remove("active");
curSelectedNav=navItem;
curSelectedNav.classList.add("active");
}

const searchButton=document.getElementById("Search-button");
const searchText= document.getElementById("Search-Text");

searchButton.addEventListener("click",()=>{
    const query=searchText.value;
    if(!query) return;
fetchNews(query);
curSelectedNav?.classList.remove("active");
curSelectedNav=null;
});
