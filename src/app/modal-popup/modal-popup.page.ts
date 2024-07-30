import { Component, OnInit, Input, ɵɵclassMapInterpolate3} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.page.html',
  styleUrls: ['./modal-popup.page.scss'],
})
export class ModalPopupPage implements OnInit {
  @Input() model_title?: string;
  @Input() item?: string;

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    console.log("Model Title: ", this.model_title);
    console.log("Item: ", this.item);
  }

  async closeModel() {
   const dados =  {
      'quantidade': 2,
      'volume': '3m',
      'area': '4m',
    }
    const close: any = this.item;
    await this.modalController.dismiss(dados);
  }

}
