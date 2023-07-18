import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public url = "http://127.0.0.1:8000/api"

  constructor(
    private http: HttpClient
    ) { }

  create(client: Client): Observable<Client>{
    return this.http.post<Client>(this.url + "/clients/", client);
  }

  read(): Observable<Client[]>{
    return this.http.get<Client[]>(this.url + "/clients/");
  }

  readOne(id: number): Observable<Client>{
    return this.http.get<Client>(this.url + "/client/"+id + "/");
  }

  update(client: Client): Observable<Client>{
    return this.http.put<Client>(this.url + "/client/" + client.id + "/", client);
  }

  delete(client: Client): Observable<void>{
    return this.http.delete<void>(this.url + "/client/" + client.id);
  }

  searchByName(nom: string): Observable<any> {
    const params = new HttpParams().set('nom', nom);
    return this.http.get<any>(this.url + '/client/search', {params });
  }

}
