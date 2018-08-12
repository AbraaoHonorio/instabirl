import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendPhotoPage } from './send-photo';

@NgModule({
  declarations: [
    SendPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(SendPhotoPage),
  ],
})
export class SendPhotoPageModule {}
