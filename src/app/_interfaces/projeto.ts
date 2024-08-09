import { Category } from './category';


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
  tipoServico?: Servicos[];
  status?: string;
  Category?: Category[];
}

interface Servicos{
  name: string;
  responsavel: string;
}
