/*
Author:      Aleksandar Janković, office@ajankovic.com
Description: Main javascript file for Twitter accounts feed application. Made
             for demonstration purposes only. It handles main form submition,
             conversion of JSON response to HTML and finding urls in messages               
*/

(function($){
  // caching panels
  var $panels = $('#panels');

  // finding urls in given text and replacing them with anchors
  // used for creating clickable links in twitter messages
  function findUrls(text){
    // regex pattern for url recognition
    var pattern = /\b(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)[-A-Z0-9+&@#\/%=~_|$?!:,.]*[A-Z0-9+&@#\/%=~_|$]/i;
    var url = pattern.exec(text);
    if(url===null){
      return text;
    }
    var anchor = '<a href="'+url+'">'+url+'</a>';
    return text.replace(url, anchor);
  }

  // transforming JSON data into html account feeds
  function toHtml(data){
    var panels = {};
    panels.all = data.timeline; // all feeds panel

    // sorting each feed into it's own panel
    $.each(data.timeline, function(i, item){
      panels[item.username] = panels[item.username] || [];
      panels[item.username][panels[item.username].length] = item;
    });

    // converting sorted data into html
    for(var panel in panels){
      var $panel = $("<div>").attr("class", "panel");
      for(var item in panels[panel]){
        item = panels[panel][item];
        $panel.append('<div class="message"><a href="http://twitter.com/'+
            item.username+'">'+item.username+'</a>'+
            '<p>'+findUrls(item.text)+'</p>'+
            '<p>'+(new Date(item.time*1000))+'</p></div>'
        );
      }
      $panel.appendTo('#panels');
    }
  };


  // handling main form submition
  $('#names-form').submit(function() {
    var usernames = $('#accounts').val();
    if(usernames !== ''){ // if submition is not empty
      $panels.slidingPanels('destroy');
      $.getJSON('fetchfeeds.php',
        {accounts: usernames},
        function(data){
          if(data.error){
            $panels.html(data.error.error);
          }else{
            toHtml(data);
            $panels.slidingPanels();
          }
        }  
      );
    }
    return false; // preventing default form submition
  });
})(jQuery)
