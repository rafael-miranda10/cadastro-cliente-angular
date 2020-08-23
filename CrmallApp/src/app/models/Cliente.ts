import { Endereco } from "./Endereco";


export class Cliente {

  constructor(){
    this.endereco = new Endereco();
  }
  id: number;
  nome: string;
  sexo: number;
  dataDeNascimento: Date;
  endereco: Endereco;
}
