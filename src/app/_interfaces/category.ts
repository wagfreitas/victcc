import { Sistema } from './estrutura';
export interface Categoria {
  idCategoria: string;
  sistemas: Sistema[];
}

export interface Category {
  name: string;
  items: Item[];
}

export interface Item {
  name: string;
  values: Medidas[];
  selected: false;
  [key: string]: any;
}

interface Medidas {
  Quantidade?: number;
  Volume?: number;
  Área?: number;
  dimensaoA?: number;
  dimensaoB?: number;
  Altura?: number;
  [key: string]: any;
}


