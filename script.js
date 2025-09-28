const Api_key="5afea48a4c9f40419061e256b2713f3a";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("india"));

async function fetchNews(query){
  const response=await fetch(`${url}${query}&apiKey=${Api_key}`);
 const data= await response.json();
  bindData(data.articles);
}

function bindData(articles){
  const cardsContainer=document.getElementById('cards-container');
  const newsCardTemplate=document.getElementById('template-news-card');

  cardsContainer.innerHTML="";

    data.articles.forEach(article=>{
    if(!article.urlToImage) return;
    const cardClone=newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone,article);
    cardsContainer.appendChild(cardClone); 
   });    
}
 
 function fillDataInCard(cardClone,article){
  const newsImg=cardClone.querySelector('#news-img');
  const newstitle=cardClone.querySelector('#news-title');
  const newssource=cardClone.querySelector('#news-source');
  const newsdesc=cardClone.querySelector('#news-desc');
                                                                        
  newsImg.src=article.urlToImage;
  newstitle.innerHTML=article.title;
  newsdesc.innerHTML=article.description;

  const date=new Date(article.publishedAt).toLocaleString("en-US",{
   timeZone:"ASIA/Jakarta" 
  });
  newssource.HTML=`${article.source.name} . ${date}`;

  cardClone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"_blank");
  })
}

function onNavItemClick(id){
  fetchNews(id)
}

const searchButton=document.getElementById('search-button');
const searchtext=document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
  const query=searchtext.value;
  if(!query) return;
  fetchNews(query);

})
