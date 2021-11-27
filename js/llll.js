
/* Loads topbar.html in topBar div */
$(function(){$("#topBar").load("components/topbar.html"); });


/* Loads the articles inside the columns using JQuery*/

$(document).ready(function(){
   $('#article1_1').load("articles/article1_1.html", function() { getMetadata(1,1,["person","place","date","keyword"]); } ); //"#article1_1","#metaData1_1"
   $('#article1_2').load("articles/article1_2.html", function() { getMetadata(1,2,["person","place","date","keyword"]); } );
   $('#article1_3').load("articles/article1_3.html", function() { getMetadata(1,3,["person","place","date","keyword"]); } );
   $('#article2_1').load("articles/article2_1.html", function() { getMetadata(2,1,["person","language","place","date","keyword"]); } );
   $('#article2_2').load("articles/article2_2.html", function() { getMetadata(2,2,["person","language","place","date","keyword"]); } );
   $('#article2_3').load("articles/article2_3.html", function() { getMetadata(2,3,["person","language","place","date","keyword"]); } );
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



// Gets the list of metadata and shows it in the metaData box tabs
function getMetadata(nIssue,nArticle,metaList) {

    var suffix = nIssue + "_" + nArticle;
    var elementReadId = "#article" + suffix;
    var elementMetaTabs = "#tabs" +  suffix;
    var elementMetaData = "#metaData" + suffix;
    var elementTabContent = "#content" + suffix;

    // Creates the tab menu inside the metadata selector box
    var ariasel=true;
    var tabactive='active';
    for (const metaType of metaList) {
      $(elementMetaTabs).append('<li class="nav-item waves-effect waves-light" role="presentation"><a class="nav-link ' + tabactive + '" id="' + metaType + '-tab' + suffix + '" data-toggle="tab" href="#' + metaType + suffix + '" type="button" role="tab" aria-controls="' + metaType + '" aria-selected="' + ariasel + '">' + metaType + '</a></li>');
      ariasel='false';
      tabactive='';
    }

    var tabactive='active';
    var mystring='';
    for (const metaType of metaList) {  // For each type of metadata

      mystring='<div class="tab-pane ' + tabactive + '" id="' + metaType + suffix + '" role="tabpanel" aria-labelledby="' + metaType + '-tab' + suffix+'">';
      // console.log(mystring);

      elementMetaId="#" + metaType + "s" + nIssue + "_" + nArticle;
      var dataList = $(elementReadId + " ." + metaType).map(function() {
          return $(this).data("label");
      }).get();

      var dataListU=[... new Set(dataList)];

      // Cycles over found elements and shows checkboxes
      cntr=1;
      for (let md of dataListU) {
        // $(elementMetaId).append('<input type="checkbox" class="metaCheck" id="metaCheck-' + cntr + '" value="1" onclick="showMeta(\''+elementReadId+'\',\'' + md + '\',this,\'' + metaType + '\')"> ' + md + '<br/>');
        mystring+='<input type="checkbox" class="metaCheck" id="metaCheck-' + cntr + '" value="1" onclick="showMeta(\''+elementReadId+'\',\'' + md + '\',this,\'' + metaType + '\')"><label for="metaCheck-' + cntr + '">&nbsp;' + md + '</label><br/>';
        cntr=cntr+1;
      }

      mystring+='</div>';

      $(elementTabContent).append(mystring);
      tabactive='';

      // console.log($("#metaData2_1").html());

    }

}


// Highlights the text corresponding to the selected checkbox with a random color
function showMeta(elementReadId,label,chkbx,metaType) {

    // var thisTimeColor = "#" + Math.floor((Math.random() * 15000000) + 777215).toString(16);
    var thisTimeColor = "hsl(" + 360 * Math.random() + ',' + (25 + 70 * Math.random()) + '%,' + (75 + 10 * Math.random()) + '%)';
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

    // Sets the same background color for the checkbox label (or removes it if unchecked)
    if ($(chkbx)  .is(':checked')) {
      $(chkbx).next('label').css("background-color", thisTimeColor);
    } else {
      $(chkbx).next('label').css("background-color", '');
    }


}
