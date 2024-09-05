import { Etapa } from "./etapa"

export interface Projeto {
  idUser: string
  nomeProjeto: string,
  nomeCliente: string,
  cep: string,
  logradouro: string,
  numero: string,
  complemento: string,
  dataInicio: string,
  dataFim: string,
  status: string,
  etapa: Etapa[]
}


