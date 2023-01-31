import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './services/api.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  displayedColumns: string[] = ['itemName', 'catagory', 'comment', 'date', 'price', 'type', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title = 'mob-a';

  constructor(public dialog: MatDialog,
    public api: ApiService
  ) {

  }
  ngOnInit(): void {
    this.getAllItems();
  }


  openDialog() {
    this.dialog.open(DialogBoxComponent, {
      width: '30%'
    });


  }

  getAllItems() {
    this.api.getItem().subscribe({
      next:(res)=>{
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error While fetching records")
      }
    })

  }

  editItem(row:any){
    this.dialog.open(DialogBoxComponent,{
      width: '30%',
      data:row
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
