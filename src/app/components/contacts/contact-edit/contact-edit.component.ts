import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html'
})
export class ContactEditComponent {
  @Input() contact!: Contact;
  contactForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private contactService: ContactService ,private notificationService: NotificationService) {
    
  }

  ngOnChanges(): void {
    if (this.contact) {
      this.contactForm = this.fb.group({
        id: [this.contact.id],
        firstname: [this.contact.firstname, Validators.required],
        lastname: [this.contact.lastname, Validators.required],
        email: [this.contact.email, [Validators.required, Validators.email]]
      });
    }
  }

  onSubmit(): void {
    this.contactService.setFlag(false);
    this.showSuccess();
    this.updateItem();
    /*if (this.contactForm.valid) {
      this.contactService.updateContact(this.contactForm.value);
    }*/
  }

  updateItem() {
    const newItem = { name: 'New Item' }; // Replace with actual data
    this.contactService.updateItem(123, newItem).subscribe(
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
    this.notificationService.addNotification({ message: 'Contact updated successfully!', type: 'success' });
  }

  showError() {
    this.notificationService.addNotification({ message: 'Operation failed!', type: 'error' });
  }

}
