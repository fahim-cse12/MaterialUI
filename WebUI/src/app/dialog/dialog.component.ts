import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Brand New", "Used", "Low Quality"];
  productForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialog: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      comments: ['', Validators.required],
      price: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  addProduct(){
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
  }




}
