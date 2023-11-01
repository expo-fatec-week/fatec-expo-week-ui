import { Injectable } from '@angular/core';
import { Confirmation, PrimeIcons } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AlertComponent } from '../resources/components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialogService: DialogService) { }

  private show(message: string, icon?: string, title?: string, confirmation?: Confirmation) {
    this.dialogService.open(AlertComponent, {
      data: { title, message, icon, confirmation },
      styleClass: 'custom-dialog-for-alert',
      modal: true,
      showHeader: false,
      closable: false
    });
  }

  /**
   * Para cada tipo de alerta:
   * @param message Mensagem para a caixa de alerta
   * @param title (Opcional) titulo para caixa de alerta
   */

  public success(message: string, title?: string): void {
    this.show(message, PrimeIcons.CHECK_CIRCLE, title);
  }

  public error(message: string, title?: string): void {
    this.show(message, PrimeIcons.TIMES_CIRCLE, title);
  }

  public info(message: string, title?: string): void {
    this.show(message, PrimeIcons.INFO_CIRCLE, title);
  }

  public warning(message: string, title?: string): void {
    this.show(message, PrimeIcons.EXCLAMATION_CIRCLE, title);
  }

  /**
   * Caixa de alerta com confirmação
   * @param message mensagem de confirmação
   * @param title (Opcional)titulo da caixa de diálogo
   * @param acceptFunction (Opcional)função que deve ser executada no caso de confirmação
   * @param rejectFunction (Opcional)função que deve ser executada no caso de rejeição
   *
   */

  // eslint-disable-next-line @typescript-eslint/ban-types
  public confirm(message: string, title?: string, acceptFunction?: Function,
    // eslint-disable-next-line @typescript-eslint/ban-types
    rejectFunction?: Function) {
    this.show(message, PrimeIcons.QUESTION_CIRCLE, title, {
      accept: () => {
        if (acceptFunction) acceptFunction();
      },
      reject: () => {
        if (rejectFunction) rejectFunction();
      }
    });
  }

  public notification(message: string, title?: string): void {
    this.show(message, undefined, title);
  }
}
