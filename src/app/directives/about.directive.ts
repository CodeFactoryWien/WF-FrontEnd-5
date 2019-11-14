import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[about]'
})

export class AboutDirective {
 
  constructor(public el: ElementRef) { }
 
  @Input() defaultColor: string;
 
  @Input('about') about: string;
 
  @HostListener('mouseenter') onMouseEnter() {
    this.setHoverEffect();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeHoverEffect();
  }
 
  public setHoverEffect() {
    this.el.nativeElement.classList.add('about-hover-effect');
  }

  public removeHoverEffect() {
    this.el.nativeElement.classList.remove('about-hover-effect');
  }

}