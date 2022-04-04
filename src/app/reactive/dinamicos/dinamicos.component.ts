import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html'
})
export class DinamicosComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  formularioDinamico:FormGroup=this.fb.group({
    nombre:[,[Validators.required,Validators.minLength(3)]],
    favoritos: this.fb.array([['Metal Gear',Validators.required],['Age of Empires',Validators.required]], Validators.required)

  })

  nuevoFavorito: FormControl=this.fb.control('',Validators.required)

  validarCampo(campo:string){
    return this.formularioDinamico.controls[campo].errors  && this.formularioDinamico.controls[campo].touched
  }
  ngOnInit(): void {
  }


  get FavoritosArr(){
    return this.formularioDinamico.get('favoritos') as FormArray;
  }
  agregar(){
    if(this.nuevoFavorito.invalid){
      return;
    }else{
      this.FavoritosArr.push(this.fb.control(this.nuevoFavorito.value,Validators.required))
      //this.FavoritosArr.push(new FormControl(this.nuevoFavorito.value,Validators.required))
    }
    this.nuevoFavorito.reset();
    return
  }
  guardar(){
    console.log(this.formularioDinamico.value)
    if(this.formularioDinamico.invalid){
      this.formularioDinamico.markAllAsTouched();
      return;
    }else{
      //Se tratan datos y proseguimos con resetear el formulario
      this.formularioDinamico.reset();
    }
  }
  eliminar(i:number){
    this.FavoritosArr.removeAt(i)

  }
}
