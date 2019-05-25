import { Component, TemplateRef, ViewChildren  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.css']
})
export class CommentsModalComponent {

  constructor(private modalService: BsModalService) {}

  onPress() {
    this.modalService.show('');
  }


}
