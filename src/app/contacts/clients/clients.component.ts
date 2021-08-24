import { Component, Input, OnInit } from '@angular/core';
import { HeaderTab } from '../../models/HeaderTab';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  @Input() receiveToggle: boolean;
  clientsTabs: HeaderTab[];

  constructor() {
    this.receiveToggle = false;
    this.clientsTabs = [
      {
        active: true,
        icon: 'bx bx-food-menu',
        navigate: '/clients',
      },
      {
        active: false,
        icon: 'bx bxs-user-plus',
        navigate: '/clients/new',
      },
    ];
  }
  ngOnInit(): void {}

  moveContent = () => {};
}
