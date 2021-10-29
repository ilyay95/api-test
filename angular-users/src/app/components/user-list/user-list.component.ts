import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProfessionService } from 'src/app/services/profession.service';
import { GroupService } from 'src/app/services/group.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  filterUsers: any;
  allUsers: any;
  professions: any;
  groups: any;
  currentUser = null;
  currentIndex = -1;
  firstName: any;

  constructor(
    private userService: UserService,
    private professionService: ProfessionService,
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute) { }

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

  getNameАromQueryParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.firstName = { ...params.firstName, ...params };
      this.firstName = this.firstName.search;
      this.searchByName();
    });
  }

  readUsers(): void {
    this.userService.readAll()
      .subscribe(
        data => {
          this.allUsers = data['users'];
          this.usersWhisProfession();
          this.getNameАromQueryParams();
        },
        error => {
          console.log(error);
        });
  }

  usersWhisProfession(): void {
    this.allUsers = this.allUsers.map((user) => {
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
    if (this.firstName) {
      this.filterUsers = this.allUsers.filter((user) => {
        if (user.firstName.toLowerCase().indexOf(this.firstName.toLowerCase()) > -1) {
          return user;
        }
      })
      this.router.navigate(['/users'], { queryParams: { search: this.firstName } });
      this.usersWhisProfession();
    }
    else {
      this.filterUsers = this.allUsers;
      this.router.navigate(['/users']);
    }
  }

}
