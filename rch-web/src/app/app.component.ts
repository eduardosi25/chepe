import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private activated_route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService) {
    translate.setDefaultLang('es');
  }
  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }
  public showMainFooter(): boolean {
    return (this.router.url != "/" && this.router.url.indexOf('/reservaciones/confirmacion') < 0 );
  }
  public showMainHeader(): boolean {
    return (this.router.url.indexOf('/reservaciones/confirmacion') < 0);
  }
  public getRoutedClass(): string[] {
    var arr: string[] = [];
    let parts = this.router.url.split("/");
    for (var i = 0; i < parts.length; i++) {
      let part = parts[i];
      if (part != "") {
        part = "c-" + part;
        arr.push(part);
      }
    }
    return arr;
  }
  public switchLanguage(language: string) {
    this.translate.use(language);
  }
}
