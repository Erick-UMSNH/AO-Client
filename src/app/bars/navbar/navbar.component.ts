import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() toggle: EventEmitter<boolean>;
  isToggle: boolean;

  constructor() {
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
