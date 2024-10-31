import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";

import { DragEvent, Stack, StackConfig, ThrowEvent } from "./swing";
import { SwingCardComponent } from "./swing-card-component";

// Add this type declaration at the top of the file

import * as Swing from "swing";

@Component({
  selector: "[swing-stack]",
  template: `<ng-content></ng-content>`,
  standalone: false,
})
export class SwingStackComponent implements AfterContentInit {
  @Input() stackConfig: StackConfig | undefined;

  @Output() throwout = new EventEmitter<ThrowEvent>();
  @Output() throwoutend = new EventEmitter<ThrowEvent>();
  @Output() throwoutleft = new EventEmitter<ThrowEvent>();
  @Output() throwoutright = new EventEmitter<ThrowEvent>();
  @Output() throwoutup = new EventEmitter<ThrowEvent>();
  @Output() throwoutdown = new EventEmitter<ThrowEvent>();
  @Output() throwin = new EventEmitter<ThrowEvent>();
  @Output() throwinend = new EventEmitter<ThrowEvent>();
  @Output() dragstart = new EventEmitter<DragEvent>();
  @Output() dragmove = new EventEmitter<DragEvent>();
  @Output() dragend = new EventEmitter<DragEvent>();

  cards: SwingCardComponent[] = [];
  stack!: Stack;

  addCard(card: SwingCardComponent, prepend = false): void {
    this.cards.push(card);
    if (this.stack) {
      this.stack.createCard(card.getNativeElement(), prepend);
    }
  }

  ngAfterContentInit(): void {
    this.stack = Swing.Stack(this.stackConfig || {});
    this.cards.forEach((c) =>
      this.stack.createCard(c.getNativeElement(), c.prepend)
    );

    // Hook various events
    this.stack.on("throwout", ($event: ThrowEvent) =>
      this.throwout.emit($event)
    );
    this.stack.on("throwoutend", ($event: ThrowEvent) =>
      this.throwoutend.emit($event)
    );
    this.stack.on("throwoutleft", ($event: ThrowEvent) =>
      this.throwoutleft.emit($event)
    );
    this.stack.on("throwoutright", ($event: ThrowEvent) =>
      this.throwoutright.emit($event)
    );
    this.stack.on("throwin", ($event: ThrowEvent) => this.throwin.emit($event));
    this.stack.on("throwinend", ($event: ThrowEvent) =>
      this.throwinend.emit($event)
    );
    this.stack.on("dragstart", ($event: DragEvent) =>
      this.dragstart.emit($event)
    );
    this.stack.on("dragmove", ($event: DragEvent) =>
      this.dragmove.emit($event)
    );
    this.stack.on("dragend", ($event: DragEvent) => this.dragend.emit($event));
    this.stack.on("throwoutup", ($event: ThrowEvent) =>
      this.throwoutup.emit($event)
    );
    this.stack.on("throwoutdown", ($event: ThrowEvent) =>
      this.throwoutdown.emit($event)
    );
  }
}
