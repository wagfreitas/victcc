import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  form!: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {

    const email = this.form.get('email');
    const password = this.form.get('senha');
    const n1 = this.form.get('nome');
    const n2 = this.form.get('sobrenome');
    const nomedoUsuario = n1?.value + " " + n2?.value;

    this.authService
      .RegisterUser(email?.value, password?.value, nomedoUsuario)
      .then((res) => {
        window.alert("Cadastro efetuado com sucesso");
        this.router.navigate(["entrar"])

      })
      .catch((error) => {

        if (error.code === "auth/email-already-in-use") {
          window.alert("Email já cadastrado");
          this.form.reset();
        }

      });
  }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["home"]);
  }
}
