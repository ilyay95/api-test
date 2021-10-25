import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
groups: any;
name: any;
group: any;

  constructor(public groupService : GroupService,
    public userService: UserService) { }

  ngOnInit(): void {
    this.getGroup();
  }

  searchByName(): void {
    if(this.name) {
    this.groupService.searchByName(this.name)
      .subscribe(
        data => {
          this.groups = data['groups'];
        },
        error => {
          console.log(error);
        });
      }
    else this.getGroup();
  }

  getGroup(): void {
    this.groupService.readAllGroup()
      .subscribe(
        data => {
          this.groups= data['groups'];
        },
        error => {
          console.log(error);
        });
  }
  
}
