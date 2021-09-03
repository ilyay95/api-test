import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {

  users: any;
  currentGroup = null;

  constructor(
    private userService: UserService,
    private groupService : GroupService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.readUsers();
    this.getGroup(this.route.snapshot.paramMap.get('id'));
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

  getGroup(id): void {
    this.groupService.read(id)
      .subscribe(
        data => {
          this.currentGroup = data['group'];
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
