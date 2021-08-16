import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  toggle:boolean;

  constructor() {
    this.toggle = false;
  }

  ngOnInit(): void {
  }

  toggleSidebar = () =>{
    console.log("toggling sidebar");
    this.toggle =!this.toggle; 
    // if(this.toggle.length>0)
    // this.toggle.pop();
    // else{
    //   this.toggle.push("active")
    // }
  }
}
