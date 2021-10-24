/* Loads the articles inside the columns */

function load_articles() {
  document.getElementById("article1").innerHTML='<object type="text/html" data="articles/article1.html" ></object>';
  document.getElementById("article2").innerHTML='<object type="text/html" data="articles/article2.html" ></object>';
  document.getElementById("article3").innerHTML='<object type="text/html" data="articles/article3.html" ></object>';
}



function switchToSS (nodeE,nodeD1) {
  nodeE.media = '';
  nodeD1.media = 'none';
  /* nodeD2.media = 'none'; */
}
