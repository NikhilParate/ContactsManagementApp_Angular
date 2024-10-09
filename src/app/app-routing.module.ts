import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './components/contacts/contact-list/contact-list.component';
import { ContactCreateComponent } from './components/contacts/contact-create/contact-create.component';
import { ContactEditComponent } from './components/contacts/contact-edit/contact-edit.component';

const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'create', component: ContactCreateComponent },
  //{ path: 'edit/:id', component: ContactEditComponent },
  { path: 'edit', component: ContactEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
