import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterLink,
    MatToolbarModule,
    RouterOutlet,
    FormsModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    // NgxUiLoaderModule,
    // NgxUiLoaderHttpModule
  ],
  exports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterLink,
    MatToolbarModule,
    RouterOutlet,
    FormsModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    // NgxUiLoaderModule,
    // NgxUiLoaderHttpModule
  ]
})
export class SharedMaterialModule { }
