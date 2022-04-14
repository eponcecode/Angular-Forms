
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/paises.interface';
@Injectable({
  providedIn: 'root'
})
export class SelectorsService {
  private _apiURL:string ="https://restcountries.com/v3.1/"
  private httpParams = new HttpParams()
  .set('fields','fields=cca3,name,borders,cca3')
  httpBordersParams = new HttpParams()
  .set('fields','fields=cca3,name,cca3')
  private _regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]
  get regions(){
    return [...this._regions]
  }
  constructor(private _http: HttpClient) { }

  getByRegion(region:string): Observable<Country[] | null>{
    if(!region){
      return of(null)
    }
    return this._http.get<Country[]>(this._apiURL+`region/${region}`,{params:this.httpParams});
  }
  getByCode(code:string):Observable<Country | null>{
    if(!code){
      return of(null)
    }
    return this._http.get<Country>(this._apiURL+`alpha/${code}`,{params:this.httpParams})
  }
  getBorderByCode(code:string):Observable<Country>{
  
    return this._http.get<Country>(this._apiURL+`alpha/${code}`,{params:this.httpBordersParams})
  }
  getBorders(borders: string[] | undefined):Observable<Country[]>{
    if(!borders){
      return of([])
    }
    const peticiones: Observable<Country>[]=[];
    borders.forEach(codigo=>{
      const peticion = this.getBorderByCode(codigo);
      peticiones.push(peticion)
    })
    return combineLatest(peticiones);
  }
}
