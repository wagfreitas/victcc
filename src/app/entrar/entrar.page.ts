import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.page.html',
  styleUrls: ['./entrar.page.scss'],
})
export class EntrarPage implements OnInit {
  form!: FormGroup

  constructor(
    private router: Router, private formBuilder: FormBuilder,
    public authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log('Formulário: ', this.form.value);
  }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["home"]);
  }

  entrar() {
    const email = this.form.value.email;
    const senha = this.form.value.senha;
    this.authService
    .SignIn(email, senha)
    .then((retorno) => {
      console.log(retorno.user?.email);
      this.router.navigate(["inicial"]);
    })
    .catch((error) => {
      window.alert(error.message);
    });

  }
}
