import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contacto.model';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrl = 'http://localhost:5117/api/Contactos';

  constructor(private http: HttpClient) {}

  getContactos(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(this.apiUrl);
  }

  crearContacto(contacto: Omit<Contacto, 'id'>): Observable<Contacto> {
    return this.http.post<Contacto>(this.apiUrl, contacto);
  }

  actualizarContacto(id: number, contacto: Omit<Contacto, 'id'>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, contacto);
  }

  eliminarContacto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
