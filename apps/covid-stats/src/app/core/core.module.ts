import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasesApi } from './providers/cases.api';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [CasesApi]
})
export class CoreModule { }
