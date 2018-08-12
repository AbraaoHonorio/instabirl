import { Component } from '@angular/core';
import { LoadingController, NavController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public form: FormGroup;

  constructor(private fb: FormBuilder,
              private afAuth: AngularFireAuth,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private alertCtrl: AlertController) {

              this.form = this.fb.group({
                email: ['', Validators.compose([
                  Validators.minLength(5),
                  Validators.maxLength(160),
                  Validators.required
                ])],
                password: ['', Validators.compose([
                  Validators.minLength(5),
                  Validators.maxLength(20),
                  Validators.required
                ])]
              });
  }

  submit() {
    const loader  = this.loadingCtrl.create({content: 'Cadastrando...'});
    loader.present();

    this.afAuth.auth
        .createUserWithEmailAndPassword(
          this.form.controls['email'].value,
          this.form.controls['password'].value)
        .then( ()=> {
          loader.dismiss();
          const alert = this.alertCtrl.create({
            title: "Bem vindo!",
            subTitle: 'Seu cadastro foi criado com sucesso',
            buttons: ['OK']
          });
          alert.present();
          this.goToLogin();
        })
        .catch(() => {
          loader.dismiss();
          const alert = this.alertCtrl.create({
            title: "Ops, algo deu errado",
            subTitle: 'Não foi possível realizar seu cadastro.',
            buttons: ['OK']
          });
          alert.present();
        });
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

 

}
