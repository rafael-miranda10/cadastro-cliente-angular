import {Cliente} from './Cliente';

export class Endereco {

  constructor(){
  }

  id: number;
  cep: string;
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  estado: string;
  cidade: string;
  clienteId: number;
}
