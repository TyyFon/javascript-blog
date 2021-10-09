
const titleClickHandler = function(event){
  event.preventDefault();
  const clicedElement = this;
  
  /* [DONE] remove class 'active' from all article links  */
const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
  }
/* [DONE]add class 'active' to the clicked link */
clicedElement.classList.add('active');

/* [DONE] remove class 'active' from all articles */
const activeArticles = document.querySelectorAll('.posts .post.active');
  for(let activeArticle of activeArticles){
  activeArticle.classList.remove('active');
  }
/* [DONE] get 'href' attribute from the clicked link */
const articleSelector = clicedElement.getAttribute('href');
  
/* [DONE] find the correct article using the selector (value of 'href' attribute) */
const targetArticle = document.querySelector(articleSelector);
  
/* [DONE] add class 'active' to the correct article */
targetArticle.classList.add('active');
}

function generateTitleLinks(){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  const clearTitleList = titleList.innerHTML = '';
            
            /* [DONE] for each article */
  let articles = document.querySelectorAll(optArticleSelector);
  let html = '';
    
    /* [DONE]get the article id */
  for(let article of articles) {
    article.getAttribute('id');
    let articleId = article.getAttribute('id');
          
          /* [DONE]find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

/* [DONE] get the title from the title element  create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* [DONE] insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  } 
}