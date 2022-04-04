import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html'
})
export class BasicosComponent implements OnInit{

 /* formularioBasico: FormGroup = new FormGroup({

    'nombre': new FormControl('RTX 8080T'),
    'precio': new FormControl(1500),
    'existencias': new FormControl(0)
  });*/
  formularioBasico:FormGroup = this.fb.group({
    nombre: [,[Validators.required,Validators.minLength(3)]],
    precio: [,[Validators.required,Validators.min(0)]],
    existencias: [,[Validators.required,Validators.min(0)]]
  });
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
      this.formularioBasico.reset({ //Puede no incluir todos los campos
        nombre: 'RTX 4080ti',
        precio: 1800
        //existencias: 16 - setValue debe contener todos los campos
      })
  }

  validarCampo(campo:string){
    return this.formularioBasico.controls[campo].errors  && this.formularioBasico.controls[campo].touched
  }

  guardar(){
    console.log(this.formularioBasico.value)
    if(this.formularioBasico.invalid){
      console.log("Is Invalid")
      this.formularioBasico.markAllAsTouched();
      return;
    }else{
      //Se tratan datos y proseguimos con resetear el formulario
      this.formularioBasico.reset();
    }

  }

}
