import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Favorito, Persona } from 'src/app/models/persona.model';
@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html'
})
export class DinamicosComponent {
  @ViewChild('basicForm') basicForm!:NgForm;
  persona:Persona={
    nombre: 'Fany',
    favoritos: [
      {id: 1, nombre: 'Metal Gear'},
      {id: 2, nombre: 'Age of Empires IV'},
    ]
  }
  nuevoFavorito:string=""
  Nombre():boolean{
    return (this.basicForm?.controls['nombre']?.invalid && this.basicForm?.controls['nombre']?.touched)
  }
  guardar(){
    console.log("Guardando...")
    console.log(this.basicForm?.controls)
  }
  agregar(){
    const favorito: Favorito={
      id: this.persona.favoritos.length+1,
      nombre: this.nuevoFavorito
    }
    this.persona.favoritos.push({...favorito})
    this.nuevoFavorito=""
  }
  eliminar(id:number){
    this.persona.favoritos.splice(id,1)
  }
}
