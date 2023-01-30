import { Component } from '@angular/core';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mob-a';

  constructor(public dialog: MatDialog) {}


  openDialog() {
    this.dialog.open(DialogBoxComponent, {
       width: '30%'
    });

   
  }
}
