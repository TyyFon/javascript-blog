'use strict';
 
/* Title list*/
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagSelector = ".post-tags .list";
  generateTitleLinks();
 
function generateTags() {
/* find all articles */
  let articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles) {
    article.getAttribute('data-tags');
    const articleTags = article.getAttribute('data-tags');
  /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagSelector);
    const clearTagsList = tagList.innerHTML = '';
      /* make html variable with empty string */
    let html = '';
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
generateTags();
function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clicedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = querySelectorAll('a.active[href^="#tag-"]');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');
  /* find all tag links with class active */

  /* START LOOP: for each active tag link */

    /* remove class active */

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */

    /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();