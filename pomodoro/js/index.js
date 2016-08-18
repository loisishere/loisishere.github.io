  var min = 0;
  var sec = 0;
  var startBreak = false;
  function pomodoroStart(minutes) {
    $(".startPomodoro").attr("disabled",true);
    $(".startPomodoro").addClass("disabled");
    var p = setInterval(startCounter, 1000);
    function startCounter() {
      min = Math.floor(minutes / 60);
      sec = minutes % 60;
      $("#counter").css("color","white");
      if(min === 0 && sec ===0){
        clearInterval(p);
    $(".startPomodoro").attr("disabled",false);
    $(".startPomodoro").removeClass("disabled");
    startBreak =!startBreak;
      }
      if (sec < 10) {
        if(min < 10){
          min = "0" + min;
        }
        $("#counter").text(min + ":0" + sec);
      } else {
           if(min < 10){
          min = "0" + min;
        }
        $("#counter").text(min + ":" + sec);
      }
      if(min < 1){
$("#counter").css("color","red");
      }
minutes--;
    }
  }
  $(document).ready(function() {
$(".study .add").click(function(){
  var add = Number($(".study .mins").text());
  $(".study .mins").text(add+1);
})
$(".study .subtract").click(function(){
  var sub = Number($(".study .mins").text());
  $(".study .mins").text(sub-1);
})
$(".break .add").click(function(){
  var add = Number($(".break .mins").text());
  $(".break .mins").text(add+1);
})
$(".break .subtract").click(function(){
  var sub = Number($(".break .mins").text());
  $(".break .mins").text(sub-1);
})
$(".startPomodoro").click(function(){
  if(startBreak){
    $(".studyOrBreak").text("Break");
    pomodoroStart(Number($(".break .mins").text())*60);
  }else{
    $(".studyOrBreak").text("Study");
    pomodoroStart(Number($(".study .mins").text())*60);
  }
})
  })