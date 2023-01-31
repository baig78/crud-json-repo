import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


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
  actionBtn: string = "save";

itemForm! : FormGroup;

  types = ["Brand New", "Second Hand", "Refurbished"]
  catagories: Catagory[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  

  constructor(
    private FormBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData :any,
    private dialogRef: MatDialogRef<DialogBoxComponent>
  ) { }

  ngOnInit(): void {
    this.itemForm = this.FormBuilder.group({
      itemName: ['',Validators.required],
      catagory: ['',Validators.required],
      date: ['',Validators.required],
      type: ['',Validators.required],
      price: ['',Validators.required],
      comment: ['',Validators.required],
    });
  if(this.editData){
    this.actionBtn = "Update"
    this.itemForm.controls['itemName'].setValue(this.editData.itemName)
    this.itemForm.controls['catagory'].setValue(this.editData.catagory)
    this.itemForm.controls['date'].setValue(this.editData.date)
    this.itemForm.controls['type'].setValue(this.editData.type)
    this.itemForm.controls['price'].setValue(this.editData.price)
    this.itemForm.controls['comment'].setValue(this.editData.comment)
  }
  }


  addItem(){
   if(this.editData){
    if(this.itemForm.valid){
      this.api.postItem(this.itemForm.value).subscribe({
        next:(res)=>{
          alert("Item added Successfully")
          this.itemForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while adding the item")
        }
      })
     }
     else{
      this.updateItem()
     }
   }
  }

  updateItem(){
    this.api.putItem(this.itemForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("Item updated Successfully")
        this.itemForm.reset();
        this.dialogRef.close('update');
      }
    })
  }

}
