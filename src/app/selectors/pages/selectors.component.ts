import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectorsService } from '../services/selectors.service';
import { Country } from '../interfaces/paises.interface';
import { switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-selectors',
  templateUrl: './selectors.component.html',
  styleUrls: ['./selectors.component.css']
})
export class SelectorsComponent implements OnInit {

  selectorsForm:FormGroup=this._fb.group({
    region:['',Validators.required],
    code:[{value: '', disabled:true},Validators.required],
    frontera:[{value: '', disabled:true},Validators.required]

  })

  regiones=this._selectorsService.regions
  paises:Country[]| null=[]
  fronteras:Country[]=[]
  constructor(private _fb:FormBuilder, private _selectorsService:SelectorsService) { }

  ngOnInit(): void {
  /*this.selectorsForm.get("region")?.valueChanges.subscribe(region=>{
    this._selectorsService.getByRegion(region).forEach(country=>this.countries=country)
    this.selectorsForm.setAsyncValidators
  })*/
    this.selectorsForm.get("region")?.valueChanges.pipe(
      tap( ()=>{
        this.selectorsForm.get('code')?.reset('')
      }),
      switchMap(region=>this._selectorsService.getByRegion(region))
    ).subscribe(code=>{this.paises=code
      code? this.selectorsForm.get('code')?.enable(): this.selectorsForm.get('code')?.disable()
    })

    this.selectorsForm.get("code")?.valueChanges.pipe(
      tap( ()=>{
        this.selectorsForm.get('frontera')?.reset('')
        this.fronteras=[]
      }),
      switchMap(code=>this._selectorsService.getByCode(code)),
      switchMap(pais=>
      this._selectorsService.getBorders(pais?.borders)
      )
    )
    .subscribe(paises=>{
      this.fronteras=paises,
      paises.length? this.selectorsForm.get('frontera')?.enable(): this.selectorsForm.get('frontera')?.disable()
  })
  }
  

  save(){
    this.selectorsForm.valid?alert("Formulario válido"):alert("Formulario inválido")
  }

}
