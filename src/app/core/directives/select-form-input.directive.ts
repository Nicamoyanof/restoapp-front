import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  type OnInit,
} from '@angular/core';
import Choices, { Options as ChoiceOption } from 'choices.js';

export type SelectOptions = Partial<ChoiceOption>;

@Directive({
  selector: '[selectFormInput]',
  standalone: true,
})
export class SelectFormInputDirective implements AfterViewInit, OnChanges {
  @Input() className?: string;
  @Input() onChange?: (text: string) => void;
  @Input() options?: SelectOptions;

  constructor(private eleRef: ElementRef) {}

  ngAfterViewInit(): void {
    const choices = new Choices(this.eleRef.nativeElement, {
      ...this.options,
      placeholder: true,
      placeholderValue: 'Buscar',
      allowHTML: true,
      shouldSort: false,
    });

    choices.passedElement.element.addEventListener('change', (e: Event) => {
      console.log(e);
      if (!(e.target instanceof HTMLSelectElement)) return;
      if (this.onChange) {
        this.onChange(e.target.value);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
