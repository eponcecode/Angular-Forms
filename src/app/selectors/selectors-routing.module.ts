import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorsComponent } from './pages/selectors.component';

const routes: Routes = [{
  path: '',
  component: SelectorsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectorsRoutingModule { }
