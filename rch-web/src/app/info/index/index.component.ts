import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.scriptInit();
    var vid = document.getElementById("bgvid");
  }
  scriptInit(){
    // Video player load
    $(document).ready(function () {
      $("#modal-video").append('<video poster="assets/img/bg/mountain-water.jpg" id="bgvid" autoplay="1" playsinline muted><source src="assets/img/chepe.webm" type="video/webm"><source src="assets/img/chepe.mp4" type="video/mp4"></video>');
      $('body').delegate('ended','#bgvid', function () {
        $("#modal-video").fadeOut();
        $("body").css("overflow", "auto");
        $('#modal-promocion').modal();
      });
      $('#bgvid').on('started', function () {
        $("body").css("overflow", "hidden");
      });
      $("#modal-promocion").click(function () {
        $("body").addClass("active");
      });
    });

    $('.modal-video').click(function () {
      $(this).remove();
      $("body").css("overflow", "auto");
    });

    $('#modal-promocion').click(function () {
      $(this).modal('hide');
    });
  }

}
