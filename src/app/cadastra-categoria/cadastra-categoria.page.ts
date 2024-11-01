import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CategoriesService } from '../_services/categories.service';


@Component({
  selector: 'app-cadastra-categoria',
  templateUrl: './cadastra-categoria.page.html',
  styleUrls: ['./cadastra-categoria.page.scss'],
})
export class CadastraCategoriaPage implements OnInit {
  sistemaForm!: FormGroup;
  sistMostra: boolean = true;
  showFormArrays: boolean = true;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.sistemaForm = this.fb.group({
      sistemas: this.fb.array([])  // FormArray para sistemas
    });
  }

  // Função para adicionar um novo FormGroup para cada sistema
  sistemas(): FormArray {
    return this.sistemaForm.get('sistemas') as FormArray;
  }

  // Adiciona um novo grupo de etapa ao array
  newSistema(): FormGroup {
    return this.fb.group({
      descricaoSistema: ['', Validators.required],
      percentualSistema: [0, Validators.required],
      ordemSistema: [0, Validators.required],
      etapas: this.fb.array([])
    });
  }

  addSistema() {
    this.sistemas().push(this.newSistema());
    this.sistMostra = false
  }

  // Etapas  dentro de um Sistema
  etapas(sistemasIndex: number): FormArray {
    return this.sistemas().at(sistemasIndex).get('etapas') as FormArray;
  }

  newEtapa(): FormGroup {
    return this.fb.group({
      descricaoEtapa: ['', Validators.required],
      percentualEtapa: [0, Validators.required],
      ordemEtapa: [0, Validators.required],
      duracao: [0, Validators.required],
      duracaoInput: ['N'],
      medidas: this.fb.array([]),
      materiais: this.fb.array([]),
      passos: this.fb.array([]),
      coeficiente: [''],
      coeficienteInput: ['N']
    });
  }

  addEtapa(sistemaIndex: number) {
    this.etapas(sistemaIndex).push(this.newEtapa());
  }

  // Medidas e Material
  medidas(sistemaIndex: number, etapaIndex: number): FormArray {
    return this.etapas(sistemaIndex,).at(etapaIndex).get('medidas') as FormArray;
  }

  newMedida(): FormGroup {
    return this.fb.group({
      descricaoMedida: ['', Validators.required],
      valor: ['', Validators.required]
    });
  }

  addMedida(sistemaIndex: number, etapaIndex: number) {
    this.medidas(sistemaIndex, etapaIndex).push(this.newMedida());
  }

  materiais(sistemaIndex: number, etapaIndex: number): FormArray {
    return this.etapas(sistemaIndex).at(etapaIndex).get('materiais') as FormArray;
  }

  newMaterial(): FormGroup {
    return this.fb.group({
      descricaoMaterial: ['', Validators.required],
      grau: [0, Validators.required],
      comprado: [false, Validators.required]
    });
  }

  addMaterial(sistemaIndex: number, etapaIndex: number) {
    this.materiais(sistemaIndex, etapaIndex).push(this.newMaterial());
  }

  passos(sistemasIndex: number, etapaIndex: number) {
    return this.etapas(sistemasIndex).at(etapaIndex).get('passos') as FormArray
  }

  newPasso(): FormGroup {
    return this.fb.group({
      descricaoPasso: ['', Validators.required],
      ordemPasso: ['', Validators.required]
    })

  }

  addPasso(sistemaIndex: number, etapaIndex: number) {
    this.passos(sistemaIndex, etapaIndex).push(this.newPasso());
  }

  // Remover um sistema
  removeSistema(sistemaIndex: number) {
    this.sistemas().removeAt(sistemaIndex);
  }

  // Remover uma etapa dentro de um sistema
  removeEtapa(sistemaIndex: number, etapaIndex: number) {
    this.etapas(sistemaIndex).removeAt(etapaIndex);
  }


  // Remover uma medida dentro de uma atividade
  removeMedida(sistemaIndex: number, etapaIndex: number, medidaIndex: number) {
    this.medidas(sistemaIndex, etapaIndex).removeAt(medidaIndex);
  }

  // Remover um material dentro de uma atividade
  removeMaterial(sistemaIndex: number, etapaIndex: number, materialIndex: number) {
    this.materiais(sistemaIndex, etapaIndex).removeAt(materialIndex);
  }

  // Remover um passo dentro de uma atividade
  removePasso(sistemaIndex: number, etapaIndex: number, passoIndex: number) {
    this.passos(sistemaIndex, etapaIndex).removeAt(passoIndex);
  }

  // Submissão do formulário
  submitForm() {
    let data = this.sistemaForm.value
    console.log(data.sistemas)
    this.categoriesService.createCategory(data).then((docRef) => {
      if (docRef) {
        this.sistemaForm.reset();
        this.sistMostra = true;
        this.hideAllFormArrays();
      }
    }).catch((error) => {
      console.error("Erro ao criar projeto: ", error);
    });
  }

  hideAllFormArrays() {
    this.showFormArrays = false;
    // Iterar sobre os controles do formulário e resetar os FormArray
    Object.keys(this.sistemaForm.controls).forEach(key => {
      const control = this.sistemaForm.get(key);
      if (control instanceof FormArray) {
        control.clear();
      }
    });
  }
}
