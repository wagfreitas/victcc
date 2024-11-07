import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CategoriesService } from '../_services/categories.service';
import { Estrutura, Sistema } from '../_interfaces/estrutura';


@Component({
  selector: 'app-cadastra-categoria',
  templateUrl: './cadastra-categoria.page.html',
  styleUrls: ['./cadastra-categoria.page.scss'],
})
export class CadastraCategoriaPage implements OnInit {
  sistemaForm!: FormGroup;
  sistMostra: boolean = true;
  categorias: Estrutura[] = [];
  selectCategoria: { idSistema: string, descricaoSistema: string }[] = [];
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
      this.categorias = data
      this.selectCategoria = this.categorias.map((cat) => {
        console.log(cat.sistemas)
        return { idSistema: cat.idSistema, descricaoSistema: cat.sistemas[0].descricaoSistema }
      }
      )
    })
  }

  onCategorySelected(event: any) {
    const categoria = event.detail.value;
    this.idSelected = categoria.id;

    if (categoria) {
      this.isEdit = true;
      this.sistemaForm.reset();
      const categoriaData = this.categorias.find((cat) => cat.idSistema === categoria.id);
      this.loadCategoriaData(categoria);
    }
  }

  loadCategoriaData(categoria: any) {
    const sistemasArray = this.sistemaForm.get('sistemas') as FormArray;
    sistemasArray.clear();

    categoria.sistemas.forEach((sistema: any) => {
      const sistemaForm = this.fb.group({
        descricaoSistema: [sistema.descricaoSistema],
        percentualSistema: [sistema.percentualSistema],
        ordemSistema: [sistema.ordemSistema],
        etapas: this.fb.array([])
      });

      sistema.etapas.forEach((etapa: any) => {
        const etapaForm = this.fb.group({
          descricaoEtapa: [etapa.descricaoEtapa],
          ordemEtapa: [etapa.ordemEtapa],
          coeficiente: [etapa.coeficiente],
          coeficienteInput: [etapa.coeficienteInput],
          duracaoInput: [etapa.duracaoInput],
          percentualEtapa: [etapa.percentualEtapa],
          medidas: this.fb.array([]),
          materiais: this.fb.array([]),
          passos: this.fb.array([])
        });

        // Preenchendo medidas, materiais e passos
        etapa.medidas.forEach((medida: any) => {
          (etapaForm.get('medidas') as FormArray).push(this.fb.group({
            descricaoMedida: [medida.descricaoMedida],
            valor: [medida.valor]
          }));
        });

        etapa.materiais.forEach((material: any) => {
          (etapaForm.get('materiais') as FormArray).push(this.fb.group({
            descricaoMaterial: [material.descricaoMaterial],
            grau: [material.grau]
          }));
        });

        etapa.passos.forEach((passo: any) => {
          (etapaForm.get('passos') as FormArray).push(this.fb.group({
            descricaoPasso: [passo.descricaoPasso],
            ordemPasso: [passo.ordemPasso],
            percentualPasso: [passo.percentualPasso]
          }));
        });

        (sistemaForm.get('etapas') as FormArray).push(etapaForm);
      });

      sistemasArray.push(sistemaForm);
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

    if (this.isEdit) {
      console.log("Atualizando projeto")
      this.categoriesService.updateCategory(this.idSelected, data).then((docRef) => {
        this.sistemaForm.reset();
        this.sistMostra = true;
        this.hideAllFormArrays();
      }).catch((error) => {
        console.error("Erro ao atualizar projeto: ", error);
      })
    } else {
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
