import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/models/Persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  //Creamos variable para el EndPoint 
  //http://localhost:8080/api/persona/find/1
  private urlEndPoint: string = 'http://localhost:8080/api';//+'/';

  constructor(private http: HttpClient) { }

  findAll():Observable<Persona[]>{
    return this.http.get<any[]>(this.urlEndPoint+'/persona/findAll');
  }

  find(id:number):Observable<Persona>{
    return this.http.get<Persona>(this.urlEndPoint+'/persona/find/'+id);
  }

  guardar(persona: Persona):Observable<Persona>{
    return this.http.post<Persona>(this.urlEndPoint+'/persona/save', persona);
  }

  update(persona: Persona):Observable<Persona>{
    return this.http.put<Persona>(this.urlEndPoint+'/persona/update/'+persona.id, persona);
  }

  borrar(id: number):Observable<any>{
    return this.http.delete(this.urlEndPoint+'/persona/delete/'+id);
  }
}
