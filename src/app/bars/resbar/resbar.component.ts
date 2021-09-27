import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-resbar',
  templateUrl: './resbar.component.html',
  styleUrls: ['./resbar.component.css'],
})
export class ResbarComponent implements OnInit {
  //Receive action from parent
  @Input() receiveAction: boolean;
  user: any;
  //loggedIn: boolean = false;

  //For the estadisticas submenu
  estSubmenu: boolean;
  //For the taller submenu
  talSubmenu: boolean;
  //For the fin submenu
  finSubmenu: boolean;
  //For the fin submenu
  conSubmenu: boolean;
  //For the fin submenu
  confSubmenu: boolean;

  constructor(public authService: AuthService) {
    //Initialize variables
    this.receiveAction = false;
    this.estSubmenu = false;
    this.talSubmenu = false;
    this.finSubmenu = false;
    this.conSubmenu = false;
    this.confSubmenu = false;
    //Get the user info from the service
    this.authService.userInfo.subscribe((result) => {
      this.user = result;
    });
  }

  ngOnInit(): void {
    this.receiveAction = true;
  }

  /***************** Toggling ********************/

  /**
   * Toggle estadisticas submenu
   */
  toggleEstSubmenu = () => {
    this.estSubmenu = !this.estSubmenu;
  };

  /**
   * Toggle taller submenu
   */
  toggleTalSubmenu = () => {
    this.talSubmenu = !this.talSubmenu;
  };

  /**
   * Toggle finanzas submenu
   */
  toggleFinSubmenu = () => {
    this.finSubmenu = !this.finSubmenu;
  };

  /**
   * Toggle contactos submenu
   */
  toggleConSubmenu = () => {
    this.conSubmenu = !this.conSubmenu;
  };

  /**
   * Toggle contactos submenu
   */
  toggleConfSubmenu = () => {
    this.confSubmenu = !this.confSubmenu;
  };

  logout = () => {
    this.authService.logoutUser();
  };
}
