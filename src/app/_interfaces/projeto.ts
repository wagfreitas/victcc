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
  userId?: string;
  tipoServico?: Servicos[];
  status?: string;
  Category?: Category[];
  processos?: Processo[];
}

interface Servicos {
  name: string;
  responsavel: string;
}

interface Processo {
  nome: string;
  materiais: Material[];
}

interface Material {
  descricao: string;
  comprado: boolean;
  grau: number; // Grau de compra (0 para faltante, 1 para comprado)
}
