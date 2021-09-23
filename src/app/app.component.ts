import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AO';
  //For handling the state of the sidebar (open or close)
  toggleState: boolean;

  constructor(private cookieService: CookieService) {
    //Initialize variables
    this.toggleState = false;
  }
  ngOnInit() {
    console.log('Cookies: ', this.cookieService.getAll());
    //Bar is closed (by default)
    this.toggleState = true;
  }

  /**
   * Receive action from the navbar
   * @param toggle (open:false or close:true)
   */
  handleToggle = (toggle: boolean) => {
    //Store the action from the navbar in a local variable
    this.toggleState = toggle;
  };
}
