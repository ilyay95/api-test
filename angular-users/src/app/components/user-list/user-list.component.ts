import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any;
  currentUser = null;
  currentIndex = -1;
  firstName = '';
  message = 'Are you sure to delete all users';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.readUsers();
  }

  readUsers(): void {
    this.userService.readAll()
      .subscribe(
        data => {
          this.users = data["users"];
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refresh(): void {
    this.readUsers();
    this.currentUser = null;
    this.currentIndex = -1;
  }

  setCurrentUser(user, index): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  deleteAllUsers(): void {
    this.userService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.readUsers();
        },
        error => {
          console.log(error);
        });
  }

  searchByName(): void {
    this.userService.searchByName(this.firstName)
      .subscribe(
        data => {
          this.users = data['users']
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  confirmMethod(): void {
    if(confirm(this.message)) {
      this.deleteAllUsers();
    }
  }

}
