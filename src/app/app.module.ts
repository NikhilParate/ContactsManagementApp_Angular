import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { UserService } from './services/user.service';
import { AppRoutingModule } from './app-routing.module';
import { ContactListComponent } from './components/contacts/contact-list/contact-list.component';
import { ContactCreateComponent } from './components/contacts/contact-create/contact-create.component';
import { ContactEditComponent } from './components/contacts/contact-edit/contact-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ContactListComponent,
    ContactCreateComponent,
    ContactEditComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
