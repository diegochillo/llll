
/* Loads topbar.html in topBar div */
$(function(){$("#topBar").load("components/topbar2.html"); });

/* Loads footer.html in footerBar div */
$(function(){$("#footerBar").load("components/footer.html"); });


/* Loads the articles inside the columns using JQuery*/
$(document).ready(function(){

   const urlParams = new URLSearchParams(window.location.search);
   const issueNumber = urlParams.get('number');
   if (issueNumber>0) {
     // The metadata list MUST include all the POSSIBLE metadata types. The not-found ones will not be displayed!
     $('#article1').load("articles/article" + issueNumber + "_1.html", function() { getMetadataNew(1,["person","language","place","date","organization","keyword"]); } );
     $('#article2').load("articles/article" + issueNumber + "_2.html", function() { getMetadataNew(2,["person","language","place","date","organization","keyword"]); } );
     $('#article3').load("articles/article" + issueNumber + "_3.html", function() { getMetadataNew(3,["person","language","place","date","organization","keyword"]); } );
   }
   //console.log(issueNumber);

});



/* Enables the stylesheet with ID nodeE and disables the three others */
function switchToSS (nodeE,nodeD1,nodeD2,nodeD3) {
  nodeE.media = '';
  nodeD1.media = 'none';
  nodeD2.media = 'none';
  nodeD3.media = 'none';
}

// Reverts all to the original style
function cleanUpSS() {
  $('#cssstyle1').attr('media', 'none');
  $('#cssstyle2').attr('media', 'none');
  $('#cssstyle3').attr('media', 'none');
  $('#cssstyle4').attr('media', 'none');
}



// Highlights the text corresponding to the selected checkbox with a random color
// This works both with issue1.html/issue2.html and with single issue.html file
function showMeta(elementReadId,label,chkbx,metaType) {

    // var thisTimeColor = "#" + Math.floor((Math.random() * 15000000) + 777215).toString(16);
    var thisTimeColor = "hsl(" + 360 * Math.random() + ',' + (25 + 70 * Math.random()) + '%,' + (75 + 10 * Math.random()) + '%)';


    var numArticles = [1,2,3];
    for (let nA of numArticles) { // This is to cycle all the articles

      var found=false;
      elementReadId="#article" + nA;

      // console.log("elementReadId = " + elementReadId); //DEBUG

      $(elementReadId + " ." + metaType).each(function(index) {
        //if ($(this).text() == label) {
        if ($(this).attr("data-label") == label) {
          if (chkbx.checked) {
            $(this).css("background-color", thisTimeColor);
              if (!found) {
                $(elementReadId).animate({
                    scrollTop: $(elementReadId).scrollTop() + $(this).offset().top - 500
                }, 1000);
                found=true;
              }
          } else {
            $(this).css("background-color", "");
          }
        }
      }); // end each)

    }

    // Sets the same background color for the checkbox label (or removes it if unchecked)
    if ($(chkbx)  .is(':checked')) {
      $(chkbx).next('label').css("background-color", thisTimeColor);
    } else {
      $(chkbx).next('label').css("background-color", '');
    }


}




// Gets the list of metadata and shows it in the metaData box tabs
// using the NEW SINGLE ISSUE.HTML FILE
function getMetadataNew(nArticle,metaList) {

    var suffix = nArticle;
    var elementReadId = "#article" + suffix;
    var elementMetaTabs = "#tabs" +  suffix;
    var elementTabContent = "#content" + suffix;
    // var elementMetaData = "#metaData" + suffix;

    var ariasel=true;

    var tabactivetab='active';
    var tabactive='active';
    var mystring='';
    cntr=(nArticle*100);
    for (const metaType of metaList) {  // For each type of metadata

      //console.log(metaType);

      elementMetaId="#" + metaType + "s" + nArticle;
      var dataList = $(elementReadId + " ." + metaType).map(function() {
          return [[$(this).data("label"), $(this).data("sort")]];
      }).get();

      // console.log(dataList);

      var dataListS=dataList.sort(function(a, b) {
        if ((a[1]==null) || (b[1]==null)) {
          if (a[0] < b[0]) return -1;
          if (a[0] > b[0]) return 1;
          return 0;
        } else {
          if (a[1] < b[1]) return -1;
          if (a[1] > b[1]) return 1;
          return 0;
        }
      });
      // console.log(dataListS);

      // var dataListU=[... new Set(dataListS)];

      var dataListA  = new Set(dataListS.map(JSON.stringify));  // Passage to Set to keep only unique values
      var dataListU = Array.from(dataListA).map(JSON.parse);    // Back from Set to Array


      // console.log(dataListU);

      // Creates the tab only if there are metadata to show
      if (dataListU.length>0) {

        //console.log("Lunghezza > 0");

        $(elementMetaTabs).append('<li class="nav-item waves-effect waves-light" role="presentation"><a class="nav-link ' + tabactivetab + '" id="' + metaType + '-tab' + suffix + '" data-toggle="tab" href="#' + metaType + suffix + '" type="button" role="tab" aria-controls="' + metaType + '" aria-selected="' + ariasel + '">' + metaType + 's</a></li>');
        ariasel='false';
        tabactivetab='';

        mystring='<div class="tab-pane ' + tabactive + '" id="' + metaType + suffix + '" role="tabpanel" aria-labelledby="' + metaType + '-tab' + suffix+'">';
        // console.log(mystring);

        // Cycles over found elements and shows checkboxes

        for (let md of dataListU) {
          // $(elementMetaId).append('<input type="checkbox" class="metaCheck" id="metaCheck-' + cntr + '" value="1" onclick="showMeta(\''+elementReadId+'\',\'' + md + '\',this,\'' + metaType + '\')"> ' + md + '<br/>');
          mystring+='<input type="checkbox" class="metaCheck" id="metaCheck-' + cntr + '" value="1" onclick="showMeta(\''+elementReadId+'\',\'' + md[0] + '\',this,\'' + metaType + '\')">';
          mystring+='<label for="metaCheck-' + cntr + '">&nbsp;' + md[0] + '</label><br/>';
          cntr=cntr+1;
        }

        mystring+='</div>';

        $(elementTabContent).append(mystring);
        tabactive='fade';

      }

      // console.log($("#metaData2_1").html());

    }

    // Adds ANALYSIS tab and calculates statistics
    $(elementMetaTabs).append('<li class="nav-item waves-effect waves-light" role="presentation"><a class="nav-link" id="analysis-tab' + suffix + '" data-toggle="tab" href="#analysis' + suffix + '" type="button" role="tab" aria-controls="analysis" aria-selected="false">analysis</a></li>');
    mystring = '<div class="tab-pane ' + tabactive + '" id="analysis' + suffix + '" role="tabpanel" aria-labelledby="analysis' + '-tab' + suffix+'">';
    // mystring += "Text Analysis:<br/>";

    var analysisRes=compendium.analyse($(elementReadId).text());
    console.log( analysisRes );

    var quanti = analysisRes.length;
    var totWords = 0;
    var totSentiment = 0;
    var totAmplitude = 0;
    var totPoliteness = 0;
    var totAvgLength = 0;
    var totDirtiness = 0;

    for (let i = 0; i < quanti; i++) {
      totSentiment+=analysisRes[i].profile.sentiment;
      totWords+=analysisRes[i].stats.words;
      totAmplitude+=analysisRes[i].profile.amplitude;
      totPoliteness+=analysisRes[i].profile.politeness;
      totAvgLength+=analysisRes[i].stats.avg_length;
      totDirtiness+=analysisRes[i].profile.dirtiness;
    }

    mystring += "<div><span class='analisysLabel'>Total words:</span> <span class='analysisValue'>" + totWords + "</span></div>";
    mystring += "<div><span class='analisysLabel'>Words avg. length:</span> <span class='analysisValue'>" + (totAvgLength/quanti).toFixed(5) + "</span>";
    mystring += "<div><span class='analisysLabel'>Sentences:</span> <span class='analysisValue'>" + quanti + "</span>";
    mystring += "<div><span class='analisysLabel'>Sentiment:</span> <span class='analysisValue'>" + (totSentiment/quanti).toFixed(5) + "</span>";
    mystring += "<div><span class='analisysLabel'>Sentiment amplitude:</span> <span class='analysisValue'>" + (totAmplitude/quanti).toFixed(5) + "</span>";
    mystring += "<div><span class='analisysLabel'>Politeness:</span> <span class='analysisValue'>" + (totPoliteness/quanti).toFixed(5) + "</span>";
    mystring += "<div><span class='analisysLabel'>Dirtiness:</span> <span class='analysisValue'>" + (totDirtiness/quanti).toFixed(5) + "</span>";
    mystring+='</div>';

    $(elementTabContent).append(mystring);

}






// Gets a random number between min and max (included)
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
