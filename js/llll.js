
/* Loads topbar.html in topBar div */
$(function(){$("#topBar").load("components/topbar.html"); });


/* Loads the articles inside the columns using JQuery*/

$(document).ready(function(){
   $('#article1_1').load("articles/article1_1.html", function() { getMetadata(1,1,["person","language"]); } ); //"#article1_1","#metaData1_1"
   $('#article1_2').load("articles/article1_2.html", function() { getMetadata(1,2,["person","language"]); } );
   $('#article1_3').load("articles/article1_3.html", function() { getMetadata(1,3,["person","language"]); } );
   $('#article2_1').load("articles/article2_1.html", function() { getMetadata(2,1,["person","language"]); } );
   $('#article2_2').load("articles/article2_2.html", function() { getMetadata(2,2,["person","language"]); } );
   $('#article2_3').load("articles/article2_3.html", function() { getMetadata(2,3,["person","language"]); } );
});



/* Enables the stylesheet with ID nodeE and disables the three others */
function switchToSS (nodeE,nodeD1,nodeD2,nodeD3) {
  nodeE.media = '';
  nodeD1.media = 'none';
  nodeD2.media = 'none';
  nodeD3.media = 'none';
}

function cleanUpSS() {
  $('#cssstyle1').attr('media', 'none');
  $('#cssstyle2').attr('media', 'none');
  $('#cssstyle3').attr('media', 'none');
  $('#cssstyle4').attr('media', 'none');
}



// Gets the list of metadata and shows it in the metaData box (only for .person class at the moment)
function getMetadata(nIssue,nArticle,metaList) {

    var elementReadId = "#article" + nIssue + "_" + nArticle;

    for (const metaType of metaList) {
      //metaType = "person";
      elementMetaId="#" + metaType + "s" + nIssue + "_" + nArticle;
      var dataList = $(elementReadId + " ." + metaType).map(function() {
          return $(this).data("label");
      }).get();

      var dataListU=[... new Set(dataList)];
      // $(elementMetaId).html(dataListU.join("<br>"));

      // Cycles over found elements and shows checkboxes
      cntr=1;
      for (let md of dataListU) {
        $(elementMetaId).append('<input type="checkbox" class="metaCheck" id="metaCheck-' + cntr + '" value="1" onclick="showMeta(\''+elementReadId+'\',\'' + md + '\',this,\'' + metaType + '\')"> ' + md + '<br/>');
        cntr=cntr+1;
      }
    }

}


// Highlights the text corresponding to the selected checkbox (only for .person class at the moment)
function showMeta(elementReadId,label,chkbx,metaType) {

    var thisTimeColor = "#" + Math.floor((Math.random() * 16777215) + 1).toString(16);
    var found=false;

    $(elementReadId + " ." + metaType).each(function(index) {
      if ($(this).text() == label) {
        if (chkbx.checked) {
          $(this).css("background-color", thisTimeColor);
            if (!found) {
              $(elementReadId).animate({
                  scrollTop: $(elementReadId).scrollTop() + $(this).offset().top - 400
              }, 1000);
              found=true;
            }
        } else {
          $(this).css("background-color", "");
        }
      }
    }); // end each)

}
