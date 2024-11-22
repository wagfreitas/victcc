import { Category } from './category';
import { Estrutura } from './estrutura';


export interface Projeto {
  nomeProjeto?: string;
  id?: string;
  nomeCliente?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  cep?: string;
  dataInicio?: string;
  dataFim?: string;
  userId?: string;
  status?: string;
  sistemas?: Estrutura;
}





