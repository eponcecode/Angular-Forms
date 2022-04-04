import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html'
})
export class SwitchesComponent implements OnInit {

  formularioSwitches: FormGroup=this.fb.group({
    genero: ['',Validators.required],
    notificaciones:[true,Validators.required],
    condiciones:[false,Validators.requiredTrue]
  })

  persona={
    genero:'F',
    notificaciones: true
  }
  terminos:boolean=false
  constructor(private fb:FormBuilder) {}

  ngOnInit(): void {
    this.formularioSwitches.reset({
        ...this.persona,
        condiciones: this.terminos
      })
  }
  guardar(){
    if(this.formularioSwitches.invalid){
      return;
    }else{
      //Se tratan datos
      const formValue={...this.formularioSwitches.value}
      delete formValue.condiciones
      this.persona=formValue
      //Se limpia
      this.formularioSwitches.reset();
    }
  }

}
