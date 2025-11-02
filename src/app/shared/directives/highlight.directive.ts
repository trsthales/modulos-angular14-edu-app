/**
 * HIGHLIGHT.DIRECTIVE.TS
 * Diretiva customizada para destacar elementos
 * 
 * DIRETIVAS EM SHARED MODULE:
 * ---------------------------
 * Diretivas que são usadas em vários módulos devem estar no SharedModule
 * e serem exportadas para uso externo.
 * 
 * USO:
 * <div appHighlight>Este texto será destacado ao passar o mouse</div>
 */

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() highlightColor: string = 'yellow';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
