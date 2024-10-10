import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];

  private apiUrl = 'https://localhost:7047/api/Contacts';
  private currentId = 1;
  private flagSubject = new BehaviorSubject<boolean>(false);
  flag$ = this.flagSubject.asObservable();

  constructor(private http: HttpClient) {}

  setFlag(value: boolean) {
    this.flagSubject.next(value);
  }  

  // getContacts(): Contact[] {
  //   return this.contacts;
  // }

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

  // Create
  createItem(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item).pipe(
      catchError(this.handleError)
    );
  }

  // Read
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Update
  updateItem(id: number, item: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
