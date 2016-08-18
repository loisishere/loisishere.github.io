$(document).ready(function(){
  getQuote();
  })
  //create a function for the random quote button
  //$.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?").done(getQuote)
  function getQuote(){
    $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?").done(function(response){
      var qtxt = response.quoteText;
      var qaut = response.quoteAuthor;
      var quall =  qtxt + " -"+ qaut;
      var enqu = encodeURIComponent(quall)
    if((qtxt.length + qaut.length)+38 > 140){
      getQuote();
      return;
    }
  $("#quote").text(response.quoteText);
    $("#author").text(response.quoteAuthor);
    $("#tweet").attr("href","https://twitter.com/intent/tweet?via=_loisishere_&text=" + enqu);
    })  
}