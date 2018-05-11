import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.scriptInit();
  }
  scriptInit(){
    $('#chepe_express_galeria').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) // Button that triggered the modal
      var slide = button.data('slide') // Extract info from data-* attributes
      var slideNumb = parseInt(slide);
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = $(this)
      console.log(slideNumb);

      modal.find('.item').removeClass("active")
      modal.find('.item').eq(slideNumb).addClass("active")
    })

    $('#chepe_regional_galeria').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) // Button that triggered the modal
      var slide = button.data('slide') // Extract info from data-* attributes
      var slideNumb = parseInt(slide);
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = $(this)
      console.log(slideNumb);

      modal.find('.item').removeClass("active")
      modal.find('.item').eq(slideNumb).addClass("active")
    })
  }

}
