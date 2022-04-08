import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private supabase = createClient(environment.supabase_URL, environment.supabase_key)

  async getUsuariobyUsername(username:string){
    let { data: usuarios, error } = await this.supabase
      .from<Usuario>('USUARIOS')
      .select('*')
      .filter("username", "in", `(${username})`)
      .limit(1)
    return {usuarios, error}
  }
  async getUsuariobyEmail(email:string){
    let usuario: Usuario
    let { data: usuarios } = await this.supabase
      .from<Usuario>('USUARIOS')
      .select('usuario_id,email')
      .filter("email", "in", `(${email})`)
      .limit(1)
      if(usuarios![0]){
        usuario=usuarios![0]
        return {
          emailExistente:true
        }
      }else{
        return null
      }
    
  }
}
