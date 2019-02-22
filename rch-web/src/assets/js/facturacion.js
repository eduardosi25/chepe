function start() {

    $(".show-factura").click(function() {
        $(".close").trigger("click");
        setTimeout(() => {
            $(".btn-facturaGenerada").trigger("click");
        }, 1000);
    })
}

function responsive() {

}
$(document).on('ready', start);
$(window).on('load resize', responsive);