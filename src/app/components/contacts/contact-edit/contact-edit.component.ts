import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html'
})
export class ContactEditComponent {
  @Input() contact!: Contact;
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    
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
    /*if (this.contactForm.valid) {
      this.contactService.updateContact(this.contactForm.value);
    }*/
  }
}
