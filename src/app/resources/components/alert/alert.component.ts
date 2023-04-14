import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng-lts/dynamicdialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  constructor(
    private dialogService: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  public close(): void {
    this.dialogService.close();
    this.dialogService.destroy();
  }

}
