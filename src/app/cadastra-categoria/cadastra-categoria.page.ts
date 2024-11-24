import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CategoriesService } from '../_services/categories.service';
import { Estrutura, Etapa, Material, Medida, Passo, Sistema } from '../_interfaces/estrutura';
import { Categoria } from '../_interfaces/category';


@Component({
  selector: 'app-cadastra-categoria',
  templateUrl: './cadastra-categoria.page.html',
  styleUrls: ['./cadastra-categoria.page.scss'],
})
export class CadastraCategoriaPage implements OnInit {
  sistemaForm!: FormGroup;
  sistMostra: boolean = true;
  categorias: Categoria[] = [];
  selectCategoria: { idCategoria: string, descricaoSistema: string }[] = [];
  showFormArrays: boolean = true;
  isEdit: boolean = false;
  idSelected: string = '';

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService) {
    this.sistemaForm = this.fb.group({
      sistemas: this.fb.array([])  // FormArray para sistemas
    });
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe((data) => {
      console.log(data)
      this.categorias = data
      this.selectCategoria = this.categorias.map((cat) => ({
        idCategoria: cat.idCategoria, // Certifique-se de que este campo existe
        descricaoSistema: cat.sistemas[0]?.descricaoSistema || "Sem descrição" // Lida com possíveis valores indefinidos
      }));
    })
  }

  onCategorySelected(event: any) {
    console.log("Evento recebido:", event);
    console.log("Valor selecionado:", event.detail.value);

    const categoriaId = event.detail.value;

    if (categoriaId) {
      this.isEdit = true;
      this.idSelected = categoriaId;

      const categoria = this.categorias.find(cat => cat.idCategoria === categoriaId);
      if (categoria) {
        console.log("Categoria encontrada:", categoria);
        this.loadCategoriaData(categoria);
      } else {
        console.error("Categoria não encontrada com ID:", categoriaId);
      }
    } else {
      console.error("Nenhuma categoria foi selecionada.");
    }
  }

  loadCategoriaData(categoria: any) {
    const sistemasArray = this.sistemaForm.get('sistemas') as FormArray;
    sistemasArray.clear();

    categoria.sistemas.forEach((sistema: Sistema) => {
      const sistemaForm = this.fb.group({
        descricaoSistema: [sistema.descricaoSistema, Validators.required],
        percentualSistema: [sistema.percentualSistema, Validators.required],
        ordemSistema: [sistema.ordemSistema, Validators.required],
        etapas: this.fb.array(sistema.etapas.map(etapa => this.createEtapaForm(etapa)))
      });
      sistemasArray.push(sistemaForm);
    });
  }

  createEtapaForm(etapa: Etapa): FormGroup {
    return this.fb.group({
      descricaoEtapa: [etapa.descricaoEtapa, Validators.required],
      ordemEtapa: [etapa.ordemEtapa, Validators.required],
      coeficiente: [etapa.coeficiente],
      coeficienteInput: [etapa.coeficienteInput],
      duracaoInput: [etapa.duracaoInput],
      percentualEtapa: [etapa.percentualEtapa, Validators.required],
      medidas: this.fb.array(etapa.medidas.map(medida => this.createMedidaForm(medida))),
      materiais: this.fb.array(etapa.materiais.map(material => this.createMaterialForm(material))),
      passos: this.fb.array(etapa.passos.map(passo => this.createPassoForm(passo)))
    });
  }

  createMedidaForm(medida: Medida): FormGroup {
    return this.fb.group({
      descricaoMedida: [medida.descricaoMedida, Validators.required],
      unidade: [medida.unidade, Validators.required],
      valor: [medida.valor, Validators.required]
    });
  }

  createMaterialForm(material: Material): FormGroup {
    return this.fb.group({
      descricaoMaterial: [material.descricaoMaterial, Validators.required],
      coeficiente: [material.coeficiente, Validators.required],
      medidas: [material.medidas, Validators.required]
    });
  }

  createPassoForm(passo: Passo): FormGroup {
    return this.fb.group({
      descricaoPasso: [passo.descricaoPasso, Validators.required],
      ordemPasso: [passo.ordemPasso, Validators.required],
      percentualPasso: [passo.percentualPasso, Validators.required]
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
      executadoEtapa: [0, Validators.required],
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
    return (this.sistemas().at(sistemaIndex).get('etapas') as FormArray).at(etapaIndex).get('medidas') as FormArray;
  }

  newMedida(): FormGroup {
    return this.fb.group({
      descricaoMedida: ['', Validators.required],
      valor: ['', Validators.required],
      unidade: ['', Validators.required]
    });
  }

  addMedida(sistemaIndex: number, etapaIndex: number) {
    this.medidas(sistemaIndex, etapaIndex).push(this.newMedida());
  }

  materiais(sistemaIndex: number, etapaIndex: number): FormArray {
    return (this.sistemas().at(sistemaIndex).get('etapas') as FormArray).at(etapaIndex).get('materiais') as FormArray;
  }

  newMaterial(): FormGroup {
    return this.fb.group({
      descricaoMaterial: ['', Validators.required],
      grau: [0, Validators.required],
      comprado: [false, Validators.required],
      medidas: [0, Validators.required]
    });
  }

  addMaterial(sistemaIndex: number, etapaIndex: number) {
    this.materiais(sistemaIndex, etapaIndex).push(this.newMaterial());
  }

  passos(sistemaIndex: number, etapaIndex: number) {
    return (this.sistemas().at(sistemaIndex).get('etapas') as FormArray).at(etapaIndex).get('passos') as FormArray;
  }

  newPasso(): FormGroup {
    return this.fb.group({
      descricaoPasso: ['', Validators.required],
      ordemPasso: ['', Validators.required],
      percentualPasso: [0, Validators.required],
      executadoPasso: [0, Validators.required],
      checked: [false]

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

    if (this.isEdit) {
      console.log("Atualizando projeto")
      this.categoriesService.updateCategory(this.idSelected, data).then((docRef) => {
        this.reloadCategories;
        this.resetForm();
        this.sistMostra = true;
        this.hideAllFormArrays();
      }).catch((error) => {
        console.error("Erro ao atualizar projeto: ", error);
      })
    } else {
      this.categoriesService.createCategory(data).then((docRef) => {
        if (docRef) {
          this.reloadCategories();
          this.resetForm();
          this.sistMostra = true;
          this.hideAllFormArrays();
        }
      }).catch((error) => {
        console.error("Erro ao criar projeto: ", error);
      });
    }
  }

  resetForm() {
    this.sistemaForm.reset();
    this.isEdit = false;
    this.idSelected = '';
    this.sistMostra = true;
  }
  reloadCategories() {
    this.categoriesService.getCategories().subscribe((data) => {
      this.categorias = data;
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
