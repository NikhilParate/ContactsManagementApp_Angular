import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //private contacts: Contact[] = [];
  private contacts: Contact[] = [
    {
      "id": 1,
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com"
    },
    {
      "id": 2,
      "firstname": "Jane",
      "lastname": "Smith",
      "email": "jane.smith@example.com"
    }
  ]
  private currentId = 1;
  private flagSubject = new BehaviorSubject<boolean>(false);
  flag$ = this.flagSubject.asObservable();

  setFlag(value: boolean) {
    this.flagSubject.next(value);
  }
  
  getContacts(): Contact[] {
    return this.contacts;
  }

  addContact(contact: Contact): void {
    contact.id = this.currentId++;
    this.contacts.push(contact);
  }

  updateContact(updatedContact: Contact): void {
    const index = this.contacts.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
    }
  }

  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
  }
}
