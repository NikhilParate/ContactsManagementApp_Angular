import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html'
})
export class ContactCreateComponent {
  contactForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, 
    private contactService: ContactService,
    private notificationService: NotificationService,
    private router: Router) {

    this.contactForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]      
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.createItem(this.contactForm.value);
    
    }
  }

  createItem(contact: Contact) {
    contact.id = 0;
    this.contactService.createItem(contact).subscribe(
      (response) => {
        this.showSuccess();
        this.contactForm.reset();
        this.errorMessage = null; // Reset error message on success
        this.router.navigate(['/']); 
      },
      (error) => {
        this.errorMessage = error; // Set error message on failure
        this.showError("Oop's tere was something error..!");
      }
    );
  }

  showSuccess() {
    this.notificationService.addNotification({ message: 'Contact added successfully!', type: 'success' });
  }

  showError(msg: string) {
    this.notificationService.addNotification({ message: msg, type: 'error' });
  }

}
