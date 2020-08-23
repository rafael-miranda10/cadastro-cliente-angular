import { Component, OnInit } from '@angular/core';
import { ClienteService } from './../../services/cliente.service';
import { Cliente } from './../../models/Cliente';
import { ViaCep } from './../../models/viaCep';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
})
export class ClienteComponent implements OnInit {

  public formLabel: string;
  public clientes: Cliente[];
  public formCliente: FormGroup
  public cliente: Cliente;
  public msgsErro: string[];
  public isEditMode = false;
  public submitted = false;
  public operationSuccess = false;
  public sexo: any[];
  public viaCep: ViaCep;

  constructor(private clienteService: ClienteService) {

    this.formCliente = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      sexo: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      endereco: new FormGroup({
        cep: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
        logradouro: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        numero: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*[1-9][0-9]*$")]),
        complemento: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        bairro: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        estado: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
        cidade: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      })
    });

    this.formLabel = "Cadastro de Clientes";
    this.cliente = new Cliente();
    this.msgsErro = [];
    this.sexo = [];
  }

  ngOnInit() {
    this.obterTodosClientes();
  }

  inicializarSexo() {
    this.sexo = [
      { "id": 0, "nome": "Masculino" },
      { "id": 1, "nome": "Feminino" },
    ];
  }

  obterTodosClientes() {
    this.clienteService
      .obterTodosClientes()
      .subscribe(
        _clientes => {
          this.clientes = _clientes;
        },
        _error => {
          this.msgsErro = _error.error.errors.mensagens;
          this.getTopPage();
        }
      );
  }

  obterCep() {
    const cep = this.formCliente.get("endereco").get("cep").value;
    this.clienteService
      .obterCep(cep)
      .subscribe(
        _cep => {
          this.viaCep = _cep;
          this.preencherEndereco();
        },
        _error => {
          this.msgsErro = _error.error.errors.mensagens;
          this.getTopPage();
        }
      );
  }

  preencherEndereco() {
    this.formCliente.get("endereco").get("cep").setValue(this.viaCep.cep);
    this.formCliente.get("endereco").get("logradouro").setValue(this.viaCep.logradouro);
    this.formCliente.get("endereco").get("numero").setValue(this.viaCep.numero);
    this.formCliente.get("endereco").get("complemento").setValue(this.viaCep.complemento);
    this.formCliente.get("endereco").get("bairro").setValue(this.viaCep.bairro);
    this.formCliente.get("endereco").get("estado").setValue(this.viaCep.uf);
    this.formCliente.get("endereco").get("cidade").setValue(this.viaCep.localidade);
  }

  deletar(clienteId: number, index: number) {
    this.operationSuccess = false;
    if (confirm("Deseja realmente excluir este cliente?")) {
      this.clienteService
        .deletarCliente(clienteId)
        .subscribe(
          _cliente => {
            this.cliente = _cliente;
            this.clientes.splice(index, 1);
          },
          _error => {
            this.msgsErro = _error.error.errors.mensagens;
            this.getTopPage();
          }
        );
    }
  }

  editar(_cliente: Cliente) {
    this.formLabel = "Edição de Cliente";
    this.operationSuccess = false;
    this.isEditMode = true;
    this.cliente = _cliente;
    this.setForm(this.cliente);
    this.getTopPage();
  }

  setForm(cliente: Cliente) {
    this.formCliente.get("nome").setValue(cliente.nome);
    this.formCliente.get("sexo").setValue(cliente.sexo);
    this.formCliente.get("dataNascimento").setValue(cliente.dataDeNascimento);

    this.formCliente.get("endereco").get("cep").setValue(cliente.endereco.cep);
    this.formCliente.get("endereco").get("logradouro").setValue(cliente.endereco.logradouro);
    this.formCliente.get("endereco").get("numero").setValue(cliente.endereco.numero);
    this.formCliente.get("endereco").get("complemento").setValue(cliente.endereco.complemento);
    this.formCliente.get("endereco").get("bairro").setValue(cliente.endereco.bairro);
    this.formCliente.get("endereco").get("estado").setValue(cliente.endereco.estado);
    this.formCliente.get("endereco").get("cidade").setValue(cliente.endereco.cidade);
  }

  Salvar() {
    if (this.isEditMode) {
      this.clienteService
        .atualizarCliente(this.cliente)
        .subscribe(_cliente => {
          this.cliente = _cliente;
          this.clientes = this.clientes.filter(x => x.id !== this.cliente.id);
          this.clientes.push(this.cliente);
        },
          _error => {
            this.msgsErro = _error.error.errors.mensagens;
            this.getTopPage();
          }
        );
    }
    else {
      this.clienteService
        .adicionarCliente(this.cliente)
        .subscribe(_cliente => {
          this.cliente = _cliente;
          this.clientes.push(this.cliente);
        },
          _error => {
            this.msgsErro = _error.error.errors.mensagens;
            this.getTopPage();
          }
        );
    }
  }


  getTopPage() {
    window.scroll(0, 0);
  }

}
