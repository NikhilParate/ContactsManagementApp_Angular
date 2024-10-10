import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent  implements OnInit {
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
    this.getItems(); 
  }

  getItems() {
    this.contactService.getItems().subscribe(
      (response) => {
        this.items = response;
        this.contacts = response;
        this.errorMessage = null; // Reset error message on success
      },
      (error) => {
        this.errorMessage = error; // Set error message on failure
        this.showError("Oop's tere was something error..!");
        console.log(error);
      }
    );
  }

  deleteContact(id: number): void {
    if(confirm('are you sure you want to delete?')){      
      this.deleteItem(id);
    }
  }

  deleteItem(id: number) {
    this.contactService.deleteItem(id).subscribe(
      () => {
        this.getItems();
        this.showSuccess('Contact deleted successfully!');
      },
      (error) => {
        this.showError("Record deleted successfully!");
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

  showSuccess(msg: string) {
    this.notificationService.addNotification({ message: msg, type: 'success' });
  }

  showError(msg: string) {
    this.notificationService.addNotification({ message: msg, type: 'danger' });
  }
  
}
