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
      this.showSuccess();
      const newContact: Contact = this.contactForm.value;
      this.contactService.addContact(newContact);
      this.contactForm.reset();
      this.router.navigate(['/']); 
      this.createItem();
    }
  }

  createItem() {
    const newItem = { name: 'New Item' }; // Replace with actual data
    this.contactService.createItem(newItem).subscribe(
      (response) => {
        //this.items.push(response); // Add new item to the list
        this.errorMessage = null; // Reset error message on success
      },
      (error) => {
        this.errorMessage = error; // Set error message on failure
      }
    );
  }

  showSuccess() {
    this.notificationService.addNotification({ message: 'Contact added successfully!', type: 'success' });
  }

  showError() {
    this.notificationService.addNotification({ message: 'Operation failed!', type: 'error' });
  }

}
