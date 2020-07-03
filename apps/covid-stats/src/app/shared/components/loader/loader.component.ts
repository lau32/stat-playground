import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'stat-playground-loader',
  template: `
      <ng-container *ngIf="loaded; else loading">
          <ng-content></ng-content>
      </ng-container>

      <ng-template #loading>
          <div class="clr-row clr-justify-content-center">
              <span class="spinner spinner-sm">Loading...</span>
          </div>
      </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  @Input() loaded = false;
}
