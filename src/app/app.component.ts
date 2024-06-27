import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
   item: any;
  @Input () data_parent:string="du lieu cha";
  items = ['item1', 'item2', 'item3', 'item4'];
  addItem(newItem: string) {
    this.items.push(newItem);   

}
receivedDataFromChild(event:any){
  this.data_parent=event;
}
}
