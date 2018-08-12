import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakePicturePage } from './take-picture';

@NgModule({
  declarations: [
    TakePicturePage,
  ],
  imports: [
    IonicPageModule.forChild(TakePicturePage),
  ],
})
export class TakePicturePageModule {}
