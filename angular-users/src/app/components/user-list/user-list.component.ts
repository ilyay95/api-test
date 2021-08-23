import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProfessionService } from 'src/app/services/profession.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any;
  professions: any;
  currentUser = null;
  currentIndex = -1;
  currentProfessions = null;
  currentIndexProfessions = -1;
  firstName = '';
  deleteMessage = 'Are you sure you want to delete the user';

  constructor(
    private userService: UserService,
    private professionService: ProfessionService,
    private router: Router) { }

  ngOnInit(): void {
    this.readUsers();
    this.readProfessions();
  }

  readUsers(): void {
    this.userService.readAll()
      .subscribe(
        data => {
          this.users = data['users'];
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  readProfessions(): void {
    this.professionService.readAllProfession()
    .subscribe(
      data => {
        this.professions = data['professions'];
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
    if(confirm(this.deleteMessage)) {
      this.deleteAllUsers();
    }
  }

}
