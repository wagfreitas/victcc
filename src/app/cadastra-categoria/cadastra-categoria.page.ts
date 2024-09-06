import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastra-categoria',
  templateUrl: './cadastra-categoria.page.html',
  styleUrls: ['./cadastra-categoria.page.scss'],
})
export class CadastraCategoriaPage {
  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.projectForm = this.fb.group({
      categories: this.fb.array([])
    });
  }

  get categorias(): FormArray {
    return this.projectForm.get('categories') as FormArray;
  }

  addCategoria() {
    const categoriaGroup = this.fb.group({
      nomeCategoria: ['', Validators.required],
      itens: this.fb.array([]),
    });

    this.categorias.push(categoriaGroup);
  }

  getItens(categoriaIndex: number): FormArray {
    return this.categorias.at(categoriaIndex).get('itens') as FormArray;
  }

  addItem(categoriaIndex: number) {
    const itensArray = this.categorias.at(categoriaIndex).get('items') as FormArray;
    const itemGroup = this.fb.group({
      nomeItem: ['', Validators.required],
      descricao: [''],
      quantidade: [0, Validators.required],
      unidade: [''],
      custoUnitario: [0, Validators.required],
      custoTotal: [{ value: 0, disabled: true }]
    });
    itensArray.push(itemGroup);
  }

  calcularCustoTotal(itemGroup: FormGroup) {
    const quantidade = itemGroup.get('quantidade')?.value;
    const custoUnitario = itemGroup.get('custoUnitario')?.value;
    const custoTotal = quantidade * (custoUnitario ?? 0);
    itemGroup.get('custoTotal')?.setValue(custoTotal);

  }

  onSubmit() {
    console.log(this.projectForm.value);
  }




}
