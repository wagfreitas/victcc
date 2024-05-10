import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.page.html',
  styleUrls: ['./calculadora.page.scss'],
})
export class CalculadoraPage {

  material = "";
  unidade = "";
  quantidade!: 0;
  resultado = "Quantidade necessária";

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["inicial"]);
    this.material = "";
    this.unidade = "";
    this.resultado = "Quantidade necessária";
  }

  atualizarOpcoes() {
  }

  calcular() {
    console.log("Variáveis:",this.material,this.unidade,this.quantidade)
    if (this.material === 'concreto') {
      if (this.unidade === 'c1') {
        // Lógica para c1
      }
      else if (this.unidade === 'c2') {
        // Lógica para c2
      }
      else if (this.unidade === 'c3') {
        // Lógica para c3
      }
    }
    else if (this.material === 'areia') {
      if (this.unidade === 'a1') {
        // Lógica para a1
      }
      else if (this.unidade === 'a2') {
        // Lógica para a2
      }
      else if (this.unidade === 'a3') {
        // Lógica para a3
      }
    }
    else if (this.material === 'Tinta') {
      if (this.unidade === 'm² para Lata (900ml)') {
        this.resultado = String(Math.ceil((this.quantidade * 0.34)/0.9)) + " latas"
      }
      else if (this.unidade === 'm² para Lata (3.6L)') {
        this.resultado = String(Math.ceil((this.quantidade * 0.34)/3.6)) + " latas"

      }
      else if (this.unidade === 'm² para Lata (18L)') {
        this.resultado = String(Math.ceil((this.quantidade * 0.34)/18)) + " latas"

      }
    }
  }

}
