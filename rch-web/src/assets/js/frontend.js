$(document).ready(function () {
    setTimeout(function(){
        $(".js-open__modal").click(function(e){
            $(".modalbox").addClass("active");
        });
        $('.js-close__modal').click(function (e) {
            $('.modalbox').removeClass("active");
        });
     }, 1000);
 }); 