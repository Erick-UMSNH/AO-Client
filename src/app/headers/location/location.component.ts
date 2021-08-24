import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  @Input() title: string;
  tabs: any[];

  constructor() {
    this.title = '';
    this.tabs = [
      {
        active: true,
        icon: 'bx bxl-docker',
        navigate: '/suppliers',
      },
      {
        active: false,
        icon: 'bx bxs-hand',
        navigate: '/suppliers/new',
      },
    ];
  }

  ngOnInit(): void {}
}
