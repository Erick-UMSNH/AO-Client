import { Component, Input, OnInit } from '@angular/core';
import { HeaderTab } from '../../models/HeaderTab';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() tabs: HeaderTab[];

  constructor() {
    this.title = '';
    this.subtitle = '';
    this.tabs = [];
  }

  ngOnInit(): void {}
}
