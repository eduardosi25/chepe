import { Component, OnInit } from '@angular/core';
/** Inicializa variable para poder usar jquery en componente */
declare var $: any;
/** Este componente tiene su funcionalidad en el html*/
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }
/** inserta video en div */
  ngOnInit() {
    this.scriptInit();
    var vid = document.getElementById("bgvid");
  }
  /** Video player load y muestra diferentes modales */
  scriptInit(){
    // Video player load
    $(document).ready(function () {
      // Insert video in DOM
      $("#modal-video").append('<video poster="assets/img/bg/mountain-water.jpg" id="bgvid" autoplay="1" playsinline muted><source src="assets/img/chepe.webm" type="video/webm"><source src="assets/img/chepe.mp4" type="video/mp4"></video>');

      // Stop video ended
      var video = document.getElementsByTagName('video')[0];

      video.onended = function(e) {
        /*Do things here!*/
        $("#modal-video").fadeOut();
        $("body").css("overflow", "auto");
        $('#modal-promocion').modal();
      };

      // Video starter
      $('#bgvid').on('started', function () {
        $("body").css("overflow", "hidden");
      });

      // Promo active
      $("#modal-promocion").click(function () {
        $("body").addClass("active");
      });
    });

    // Modal video
    $('.modal-video').click(function () {
      $(this).remove();
      $("body").css("overflow", "auto");
    });

    // Promo modal
    $('#modal-promocion').click(function () {
      $(this).modal('hide');
    });
  }

}
