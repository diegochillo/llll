
/* Loads topbar.html in topBar div */
$(function(){$("#topBar").load("components/topbar.html"); });


/* Loads the articles inside the columns using JQuery*/

$(document).ready(function(){
   $('#article1_1').load("articles/article1_1.html", function() { getMetadata("#article1_1","#metaData1_1"); } );
   $('#article1_2').load("articles/article1_2.html", function() { getMetadata("#article1_2","#metaData1_2"); } );
   $('#article1_3').load("articles/article1_3.html", function() { getMetadata("#article1_3","#metaData1_3"); } );
   $('#article2_1').load("articles/article2_1.html", function() { getMetadata("#article2_1","#metaData2_1"); } );
   $('#article2_2').load("articles/article2_2.html", function() { getMetadata("#article2_2","#metaData2_2"); } );
   $('#article2_3').load("articles/article2_3.html", function() { getMetadata("#article2_3","#metaData2_3"); } );

});



/* Enables the stylesheet with ID nodeE and disables the three others */
function switchToSS (nodeE,nodeD1,nodeD2,nodeD3) {
  nodeE.media = '';
  nodeD1.media = 'none';
  nodeD2.media = 'none';
  nodeD3.media = 'none';
  /* nodeD2.media = 'none'; */
}



// Gets the list of metadata and shows it in the metaData box (only for .person class at the moment)
function getMetadata(elementReadId,elementMetaId) {
  // Loads metadata

    var dataList = $(elementReadId + " .person").map(function() {
        return $(this).data("label");
    }).get();

    var dataListU=[... new Set(dataList)];
    // $(elementMetaId).html(dataListU.join("<br>"));

    // Cycles over found elements and shows checkboxes
    cntr=1;
    for (let md of dataListU) {
      $(elementMetaId).append('<input type="checkbox" class="metaCheck" id="metaCheck-' + cntr + '" value="1" onclick="showMeta(\''+elementReadId+'\',\'' + md + '\',this)"> ' + md + '<br/>');
      cntr=cntr+1;
    }

}


// Highlights the text corresponding to the selected checkbox (only for .person class at the moment)
function showMeta(elementReadId,label,chkbx) {
    thisTimeColor = "#" + Math.floor((Math.random() * 65535) + 1).toString(16);
    $(elementReadId + " .person").each(function(index) {
      if ($(this).text() == label) {
        if (chkbx.checked) {
          $(this).css("background-color", thisTimeColor);
        } else {
          $(this).css("background-color", "");
        }
      }
    }); // end each)

}
