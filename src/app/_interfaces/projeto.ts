import { Sistema } from './estrutura';


export interface Projeto {
  nomeProjeto?: string;
  id?: string;
  nomeCliente?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  cep?: string;
  dataInicio?: string;
  userId?: string;
  status?: number;
  sistemas?: Sistema[];
}





