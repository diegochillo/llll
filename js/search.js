var searchObj = [];
var getHtml;
var issuesqt=0;

// Get the number of articles from issuesDb.json
var value= $.ajax({
      url: './issuesDb.json',
      async: false
   }).responseText;
var objson=JSON.parse(value);
issuesqt=objson.issues.length;

const articles=[1,2,3];

// Reads every article and puts the content into the array (that is the search object)
for (i=1;i<=issuesqt;i++) {
  for (let a of articles) {
    getHtml = $.ajax({type: "GET", url: "articles/article" + i + "_" + a + ".html", async: false}).responseText;
    getHtml = extractContent(getHtml);
    getHtml = getHtml.replace("\n"," ");
    searchObj.push({issue: i, article: a, content: getHtml, url: "issue.html?number=" + i});
  }
}

//console.log("Dopo:" + searchObj[0].article);

//console.log(searchObj);
window.pages=searchObj;
//console.log(window.pages);

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
