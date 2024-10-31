import { Component, ElementRef, OnInit, Input } from "@angular/core";
import { SwingStackComponent } from "./swing-stack-component";
import { Card } from "./swing";

@Component({
  selector: "[swing-card]",
  template: `<ng-content></ng-content>`,
  standalone: false,
})
export class SwingCardComponent implements OnInit {
  @Input() prepend = false;

  card!: Card;

  constructor(
    private elementRef: ElementRef,
    private swingStack: SwingStackComponent
  ) {}

  ngOnInit() {
    this.swingStack.addCard(this, this.prepend);
  }

  getElementRef(): ElementRef {
    return this.elementRef;
  }

  getNativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  getCard(): Card {
    return this.swingStack.stack.getCard(this.getNativeElement());
  }

  destroyCard(): void {
    this.swingStack.cards = this.swingStack.cards.filter(
      (swingCardComponent) => swingCardComponent !== this
    );
    const card = this.swingStack.stack.getCard(this.getNativeElement());
    this.swingStack.stack.destroyCard(card);
  }
}
