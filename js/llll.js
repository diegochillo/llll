/* Loads the articles inside the columns using JQuery*/

$(document).ready(function(){
   $('#article1').load("articles/article1.html");
   $('#article2').load("articles/article2.html");
   $('#article3').load("articles/article3.html");
   $('#article4').load("articles/article4.html");
   $('#article5').load("articles/article5.html");
   $('#article6').load("articles/article6.html");
});

/*
function load_articles() {
  document.getElementById("article1").innerHTML='<object type="text/html" data="articles/article1.html" ></object>';
  document.getElementById("article2").innerHTML='<object type="text/html" data="articles/article2.html" ></object>';
  document.getElementById("article3").innerHTML='<object type="text/html" data="articles/article3.html" ></object>';
}
*/


function switchToSS (nodeE,nodeD1,nodeD2,nodeD3) {
  nodeE.media = '';
  nodeD1.media = 'none';
  nodeD2.media = 'none';
  nodeD3.media = 'none';
  /* nodeD2.media = 'none'; */
}


/* Loads topbar.html in topBar div */
$(function(){$("#topBar").load("components/topbar.html"); });
