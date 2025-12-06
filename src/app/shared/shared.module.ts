import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    // Shared components, directives, and pipes will be declared here
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
    // Export shared components, directives, and pipes
  ]
})
export class SharedModule {}
