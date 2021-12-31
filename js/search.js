var searchObj = [];
var getHtml;

const issues=[1,2];
const articles=[1,2,3];

// Reads every article and puts the content into the array (that is the search object)
for (let i of issues) {
  for(let a of articles) {
    getHtml = $.ajax({type: "GET", url: "articles/article" + i + "_" + a + ".html", async: false}).responseText;
    getHtml = extractContent(getHtml);
    getHtml = getHtml.replace("\n"," ");
    searchObj.push({issue: i, article: a, content: getHtml, url: "issue.html?number=" + i});
  }
}

//console.log("Dopo:" + searchObj[0].article);

//console.log(searchObj);
window.pages=searchObj;
console.log(window.pages);

var searchIndex = lunr(function() {
    this.ref("id");
    //this.field("title", { boost: 10 });
    this.field("content");
    for (var key in window.pages) {
        this.add({
            "id": key,
            //"title": pages[key].title,
            "content": pages[key].content
        });
    }
});


function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) {
          return decodeURIComponent(pair[1].replace(/\+/g, "%20"));
      }
  }
}

var searchTerm = getQueryVariable("q");
// creation of searchIndex from earlier example
var results = searchIndex.search(searchTerm);
var resultPages = results.map(function (match) {
  return pages[match.ref];
});



function extractContent(html) {
    return new DOMParser().parseFromString(html, "text/html") .
        documentElement . textContent;
}
