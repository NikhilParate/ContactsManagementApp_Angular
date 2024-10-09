import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private nextId = 1;

  getAllUsers() {
    return this.users;
  }

  addUser(user: User) {
    user.id = this.nextId++;
    this.users.push(user);
  }

  updateUser(updatedUser: User) {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}
