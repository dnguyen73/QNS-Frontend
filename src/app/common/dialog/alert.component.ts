import { Component, ViewEncapsulation } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface AlertModel {
  title: string;
  message: string;
}

@Component({
  selector: 'alert',
  template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">{{title || 'Shopquynhnhu.com!'}}</h4>
                   </div>
                   <div class="modal-body">
                    <div [innerHTML]="message"></div>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="close()">OK</button>
                   </div>
                </div>
             </div>`,
  styleUrls: ['./alert.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AlertComponent extends DialogComponent<AlertModel, null> implements AlertModel {
  title: string;
  message: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    document.getElementsByTagName('body')[0].classList.add('modal-open');
  }
  ngOnDestroy() {
    document.getElementsByTagName('body')[0].classList.remove('modal-open');
  }
}