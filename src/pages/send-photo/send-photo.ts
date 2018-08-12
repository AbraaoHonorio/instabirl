import { Component, ViewChild } from '@angular/core';
import { Slides, NavParams, ViewController, LoadingController, NavController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';

/**
 * Generated class for the SendPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-send-photo',
  templateUrl: 'send-photo.html',
})
export class SendPhotoPage {
  @ViewChild(Slides) slides: Slides;

  public user: string = '';
  public photos: FirebaseListObservable<any>;
  public form: FormGroup;
  public photo: string = '';
  public location: string = '';
  public filter: string = 'original';
  public filters: string[] = [
    "original",
    "_1977",
    "aden",
    "brannan",
    "brooklyn",
    "clarendon",
    "earlybird",
    "gingham",
    "hudson",
    "inkwell",
    "kelvin",
    "lark",
    "lofi",
    "maven",
    "mayfair",
    "moon",
    "nashville",
    "perpetua",
    "reyes",
    "rise",
    "slumber",
    "stinson",
    "toaster",
    "valencia",
    "walden",
    "willow",
    "willow",
  ];

  constructor(private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
      
    this.photos = db.list('/photossss');
    this.photo = this.navParams.get('photo');
    afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user.email
      }
    });

    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      message: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.required
      ])]
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        this.location = data.coords.latitude + ',' + data.coords.longitude;
      }, (err) => {
        let alert = this.alertCtrl.create({
          title: 'Ops, algo deu errado',
          subTitle: 'Não foi possível obter sua localização.',
          buttons: ['OK']
        });
        alert.present();
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  changeFilter() {
    let currentIndex = this.slides.getActiveIndex();
    this.filter = this.filters[currentIndex];
  }

  submit() {
    let loader = this.loadingCtrl.create({ content: "Enviando..." });
    loader.present();
    alert(this.user +'  '+this.photo);
    alert(this.filter +'  '+this.location);
    alert(this.form.controls['title'].value+ '  ' +this.form.controls['message'].value);
    alert(JSON.stringify(firebase.database.ServerValue.TIMESTAMP));

   
    this.photos
      .push({
        user: this.user,
        image: this.photo,
        filter: this.filter,
        location: this.location,
        title: this.form.controls['title'].value,
        message: this.form.controls['message'].value
        // date: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        loader.dismiss();
        this.navCtrl.setRoot(HomePage);
      })
      .catch(() => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Ops, algo deu errado',
          subTitle: 'Não foi possível enviar sua imagem.',
          buttons: ['OK']
        });
        alert.present();
      });
  }
}