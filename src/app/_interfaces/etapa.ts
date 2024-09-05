 export interface Etapa {
  name: string;
}

export interface Processo {
  name: string;
  values: Medidas[];
  selected: false;
  [key: string]: any;
}

interface Medidas{
  Quantidade?: number;
  Volume?: number;
  Área?: number;
  dimensaoA?: number;
  dimensaoB?: number;
  Altura?: number;
  [key: string]: any;
}


export interface Etapa {
  descricao: string,
  processo: Processo[],
  [key: string]: any;
 }

export interface Processo {
  descricao: string,
  atividade: Atividade[]
}

export interface Atividade  {
  descricao: string,
  ordem: number,
  duracao: number,
  regraCalculo: string,
  [key: string]: any;
}
