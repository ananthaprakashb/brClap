import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ ApiService ]
})
export class HomeComponent implements OnInit {
  
  displayedColumns = ['position', 'name'];
  dataSource = new MatTableDataSource([]);
  

  constructor(private api: ApiService) { 
    //this.api.createEvent().subscribe(()=> {});
  }

  ngOnInit() {
    this.api.getEvents().subscribe((response) => {
      let keys = Object.keys(response["admin_events"]);
      this.dataSource.data = keys.map(key=> {
        return response["admin_events"][key];
      });
 
      this.dataSource.data.forEach((row, idx) => {
        console.log(row);
        row.position = idx + 1;
      });
      this.dataSource.filter = "";
      console.log(this.dataSource.data)
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

export interface Element {
  name: string;
  position: number;
}