import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from './../../environments/environment';
import { Cliente } from '../models/Cliente';
import {ViaCep} from '../models/viaCep';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private api: string = environment.api;

  constructor(private http: HttpClient) { }

  obterTodosClientes(): Observable<Cliente[]>{
    const url = `${this.api}Cliente/ObterTodos`
    return this.http.get<Cliente[]>(url);
  }

  obterClientePorId(clienteId): Observable<Cliente>{
    const url = `${this.api}Cliente/ObterPorId/${clienteId}`
    return this.http.get<Cliente>(url);
  }

  obterCep(cep:string): Observable<ViaCep>{
    const url = `${this.api}ConsultaCep/ConsultarCep/${cep}`
    return this.http.get<ViaCep>(url);
  }

  deletarCliente(clienteId: number): Observable<any>{
    const url = `${this.api}Cliente/Remover/${clienteId}`
    return this.http.delete<Cliente>(url);
  }

  adicionarCliente(cliente: Cliente):Observable<Cliente>{
    const url = `${this.api}Cliente/Adicionar`
    return this.http.post<Cliente>(url,cliente);
  }

  atualizarCliente(cliente: Cliente):Observable<Cliente>{
    const url = `${this.api}Cliente/Atualizar`
    return this.http.post<Cliente>(url,cliente);
  }

}
