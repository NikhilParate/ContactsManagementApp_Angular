import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder, private contactService: ContactService ,private notificationService: NotificationService,private router: Router) {
    
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
    this.updateItem();
  }

  updateItem() {    
    this.contactService.updateItem(this.contactForm.value.id, this.contactForm.value).subscribe(
      (response) => {
        this.router.onSameUrlNavigation = 'reload';
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['./']);
        this.errorMessage = null; // Reset error message on success
        this.showSuccess();
      },
      (error) => {
        this.errorMessage = error; // Set error message on failure
        this.showError("Oop's tere was something error..!");
      }
    );
  }


  showSuccess() {
    this.notificationService.addNotification({ message: 'Contact updated successfully!', type: 'success' });
  }

  showError(msg: string) {
    this.notificationService.addNotification({ message: msg, type: 'error' });
  }

}
