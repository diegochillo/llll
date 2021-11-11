/* Loads the articles inside the columns using JQuery*/

$(document).ready(function(){
   $('#article1_1').load("articles/article1_1.html");
   $('#article1_2').load("articles/article1_2.html");
   $('#article1_3').load("articles/article1_3.html");
   $('#article2_1').load("articles/article2_1.html");
   $('#article2_2').load("articles/article2_2.html");
   $('#article2_3').load("articles/article2_3.html");

});









/*
function load_articles() {
  document.getElementById("article1").innerHTML='<object type="text/html" data="articles/article1.html" ></object>';
  document.getElementById("article2").innerHTML='<object type="text/html" data="articles/article2.html" ></object>';
  document.getElementById("article3").innerHTML='<object type="text/html" data="articles/article3.html" ></object>';
}
*/

/* Enables the stylesheet with ID nodeE and disables the three others */
function switchToSS (nodeE,nodeD1,nodeD2,nodeD3) {
  nodeE.media = '';
  nodeD1.media = 'none';
  nodeD2.media = 'none';
  nodeD3.media = 'none';
  /* nodeD2.media = 'none'; */
}


/* Loads topbar.html in topBar div */
$(function(){$("#topBar").load("components/topbar.html"); });




function getMetadata(elementId,className) {
  var dataList = $("."+className).map(function() {
    return $(document.getElementById(elementId)).data("label");
  }).get();
  //console.log(dataList.join("<br>"));
  return dataList;
  /*  $('#personList').html(dataList.join("<br>")); */
}
