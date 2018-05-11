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
  }
  scriptInit(){
    // Video player load
    $(document).ready(function () {
      $('#bgvid').on('ended', function () {
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
