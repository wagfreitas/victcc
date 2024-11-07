import { PreloadAllModules } from '@angular/router';
export interface Estrutura {
  idSistema: string,
  sistemas: Sistema[]
}

export interface Sistema {
  descricaoSistema: string,
  percentualSistema: number,
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
  medidas: Medida[],
  materiais: Material[],
  passos: Passo[],

}

export interface Medida {
  descricaoMedida: string,
  valor: string
}

export interface Material {
  descricaoMaterial: string,
  grau: number,
  comprado: boolean
}

export interface Passo {
  descricaoPasso: string,
  ordemPasso: string,
  percentual: number
}





