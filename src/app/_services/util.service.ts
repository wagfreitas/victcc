import { Injectable } from '@angular/core';
import {
  LoadingController,
  AlertController,
  ToastController,
  NavController,
  MenuController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  loader: any;
  isLoading = false;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public router: Router,
    private navCtrl: NavController,
    private menuController: MenuController
  ) {}

  openMenu() {
    this.menuController.open();
  }

  async show() {
    this.isLoading = true;
    return await this.loadingCtrl
      .create({
        // duration: 5000,
        spinner: 'dots',
      })
      .then((a) => {
        a.present().then(() => {
          console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
  }

  success_msg(title: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500,
      heightAuto: false,
    });
  }

  async hide() {
    this.isLoading = false;
    return await this.loadingCtrl
      .dismiss()
      .then(() => console.log('dismissed'));
  }

  async showWarningAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      message: msg,
      buttons: ['ok'],
    });
    await alert.present();
  }

  async showSimpleAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'warning',
      message: msg,
      buttons: ['ok'],
    });
    await alert.present();
  }

  async showErrorAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: msg,
      buttons: ['ok'],
    });
    await alert.present();
  }

  async getEmailFilter(email: string) {
    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailfilter.test(email)) {
      const alert = await this.alertCtrl.create({
        header: 'warning',
        message: 'Please enter valid email',
        buttons: ['ok'],
      });
      await alert.present();
      return false;
    } else {
      return true;
    }
  }

  async showToast(msg: string, color: string, positon: any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color,
      position: positon,
    });
    toast.present();
  }
  async errorToast(msg: string, color?: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color ? 'dark' : 'light',
    });
    toast.present();
  }
  apiErrorHandler(err: any) {
    console.log('error', err);
  }

  convertData(data: string): string {
    var dataArray = data.split('-');
    const ano = dataArray[0];
    const mes = dataArray[1];
    const dia = dataArray[2];
    const dataFinal = mes + '/' + dia + '/' + ano;
    return dataFinal;
  }


}
