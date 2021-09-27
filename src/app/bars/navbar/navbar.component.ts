import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() toggle: EventEmitter<boolean>;
  user: any;
  isToggle: boolean;

  constructor(public authService: AuthService) {
    this.toggle = new EventEmitter();
    this.isToggle = true;
    //Get the user info from the service
    this.authService.userInfo.subscribe((result) => {
      this.user = result;
    });
  }

  ngOnInit(): void {}

  /**
   * Toggle the sidebar
   */
  toggleSidebar = () => {
    this.isToggle = !this.isToggle;
    this.toggle.emit(this.isToggle);
  };

  logout = () => {
    this.authService.logoutUser();
  };
}
