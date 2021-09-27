import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() toggle: EventEmitter<boolean>;
  @Input() user: any;
  isToggle: boolean;

  constructor(public authService: AuthService) {
    this.toggle = new EventEmitter();
    this.isToggle = true;
  }

  ngOnInit(): void {}

  /**
   * Toggle the sidebar
   */
  toggleSidebar = () => {
    this.isToggle = !this.isToggle;
    this.toggle.emit(this.isToggle);
  };
}
