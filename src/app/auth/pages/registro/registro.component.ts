import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { retry } from 'rxjs';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import { ValidatorService } from 'src/app/shared/validators/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  constructor(private vs: ValidatorService, private fb:FormBuilder, private emailValidator:EmailValidatorService) { 
  }

  registerForm: FormGroup = this.fb.group({
    nombre: ['',[Validators.required,Validators.pattern(this.vs.PatternNombreCompuesto)]],
    email:['',[Validators.required,Validators.pattern(this.vs.PatternEmail)],[this.emailValidator]],
    username: ['',[Validators.required,this.vs.usernameValidate]],
    password:['',[Validators.required, Validators.minLength(6)]],
    password_confirm:['',Validators.required]

  },{
    validators:[this.vs.camposDiferentes('password','password_confirm')]
  })

  ngOnInit(): void {
    /*this.registerForm.reset({
      nombre: 'Estefanía Ponce De León',
      email: 'eponcecode@gmail.com',
      username: 'eponcecode'
    })*/
    /*this.registerForm.reset({
      nombre: 'Test 1',
      email: 'test_1@correo.mx',
      username: 'Test_1'
    })*/
  }
  get emailErrorMSG():string{
    const errors=this.registerForm.get('email')?.errors
    if(errors!['required']){
      return 'El correo electrónico es obligatorio'
    }else
      if(errors!['pattern']){
        return 'El correo electrónico no tiene un formato válido'
      }else if(errors!['emailExistente']){
        return 'El correo electrónico indicado ya está asignado a otra cuenta'
      }else
        return ''
  }//
  get usernameError():string{
    const errors=this.registerForm.get('username')?.errors
    if(errors!['required']){
      return 'El username es obligatorio'
    }else
      if(errors!['noStrider']){
        return 'El username no puede ser strider'
      }else
        return ''
    
  }
  campoValido(campo:string){
    return this.registerForm.get(campo)?.invalid && this.registerForm.get(campo)?.touched
  }

  registrar(){
    console.log(this.registerForm.value)
    this.registerForm.markAllAsTouched();
  }
}
