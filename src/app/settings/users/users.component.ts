import { Component, OnInit } from '@angular/core';
import { HeaderTab } from 'src/app/models/HeaderTab';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usersTabs: HeaderTab[];

  constructor() {
    this.usersTabs = [
      {
        active: true,
        icon: 'bx bx-food-menu',
        navigate: '/users',
      },
      {
        active: false,
        icon: 'bx bxs-user-circle',
        navigate: '/users/new',
      },
    ];
  }

  ngOnInit(): void {}
}
