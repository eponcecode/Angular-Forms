import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html'
})
export class BasicosComponent {
  @ViewChild('basicForm') basicForm!:NgForm;

  initForm = {
    producto: '',
    precio: 0,
    existencias: 0
  }

  nombre():boolean{
    return (this.basicForm?.controls['producto']?.invalid && this.basicForm?.controls['producto']?.touched)
  }
  precio():boolean{
    return (this.basicForm?.controls['precio']?.invalid && this.basicForm?.controls['precio']?.touched)
  }
  guardar(){
    console.log("Insercción correcta")
    this.basicForm.resetForm({
      precio:0,
      existencias: 0
    });

  }
}
