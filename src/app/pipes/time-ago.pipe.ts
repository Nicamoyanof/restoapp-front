import {
  Pipe,
  PipeTransform,
  ChangeDetectorRef,
  NgZone,
  OnDestroy,
} from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
  pure: false,
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private timer: any;
  private lastValue?: number;

  constructor(private cdr: ChangeDetectorRef, private zone: NgZone) {}

  transform(value: number): string {
    if (value == null) return '';
    const now = Date.now();
    const diffSec = Math.floor((now - value) / 1000);

    if (this.lastValue !== value) {
      this.lastValue = value;
      this.clearTimer();
    }

    const nextInMs = this.nextUpdateInMs(diffSec);
    this.setupTimer(nextInMs);

    return this.format(diffSec);
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private setupTimer(ms: number) {
    if (this.timer || ms === Infinity) return;
    this.zone.runOutsideAngular(() => {
      this.timer = setTimeout(() => {
        this.zone.run(() => this.cdr.markForCheck());
        this.timer = null;
      }, ms);
    });
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  // ⬇️ Ahora, si pasó 1 min, refresca en el próximo inicio de MINUTO (no de hora)
  private nextUpdateInMs(diffSec: number): number {
    if (diffSec < 60) {
      // cada segundo
      return 1000 - (Date.now() % 1000);
    }
    // cada minuto (sin importar si ya pasó 1h, 3h, etc.)
    return (60 - (diffSec % 60)) * 1000;
  }

  // ⬇️ Muestra "X h YY min" cuando es >= 1 hora y < 1 día
  private format(diffSec: number): string {
    const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
    const future = diffSec < 0;
    const abs = Math.abs(diffSec);

    if (abs < 5) return 'justo ahora';
    if (abs < 60)
      return rtf.format(future ? Math.ceil(abs) : -Math.floor(abs), 'second');

    const min = Math.floor(abs / 60);
    if (abs < 3600) {
      return rtf.format(future ? Math.ceil(min) : -min, 'minute');
    }

    if (abs < 86400) {
      const hours = Math.floor(abs / 3600);
      const minutes = Math.floor((abs % 3600) / 60);
      const prefix = future ? 'en' : 'hace';
      // 1 h 03 min (con cero a la izquierda en minutos)
      return `${prefix} ${hours} h y ${minutes
        .toString()
        .padStart(2, '0')} min`;
    }

    // Para >= 1 día mantenemos el comportamiento original (día/mes/año)
    const days = Math.floor(abs / 86400);
    if (days < 30) return rtf.format(future ? Math.ceil(days) : -days, 'day');
    const months = Math.floor(days / 30);
    if (months < 12)
      return rtf.format(future ? Math.ceil(months) : -months, 'month');
    const years = Math.floor(months / 12);
    return rtf.format(future ? Math.ceil(years) : -years, 'year');
  }
}
