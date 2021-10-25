import { Component, Input, OnInit } from '@angular/core';
import { Toast, ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-toaster-container',
  templateUrl: './toaster.container.component.html',
  styleUrls: ['./toaster.container.component.css'],
})
export class ToasterContainerComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toaster: ToasterService) {}

  ngOnInit() {
    this.toaster.toast$.subscribe((toast: any) => {
      this.toasts = [toast, ...this.toasts];
      setTimeout(() => this.toasts.pop(), toast.delay || 6000);
    });
  }

  remove(index: number) {
    this.toasts = this.toasts.filter((v, i) => i !== index);
    //this.toasts.splice(index, 1);
  }
}
