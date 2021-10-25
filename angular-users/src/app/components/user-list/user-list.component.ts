import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProfessionService } from 'src/app/services/profession.service';
import { GroupService } from 'src/app/services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any;
  professions: any;
  groups: any;
  currentUser = null;
  currentIndex = -1;
  firstName = '';
  
  constructor(
    private userService: UserService,
    private professionService: ProfessionService,
    private groupService : GroupService,
    private router: Router) { }

  ngOnInit(): void {
    this.readProfessions();
    this.readUsers();
    this.readGroups();
  }

  readProfessions(): void {
    this.professionService.readAllProfession()
    .subscribe(
      data => {
        this.professions = data['professions'];
      },
      error => {
        console.log(error);
      });
  }

  readUsers(): void {
    this.userService.readAll()
      .subscribe(
        data => {
          this.users = data['users'];
          this.usersWhisProfession();
        },
        error => {
          console.log(error);
        });
  }

  usersWhisProfession():void{
    this.users = this.users.map((user) => {
      user.professionName = this.professions.find((profession) => user.professionId === profession.id).name;
      return user;
    })
  }

  readGroups(): void {
    this.groupService.readAllGroup()
    .subscribe(
      data => {
        this.groups = data['groups'];
      },
      error => {
        console.log(error);
      });
  } 
  
  searchByName(): void {
    if(this.firstName) {
    this.userService.searchByName(this.firstName)
      .subscribe(
        data => {
          this.users = data['users'];
          this.usersWhisProfession();
        },
        error => {
          console.log(error);
        });
      }
      else this.readUsers();
  }

}
