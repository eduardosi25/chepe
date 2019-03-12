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
            //$("body").removeClass("active");
        });

        //Slick slider 
        $('.js-wagon__slider').slick({
            dots: true,
            arrows: true,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1
        });

     }, 1000);
 }); 
