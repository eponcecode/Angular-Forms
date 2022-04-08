import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator{

  constructor(private _auth:AuthService){}
  validate(control: AbstractControl): Promise<ValidationErrors | null> {
    const email = control.value;
    return this._auth.getUsuariobyEmail(email)
  }
}
