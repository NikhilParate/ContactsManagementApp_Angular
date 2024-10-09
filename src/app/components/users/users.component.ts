import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  isEditMode = false;
  currentUserId: number = 0;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getAllUsers();
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      if (this.isEditMode) {
        user.id = this.currentUserId;
        this.userService.updateUser(user);
      } else {
        this.userService.addUser(user);
      }
      this.resetForm();
      this.loadUsers();
    }
  }

  onEdit(user: User) {
    this.isEditMode = true;
    this.currentUserId = user.id!;
    this.userForm.patchValue(user);
  }

  onDelete(id: number) {
    this.userService.deleteUser(id);
    this.loadUsers();
  }

  resetForm() {
    this.userForm.reset();
    this.isEditMode = false;
    this.currentUserId = 0;
  }
}
