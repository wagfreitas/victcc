export interface Estrutura {
  idSistema: string,
  sistemas: Sistema[]
}

export interface Sistema {
  descricaoSistema: string,
  percentualSistema: number,
  percentualExecutado: number,
  ordemSistema: number,
  etapas: Etapa[]
}

export interface Etapa {
  descricaoEtapa: string,
  ordemEtapa: number,
  duracao: number,
  duracaoInput: string,
  coeficiente: string
  coeficienteInput: string,
  expanded: boolean,
  percentualEtapa: number,
  executadoEtapa: number,
  medidas: Medida[],
  materiais: Material[],
  passos: Passo[],

}

export interface Medida {
  descricaoMedida: string,
  valor: number,
  unidade: string
}

export interface Material {
  descricaoMaterial: string,
  coeficiente: number,
  comprado: boolean,
  medidas: number
}

export interface Passo {
  descricaoPasso: string,
  ordemPasso: string,
  percentualPasso: number,
  executadoPasso: number,
  checked: boolean
}





