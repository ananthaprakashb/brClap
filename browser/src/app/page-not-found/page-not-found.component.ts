import { Component } from '@angular/core';

@Component({
  selector: 'page-not-found',
  template: `
    <mat-card color='warning'>Page Not Found</mat-card>
  `,
  styles: [`
     mat-card {
         background-color: red;
         font-size: 20px;
     }
  `]
})
export class PageNotFoundComponent {}