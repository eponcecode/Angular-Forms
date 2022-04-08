import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public PatternNombreCompuesto: string = '([A-ZÁÉÍÓÚÜ]{1})([a-záéíóúü]+) ([A-ZÁÉÍÓÚÜ]{1})([a-záéíóúü]+)(( [A-ZÁÉÍÓÚÜa-záéíóúü]+)*)(( ([A-ZÁÉÍÓÚÜ]{1})([a-záéíóúü]+))*)(( ([A-ZÁÉÍÓÚÜ]{1})([a-záéíóúü]+))*)'
  public PatternEmail: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  constructor() { }

  usernameValidate(control: FormControl): ValidationErrors | null {
    const valor: string = control.value?.trim().toLowerCase()
    if (valor === 'strider') {
      return {
        noStrider: true
      }
    }
    return null
  }
  camposDiferentes(campo1: string, campo2: string): ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const campo_1 = control.get(campo1)?.value
      const campo_2 = control.get(campo2)?.value
      if (campo_1 === campo_2) {
        return null
      }else{
        control.get(campo2)?.setErrors({camposDiferentes: true})
        return {
          camposDiferentes: true
        }
      }
    }
  }


}
