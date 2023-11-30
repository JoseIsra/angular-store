import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  // DETECTOR Y CONFIGURACIÓN DE EVENTOS PARA EL
  // ELEMENTO QUE USE LA DIRECTIVA
  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.color = 'black';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.color = '';
  }

  constructor(private element: ElementRef) {}
}
