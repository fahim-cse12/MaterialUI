import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Brand New", "Used", "Low Quality"];
  productForm!: FormGroup;
  SaveOrUpdate: string = "Save";

  constructor(private formBuilder: FormBuilder, 
    private api: ApiService,
    private dialog: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editdata: any ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      comments: ['', Validators.required],
      price: ['', Validators.required],
      date: ['', Validators.required],
    });

    console.log(this.editdata);

    if(this.editdata){
      this.SaveOrUpdate = "Update";
      this.productForm.controls['productName'].setValue(this.editdata.productName);
      this.productForm.controls['category'].setValue(this.editdata.category);
      this.productForm.controls['freshness'].setValue(this.editdata.freshness);
      this.productForm.controls['comments'].setValue(this.editdata.comments);
      this.productForm.controls['price'].setValue(this.editdata.price);
      this.productForm.controls['date'].setValue(this.editdata.date);
    }
  }

  addProduct(){
    if(!this.editdata){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert("Product Added Successfully");
            this.productForm.reset();
            this.dialog.close('save');
          },
          error:()=>{
            alert("Something Went Wrong");
          }
        })
      }
    }else{
      this.updateProduct();
    }
   
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editdata.id).subscribe({
      next:(res)=>{
        alert("Product Updated Successfully");
        this.productForm.reset();
        this.dialog.close('update');
      },error:(err)=>{
        alert("Something went wrong when update");
      }
    })
  }




}
