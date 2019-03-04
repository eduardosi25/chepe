$(document).ready(function () {
    setTimeout(function(){

        //--Change position dropdown calendar (datepicker)
        $( '.datepicker' ).datepicker({
        orientation: 'top right'
        });

        //btn form top
        var myitem = $("html").find(".btn-link__orange");
        console.log(myitem);
        myitem.parents("body").addClass("btn-active");

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
            //$("body").removeClass("active");
        });
     }, 1000);
 }); 
