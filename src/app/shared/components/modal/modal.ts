import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Button } from "../button/button";

@Component({
  selector: 'app-modal',
  imports: [FormsModule, Button],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  
  isModalOpen = false;

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  @Input() title: string = '';
}
