$(document).ready(function () {
    setTimeout(function(){

        //-- Close modal
        $(".js-open__modal").click(function(e){
            $(".modalbox").addClass("active");
        });
        $('.js-close__modal').click(function (e) {
            $('.modalbox').removeClass("active");
        });

        //-- Close lightbox
        $(".js-close-modal").click(function(e){
            $(".modal-appear").addClass("active");
        });

        //--Close modal index
        $(".js-specialClose__modal").click(function(e){
            $(".modalbox").addClass("active");
        });
     }, 1000);
 }); 