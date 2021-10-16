/* Title list*/
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';
  
const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;
  
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE]add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};
function generateTitleLinks(customSelector = ''){
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
            
  /* [DONE] for each article */
  let articles = document.querySelectorAll(optArticleSelector + customSelector);
  //let html = '';
    
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

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetTags = document.querySelectorAll(href);
  /* START LOOP: for each found tag link */
  for(let targetTag of targetTags){
    /* add class active */
    targetTag.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}  
function generateTags() {
  /* find all articles */
  let articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles) {
    article.getAttribute('data-tags');
    const articleTags = article.getAttribute('data-tags');
    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagSelector);
    tagList.innerHTML = '';
    /* make html variable with empty string */
    //let html = '';
    /* get tags from data-tags attribute */
    /* split tags into array */
    const articleTagArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let Tag of articleTagArray) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + Tag +'"<span>'+ '_ #' + Tag + '</span></a></li>';
      /* add generated code to html variable */
      tagList.insertAdjacentHTML('beforeend', linkHTML);
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    /* END LOOP: for every article: */
  }
}
function addClickListenersToTags() {
  /* find all links to tags */
  const linkTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let linkTag of linkTags) {
    /* add tagClickHandler as event listener for that link */
    linkTag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
function generateAuthor() {
  let articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles) {
    const articleAuthor = article.getAttribute('data-author');
    const textAuthor = article.querySelector(optArticleAuthorSelector);
    textAuthor.innerHTML = '';
    const linkHTML = '<a href="#' + articleAuthor +'"<span>'+ 'by ' + articleAuthor + '</span></a>';
    textAuthor.insertAdjacentHTML('beforeend', linkHTML);
  }
}
function articleAuthorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#', '');
  generateTitleLinks('[data-author="' + author + '"]');
}  
function addClickListenersToArticleAuthor() {
  const linkAuthors = document.querySelectorAll('.post-author a');
  for (let linkAuthor of linkAuthors) {
    linkAuthor.addEventListener('click', articleAuthorClickHandler);
  }
}