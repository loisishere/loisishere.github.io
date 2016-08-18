$(document).ready(function() {
  function searchWiki(wtitle){
    console.log(wtitle);
    wtitle = encodeURIComponent(wtitle);
    $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch="+wtitle,
    dataType: 'jsonp',
    type: 'GET',
    success: function(data) {
      var html ="";
      $.each(data.query.search,function(key,val){
        //console.log(val.title);
        html += "<a href='https://en.wikipedia.org/wiki/"+val.title.replace(/\s/g,"_") +"' target='_blank'><div class='pages'><h2>" + val.title +"</h2><span>"+val.snippet+"</span></div></a>";
      })
      $("#stuff").html(html);
    }
  })
  }
  $("#submit").click(function(){
    searchWiki($("#title").val());
  })
  $("random").click(function(){
    
  })
})