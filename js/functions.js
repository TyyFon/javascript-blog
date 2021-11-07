/* Title list*/
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optPostAuthorSelector = '.authors',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-authorList-link').innerHTML)
  };
const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.posts .post.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');
};
function generateTitleLinks(customSelector = ''){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  let articles = document.querySelectorAll(optArticleSelector + customSelector);

  for(let article of articles) {
    article.getAttribute('id');
    let articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  } 
}
function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  for(let activeTag of activeTags) {
    activeTag.classList.remove('active');
  }
  const targetTags = document.querySelectorAll(href);
  for(let targetTag of targetTags){
    targetTag.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
function generateTags() {
  let articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles) {
    article.getAttribute('data-tags');
    const articleTags = article.getAttribute('data-tags');
    const tagList = article.querySelector(optArticleTagSelector);
    tagList.innerHTML = '';
    const articleTagArray = articleTags.split(' ');
    for (let Tag of articleTagArray) {
      const linkHTMLData = {id: Tag, title: Tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      tagList.insertAdjacentHTML('beforeend', linkHTML);
    }
  }
}
function addClickListenersToTags() {
  const linkTags = document.querySelectorAll('a[href^="#tag-"]');
  for (let linkTag of linkTags) {
    linkTag.addEventListener('click', tagClickHandler);
  }
}
function generateAuthor() {
  let articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles) {
    const articleAuthor = article.getAttribute('data-author');
    const textAuthor = article.querySelector(optArticleAuthorSelector);
    textAuthor.innerHTML = '';
    const linkHTMLData = {id: articleAuthor, title: articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);
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
function calculateTagsParams(tags){
  const params =  {'min': 999999, 'max': 0};
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return (params);
}
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return (optCloudClassPrefix, classNumber);
}
function generateListTags() {
  let allTags = {};
  let articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const tags = article.getAttribute('data-tags');
    const articleTagArray = tags.split(' ');
    for (let tag of articleTagArray) {
      if(!allTags[tag]) {
        allTags[tag]  = 1;
      } else {
        allTags[tag]++;
      }
    }
  }
  const tagList = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);
  const allTagsData = {tags: []};
  for(let tag in allTags){
    const linkHTMLData = {id: tag, title: tag};
    //const linkHTML = templates.tagCloudLink(linkHTMLData);
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
function generateAuthorsList () {
  let allAuthors = {};
  let articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const author = article.getAttribute('data-author');
    if(!allAuthors[author]) {
      allAuthors[author]  = 1;
    } else {
      allAuthors[author]++;
    }
  }
  const allAuthorsData = {authors: []};
  let authorList = document.querySelector(optPostAuthorSelector);
  for(let author in allAuthors){
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });
  }
  authorList.innerHTML = templates.authorListLink(allAuthorsData);
}
function listAuthorsClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#', '');
  generateTitleLinks('[data-author="' + author + '"]');
}  
function addClickListenersTolistAuthors() {
  const linkAuthors = document.querySelectorAll('.authors a');
  for (let linkAuthor of linkAuthors) {
    linkAuthor.addEventListener('click', listAuthorsClickHandler);
  }
}