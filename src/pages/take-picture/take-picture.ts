import { Component } from '@angular/core';
import { ViewController, ModalController } from 'ionic-angular';
import { SendPhotoPage } from './../send-photo/send-photo';
/**
 * Generated class for the TakePicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-take-picture',
  templateUrl: 'take-picture.html',
})
export class TakePicturePage {

  constructor(private viewCtrl :ViewController,
              private modalCtrl: ModalController) {
  }

  takePicture() {
    const video = <any> document.getElementById('video');
    const canvas = <any> document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, 320, 240)

    video.classList.add('animated');
    video.classList.add('flash');
    setTimeout(() => {
      this.viewCtrl.dismiss();
      const modal = this.modalCtrl.create(
        SendPhotoPage,{
          photo: canvas.toDataURL()
        });
      modal.present();
  }, 800);

    /* const modal = this.modalCtrl.create(SendPhotoPage);
    modal.present();*/
  }

  ionViewDidLoad(){
   const video = <any> document.getElementById('video');
   if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
      .getUserMedia({ video: true})
      .then((stream) => {
        video.src = window.URL.createObjectURL(stream);
        video.play();
      });
   }
  }

  

  dimiss() {
    this.viewCtrl.dismiss();
  }

}
