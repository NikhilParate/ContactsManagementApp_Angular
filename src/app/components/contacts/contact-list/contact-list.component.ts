import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  contacts: Contact[] = [];
  selectedContact!: Contact | null;
  isFlagged: boolean = false;
  constructor(private contactService: ContactService, private router: Router, private notificationService: NotificationService) {
    this.contactService.flag$.subscribe(value => {
      this.isFlagged = value;
    });
  }
  
  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id);
    this.contacts = this.contactService.getContacts();
    this.showSuccess();
  }
  

  editContact(contact: Contact): void {
    this.contactService.setFlag(true);
    
    this.selectedContact = contact; // Set the selected contact
  }
  addContact(): void {
    this.router.navigate(['/create']); 
  }

  showSuccess() {
    this.notificationService.addNotification({ message: 'Contact deleted successfully!', type: 'success' });
  }

  showError() {
    this.notificationService.addNotification({ message: 'Operation failed!', type: 'error' });
  }
  
}
