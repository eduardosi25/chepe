$(document).on('click', '.seat', function (e) {
 var selectedseats = $('div.seat.selected').length;
var seatsnumbermax = $('#seatsnumbermax').attr('data');
    if (selectedseats < seatsnumbermax){
        if (!$(this).hasClass("unavailable")) {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            }
            else {
                $(this).addClass( "selected" );
                var selectedseats = $('div.seat.selected').length;
            }
        }
    }
    else {
        if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            }
        else if (!$(this).hasClass("unavailable")){
            alert("Has seleccionado suficientes asientos. Anule la selección en uno si desea cambiar lugares.")
        }
    }

});