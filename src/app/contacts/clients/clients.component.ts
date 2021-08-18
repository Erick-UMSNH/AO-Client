import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

   @Input() receiveToggle:boolean;
  
   constructor() { 
     this.receiveToggle=false;
   }
  ngOnInit(): void {
    
  }

  moveContent = () =>{
    
  }

}
