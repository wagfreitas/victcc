import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projetos-1',
  templateUrl: './projetos-1.page.html',
  styleUrls: ['./projetos-1.page.scss'],
})
export class Projetos1Page implements OnInit {

  abaselecionada = 'checklist';

  options = ['Bloco de Concreto', 'Radier', 'Sapata'];
  selectedOptions: boolean[] = [];
  progress: number = 0;

  constructor(private router: Router) {
    this.selectedOptions = new Array(this.options.length).fill(false);
  }

  ngOnInit() { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["projetos"]);
  }

  menu(event: any) {
    this.abaselecionada = event.detail.value
  }

  isButtonActive(buttonValue: string): boolean {
    return this.abaselecionada === buttonValue;
  }

  updateProgress() {
    const checkedOptions = this.selectedOptions.filter(option => option).length;
    this.progress = (checkedOptions / this.options.length) * 100;
  }
}
