import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorsRoutingModule } from './selectors-routing.module';
import { SelectorsComponent } from './pages/selectors.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SelectorsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectorsRoutingModule
  ]
})
export class SelectorsModule { }
