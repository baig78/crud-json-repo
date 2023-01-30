import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

interface Catagory {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

itemForm! : FormGroup;

  types = ["Brand New", "Second Hand", "Refurbished"]
  catagories: Catagory[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  

  constructor(
    private FormBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.itemForm = this.FormBuilder.group({
      itemName: ['',Validators.required],
      catagory: ['',Validators.required],
      date: ['',Validators.required],
      type: ['',Validators.required],
      price: ['',Validators.required],
      comment: ['',Validators.required],
    })
  }


  addItem(){
   if(this.itemForm.valid){
    this.api.postItem(this.itemForm.value).subscribe({
      next:(res)=>{
        alert("Item added Successfully")
        this.itemForm.reset();
      },
      error:()=>{
        alert("Error while adding the item")
      }
    })
   }
  }

}
