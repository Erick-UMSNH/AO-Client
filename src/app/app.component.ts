import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AO';
  //For handling the state of the sidebar (open or close)
  toggleState: boolean;
  //User
  user: any;

  constructor(public authService: AuthService) {
    //Initialize variables
    this.toggleState = false;
    this.authService.checkSession();
  }
  ngOnInit() {
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
