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
  items: any[] = [];
  errorMessage: string | null = null;
  
  constructor(private contactService: ContactService, private router: Router, private notificationService: NotificationService) {
    this.contactService.flag$.subscribe(value => {
      this.isFlagged = value;
    });
  }
  
  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.getItems(); 
  }

  getItems() {
    this.contactService.getItems().subscribe(
      (response) => {
        this.items = response;
        this.errorMessage = null; // Reset error message on success
      },
      (error) => {
        this.errorMessage = error; // Set error message on failure
      }
    );
  }

  deleteContact(id: number): void {
    if(confirm('are you sure you want to delete?')){
      this.contactService.deleteContact(id);
      this.contacts = this.contactService.getContacts();
      this.showSuccess();
      this.deleteItem(123);
    }
  }

  deleteItem(id: number) {
    this.contactService.deleteItem(id).subscribe(
      () => {
        this.errorMessage = null; // Reset error message on success
      },
      (error) => {
        this.errorMessage = error; // Set error message on failure
      }
    );
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
