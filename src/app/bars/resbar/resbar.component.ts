import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-resbar',
  templateUrl: './resbar.component.html',
  styleUrls: ['./resbar.component.css'],
})
export class ResbarComponent implements OnInit {
  //Emit toggle to parent component
  @Output() toggle: EventEmitter<boolean>;
  //For the sidebar toggle
  hideSidebar: boolean;
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

  constructor() {
    //Initialize variables
    this.toggle = new EventEmitter();
    this.hideSidebar = false;
    this.estSubmenu = false;
    this.talSubmenu = false;
    this.finSubmenu = false;
    this.conSubmenu = false;
    this.confSubmenu = false;
  }

  ngOnInit(): void {}

  /***************** Toggling ********************/

  /**
   * Toggle the sidebar
   */
  toggleResbar = () => {
    this.toggle.emit(!this.hideSidebar);
    this.hideSidebar = !this.hideSidebar;
  };

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
}
