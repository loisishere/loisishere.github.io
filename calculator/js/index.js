$(document).ready(function() {
  var newVal = "";
  var dot = true;
  var exp = ["+", "-", "*", "/", "%"];
  var lenDetails = 0;
  var newTxt = "";
  var ans = false;
function checkButtonOrKeyPress(btnPress){
	lenDetails = $(".inputDetails").text().length - 1;
	//add just one dot
	if(dot && btnPress === "."){
	  newVal += btnPress;
      $(".expression").val(newVal);
      dot = !dot;
    }
    //Add button value to expression index 
	if(Number(String.fromCharCode((btnPress).charCodeAt(0))) >= 0 && Number(String.fromCharCode((btnPress).charCodeAt(0))) <= 9){
		if(exp.indexOf($(".inputDetails").text().split("")[lenDetails]) > -1){
			newVal ="";
		}
		newVal += btnPress;
      $(".expression").val(newVal);
      };
if(exp.indexOf(btnPress) > -1){
	var txt = $(".inputDetails").text();
    	var newExp =btnPress;
      if($(".theAnswer").text() && $(".expression").val() ===""){ 
        $(".inputDetails").text($(".theAnswer").text());
      $(".theAnswer").text("");
    }
    	if(exp.indexOf($(".inputDetails").text().split("")[lenDetails]) > -1 && $(".expression").val() ===""){
      	txt = $(".inputDetails").text().split("").splice(0, lenDetails).join("");;
      	newExp = btnPress;
      }else{
        txt = $(".inputDetails").text();
            newExp = btnPress;
          }

          $(".inputDetails").text(txt + newVal + " " + newExp);
            newVal = "";
            $(".expression").val("");
      
}
    if (btnPress === "Enter") {

      if (exp.indexOf($(".inputDetails").text().split("")[lenDetails]) > -1 && $(".expression").val() === "") {
        newTxt = $(".inputDetails").text().split("").splice(0, lenDetails).join("");
        ans = eval(newTxt);
      } else {
      	newTxt = $(".inputDetails").text() + $(".expression").val();
        ans = (eval($(".inputDetails").text() + $(".expression").val()));
      }
      $(".inputDetails").text(newTxt);
      $(".expression").val(ans);
    }
    if(btnPress ==="CE"){
    	$(".inputDetails").text("");
    	 $(".expression").val("");
      newVal = "";
       $(".theAnswer").text("");
    }
    if(ans){
      newVal = "";
      $(".expression").val("");
    	$(".theAnswer").text(ans);
      $(".inputDetails").text("");
    	ans =false;
    }
	}
 $(".container").on('keypress',function(e){    checkButtonOrKeyPress(e.key);
 })
  $(".btns").click(function(){
    checkButtonOrKeyPress($(this).text());
  })
})