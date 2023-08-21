import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent implements OnInit {
  @Input() blogList: any;
  @Output() idEmitter: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {}

  sendIdToParent(id: string) {
    this.idEmitter.emit(id);
  }
}
