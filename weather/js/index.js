$(document).ready(function() {
  //Object of background images with weather conditions
  var weatherCond = {
    "Rain-d":"https://dl.dropboxusercontent.com/u/22859387/fcc/weatherIcons/001lighticons-18.png",
    "Rain-n":"https://dl.dropboxusercontent.com/u/22859387/fcc/weatherIcons/001lighticons-18.png",
    "Clouds-d":"https://dl.dropboxusercontent.com/u/22859387/fcc/weatherIcons/001lighticons-08.png",
    "Clouds-n":"https://dl.dropboxusercontent.com/u/22859387/fcc/weatherIcons/001lighticons-09.png",
    "Clear-d":"https://dl.dropboxusercontent.com/u/22859387/fcc/weatherIcons/001lighticons-02.png",
    "Clear-n":"https://dl.dropboxusercontent.com/u/22859387/fcc/weatherIcons/001lighticons-03.png",
    "Snow-d":"https://dl.dropboxusercontent.com/u/22859387/fcc/weatherIcons/001lighticons-23.png",
    "Snow-n":"https://dl.dropboxusercontent.com/u/22859387/fcc/weatherIcons/001lighticons-23.png",
    "Thunderstorm-d":"https://dl.dropboxusercontent.com/u/22859387/fcc/weatherIcons/001lighticons-15.png",
    "Thunderstorm-n":"https://dl.dropboxusercontent.com/u/22859387/fcc/weatherIcons/001lighticons-15.png"

  }
  //time of day background change
  var d = new Date();
  var day = "-d";
  var unit = true;
  var time = d.getHours();
  if(time < 6 || time > 20){
    $('body').css({
      "background":"-webkit-linear-gradient(Teal,Tomato) no-repeat fixed",
       "background": "-o-linear-gradient(Teal,Tomato) no-repeat fixed",
      "background":"-moz-linear-gradient(Teal,Tomato) no-repeat fixed",
      "background":"linear-gradient(Teal,Tomato) no-repeat fixed"
    });
    $('#location').css("color","white");
    $('#temp').css("color","white");
    $('img').addClass("night");
    day="-n";
  }
  else if(time < 12){
    $('body').css({
      "background":"-webkit-linear-gradient(LightSeaGreen, Moccasin) no-repeat fixed",
       "background": "-o-linear-gradient(LightSeaGreen, Moccasin) no-repeat fixed",
      "background":"-moz-linear-gradient(LightSeaGreen, Moccasin) no-repeat fixed",
      "background":"linear-gradient(LightSeaGreen, Moccasin) no-repeat fixed"
    });
    $('#location').css("color","black");
    $('#temp').css("color","black");
  }
  else if(time <= 20){
    $('body').css({
      "background":"-webkit-linear-gradient(MediumAquaMarine,LightCyan) no-repeat fixed",
       "background": "-o-linear-gradient(MediumAquaMarine,LightCyan) no-repeat fixed",
      "background":"-moz-linear-gradient(MediumAquaMarine,LightCyan) no-repeat fixed",
      "background":"linear-gradient(MediumAquaMarine,LightCyan) no-repeat fixed"
    });
    $('#location').css("color","black");
    $('#temp').css("color","black");
   
  }
  //GeoLocation API
  $.getJSON("http://ip-api.com/json", function(data) {
    //the current location of the user
    $("#city").text(data.city);
    $("#state").text(data.region);
    $("#country").text(data.countryCode);
    //Current Weather: current tempature, min and max temp. wind speed
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + data.lat + "&lon=" + data.lon + "&units=imperial&APPID=96d57a15152b798005284b758655b0ec", function(owp) {
      $("#temp").click(function(){
        unit = !unit;
        if(unit){
        $(this).html(Math.round(owp.main.temp) +"&deg; F");
      }else{
        $(this).html(Math.round((owp.main.temp -32)*5/9) +"&deg; C");
      }
      })
      $("#temp").html(Math.round(owp.main.temp) +"&deg; F");
      $('img').attr("src",weatherCond[owp.weather[0].main +day])
      $("#descr").text(owp.weather[0].description);
    })
    $.getJSON("http://api.openweathermap.org/ta/2.5/forecast?lat=" + data.lat + "&lon=" + data.lon + "&units=imperial&APPID=96d57a15152b798005284b758655b0ec", function(owp) {
      $("#temp2").text(owp.list[0].dt_txt);
    })

  })
})