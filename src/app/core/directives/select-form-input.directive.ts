import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import Choices from 'choices.js';

type ChoiceItem = {
  value: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
};

@Directive({
  selector: '[selectFormInput]',
  standalone: true,
  exportAs: 'selectFormInput',
})
export class SelectFormInputDirective
  implements AfterViewInit, OnChanges, OnDestroy
{
  @Input() options?: any;
  @Input() tigerValue? = new EventEmitter<string>(); // reset externo
  @Input() reloadChoices? = new EventEmitter<void | ChoiceItem[]>(); // 🔁 payload o void
  @Input() defaultValue?: string | number; // value/id a seleccionar

  private choices?: Choices;

  constructor(private eleRef: ElementRef<HTMLSelectElement>) {}

  ngAfterViewInit(): void {
    this.choices = new Choices(this.eleRef.nativeElement, {
      placeholder: true,
      placeholderValue: 'Buscar',
      allowHTML: true,
      shouldSort: false,
      ...this.options,
    });

    // Carga inicial (DOM) + default
    this.refreshFromDOM();
    this.applyDefault();

    // Reset externo
    this.tigerValue?.subscribe(() => {
      if (!this.choices) return;
      this.choices.removeActiveItems();
      if (!this.eleRef.nativeElement.multiple)
        this.choices.setChoiceByValue('');
    });

    // Recarga (data-driven o fallback DOM)
    this.reloadChoices?.subscribe((payload) => {
      if (!this.choices) return;
      this.choices.removeActiveItems();

      if (Array.isArray(payload)) {
        this.updateChoices(payload); // ✅ setChoices con el payload
      } else {
        this.refreshFromDOM(); // fallback: leer <option> del DOM
      }

      this.applyDefault(); // opcional
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultValue'] && this.choices) {
      queueMicrotask(() => this.applyDefault());
    }
  }

  ngOnDestroy(): void {
    this.choices?.destroy();
  }

  // --- helpers ---
  private refreshFromDOM() {
    if (!this.choices) return;
    const select = this.eleRef.nativeElement;
    const opts: ChoiceItem[] = Array.from(select.options).map((o) => ({
      value: o.value,
      label: o.textContent ?? '',
      selected: o.selected,
      disabled: o.disabled,
    }));
    this.choices.clearChoices();
    if (opts.length) this.choices.setChoices(opts, 'value', 'label', true);
  }

  private updateChoices(items: ChoiceItem[]) {
    this.choices!.clearChoices();
    this.choices!.setChoices(items, 'value', 'label', true);
  }

  private applyDefault() {
    if (!this.choices || this.defaultValue == null) return;
    const v = String(this.defaultValue);
    this.choices.removeActiveItems();
    (this.choices as any).setChoiceByValue?.(v) ??
      (this.choices as any).setValueByChoice?.(v);
  }

  /** Público por si querés llamar con #dir.reload() */
  reload(): void {
    this.refreshFromDOM();
    this.applyDefault();
  }
}
