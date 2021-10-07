//After akceptaion I'll remove comented lines and empty lines - left only for proof of my own working
'use strict';

const titleClickHandler = function(event){
    event.preventDefault();
    const clicedElement = this;
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
  /* [DONE]add class 'active' to the clicked link */
    clicedElement.classList.add('active'),
        console.log('clicedElement:', clicedElement);

  /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .post.active');
    for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    }
  /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clicedElement.getAttribute('href');
console.log('articleSelector', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle', targetArticle);

  /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
    console.log('active article:', targetArticle);
}
 
/* Title list*/
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
        console.log('title list', titleList);
        const clearTitleList = titleList.innerHTML = '';
            console.log(optTitleListSelector);
 
            /* [DONE] for each article */
    let articles = document.querySelectorAll(optArticleSelector);
        //console.log('articles', articles)
    let html = '';
    
    /* [DONE]get the article id */
    for(let article of articles) {
        article.getAttribute('id');
        let articleId = article.getAttribute('id');
          //  console.log('ID ' + articleId);

          /* [DONE]find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    // console.log('title ' + articleTitle);

    /* [DONE] get the title from the title element  create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML)

    /* [DONE] insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    //html = html + linkHTML;
    }
    //titleList.innerHTML = html
   // console.log(html)
    const links = document.querySelectorAll('.titles a');
        console.log (links);
    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    } 
}
generateTitleLinks();